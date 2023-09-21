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
  commentedOnStory: ({ storyId, userId }) => ({
    type: ACTIONS_TYPES.commentedOnStory,
    payload: { storyId, userId },
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

  const promises = [];
  const updateFailReasonPromises = [];

  const actionsIdsProcessed = [];

  for (const action of actions) {
    const handler = actionsHandlers[action.actionType.name];
    if (handler) {
      promises.push(
        handler(action.actionPayload)
          .then(() => {
            actionsIdsProcessed.push(action.id);
          })
          .catch((error) => {
            console.log(error);
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
          })
      );
    } else {
      console.warn(
        "No handler found for action of type: ",
        action.actionType.name
      );
      updateFailReasonPromises.push(
        prisma.userAction.update({
          where: {
            id: action.id,
          },
          data: {
            status: "failed",
            failReason: "No handler found for this action type",
          },
        })
      );
    }
  }

  await Promise.all(promises);

  await Promise.all([
    prisma.userAction.updateMany({
      where: {
        id: {
          in: actionsIdsProcessed,
        },
      },
      data: {
        status: "completed",
        failReason: null,
      },
    }),
    ...updateFailReasonPromises,
  ]);
}

const userActionsService = {
  registerAction,
  actionsCreator,
  processUserActionsQueue,
};

module.exports = userActionsService;
