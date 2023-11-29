const { default: axios } = require("axios");
const { prisma } = require("../../prisma");
const env = require("../../utils/consts");

const ACTIONS_TYPES = {
  publishedStory: "Publish Story",
  updatedProfile: "Updated Profile",
  commentedOnStory: "Leave a Comment",
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
  const actionTypeIdtoBadgesCache = {};

  let handledAllBendingActions = false;

  while (!handledAllBendingActions) {
    await prisma.$transaction(
      // eslint-disable-next-line no-loop-func
      async (prisma) => {
        const action = await prisma.userAction.findFirst({
          where: {
            status: "pending",
          },
          include: {
            actionType: true,
            user: {
              select: {
                badges: {
                  select: {
                    badgeId: true,
                  },
                },
              },
            },
          },
        });

        if (!action) {
          handledAllBendingActions = true;
          return;
        }

        try {
          const handler = actionsHandlers[action.actionType.name];

          // run any custom action handlers
          if (handler) await handler(action.actionPayload);

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

          await Promise.all(
            badgesTrackingThisAction.map(async (badge) => {
              if (
                action.user.badges.find(
                  (userBadge) => userBadge.badgeId === badge.id
                )
              )
                return;

              // upsert the user badges progress
              return (
                prisma.userBadgeProgress
                  .upsert({
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
                    select: {
                      badge: {
                        select: {
                          id: true,
                          incrementsNeeded: true,
                        },
                      },
                      progress: true,
                    },
                  })

                  // Create the badge if the progress is enough
                  .then(({ progress, badge: { id, incrementsNeeded } }) => {
                    if (progress >= incrementsNeeded) {
                      return prisma.userBadge.createMany({
                        data: [
                          {
                            badgeId: id,
                            userId: action.user_id,
                          },
                        ],
                        skipDuplicates: true,
                      });
                    }

                    return true;
                  })
              );
            })
          );

          await prisma.userAction.update({
            where: {
              id: action.id,
            },
            data: {
              status: "completed",
              failReason: null,
            },
          });
        } catch (error) {
          console.log(error);
          // update the action status to failed if something went wrong
          await prisma.userAction.update({
            where: {
              id: action.id,
            },
            data: {
              status: "failed",
              failReason: error.message,
            },
          });
        }
      },
      { timeout: 10 * 1000 }
    );
  }

  return;
}

const userActionsService = {
  registerAction,
  actionsCreator,
  processUserActionsQueue,
};

module.exports = userActionsService;
