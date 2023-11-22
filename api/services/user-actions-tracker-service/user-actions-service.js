const { default: axios } = require("axios");
const { prisma } = require("../../prisma");
const env = require("../../utils/consts");

const ACTIONS_TYPES = {
  publishedStory: "publishedStory",
  updatedProfile: "updatedProfile",
  commentedOnStory: "commentedOnStory",
};

const actionsCreator = {
  publishedStory: ({ storyId, userId }) => ({
    type: ACTIONS_TYPES.publishedStory,
    payload: { storyId, userId },
  }),
  updatedProfile: ({ userId }) => ({
    type: ACTIONS_TYPES.updatedProfile,
    payload: { userId },
  }),
  commentedOnStory: ({ storyId, nostrEventId, userId }) => ({
    type: ACTIONS_TYPES.commentedOnStory,
    payload: { storyId, nostrEventId, userId },
  }),
};

async function registerAction(action) {
  await axios.post(
    env.FUNCTIONS_URL + "/register-user-action",
    { action },
    {
      headers: {
        Authorization: `Bearer ${env.INTERNAL_FUNCTIONS_API_TOKEN}`,
      },
    }
  );
}

const actionsHandlers = {
  [ACTIONS_TYPES.publishedStory]: async ({ storyId, userId }) => {
    // do something
  },
  [ACTIONS_TYPES.updatedProfile]: async ({ userId }) => {
    // do something
  },
  [ACTIONS_TYPES.commentedOnStory]: async ({ storyId, userId }) => {
    // do something
  },
};

async function processUserActionsQueue() {
  const actions = await prisma.userAction.findMany({
    where: {
      status: "pending",
    },
    include: {
      actionType: true,
    },
  });

  const allTrxsPromises = [];
  const updateFailReasonPromises = [];

  const actionTypeIdtoBadgesCache = {};

  await Promise.all(
    actions.map(async (action) => {
      // the things needed to be done for each action are:
      // 0. run any custom action handlers
      // 1. upsert the user badges progress
      // 2. update the action status to completed
      // 3. update the action status to failed if something went wrong

      try {
        const handler = actionsHandlers[action.actionType.name];

        if (handler) await handler(action.actionPayload);

        let trxPromises = [];

        // get the list of badges that should be incremented on this action (& cache them)
        let badgesTrackingThisAction =
          actionTypeIdtoBadgesCache[action.actionType.id];
        if (!badgesTrackingThisAction) {
          badgesTrackingThisAction = await prisma.badge.findMany({
            where: {
              incrementOnActionId: action.actionType.id,
            },
          });
          actionTypeIdtoBadgesCache[action.actionType.id] =
            badgesTrackingThisAction;
        }

        const badgesWithProgressThatIncremented = {};

        for (const badge of badgesTrackingThisAction) {
          trxPromises.push(
            prisma.userBadgeProgress.upsert({
              create: {
                badgeId: badge.id,
                userId: action.user_id,
                progress: 1,
              },
              update: {
                progress: {
                  increment: 1,
                },
              },
              where: {
                userId_badgeId: {
                  badgeId: badge.id,
                  userId: action.user_id,
                },
              },
            })
          );
          badgesWithProgressThatIncremented[`${badge.id}_${action.user_id}`] = {
            badgeId: badge.id,
            userId: action.user_id,
          };
        }

        trxPromises.push(
          prisma.userAction.update({
            where: {
              id: action.id,
            },
            data: {
              status: "completed",
              failReason: null,
            },
          })
        );

        allTrxsPromises.push(
          prisma
            .$transaction(trxPromises)
            // .then(()=>{
            //   Object.values(badgesWithProgressThatIncremented).map(async ({badgeId,userId}) => {
            //     const badgeIncrementsNeeded = await prisma.badge.findUnique({
            // })
            .catch((reason) => {
              updateFailReasonPromises.push(
                prisma.userAction.update({
                  where: {
                    id: action.id,
                  },
                  data: {
                    status: "failed",
                    failReason: reason.message,
                  },
                })
              );
            })
        );
      } catch (error) {
        updateFailReasonPromises.push(
          prisma.userAction.update({
            where: {
              id: action.id,
            },
            data: {
              status: "failed",
              failReason: error.message,
            },
          })
        );
      }
    })
  );

  await Promise.all(allTrxsPromises);

  await Promise.all([updateFailReasonPromises]);
}

const userActionsService = {
  registerAction,
  actionsCreator,
  processUserActionsQueue,
};

module.exports = userActionsService;
