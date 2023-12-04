const { ApolloError } = require("apollo-server-lambda");
const {
  objectType,
  extendType,
  inputObjectType,
  stringArg,
  nonNull,
} = require("nexus");
const { isAdmin } = require("../../../auth/utils/helperFuncs");
const { prisma } = require("../../../prisma");
const cacheService = require("../../../services/cache.service");
const { toSlug } = require("../../../utils/helpers");

const Badge = objectType({
  name: "Badge",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("slug");
    t.nonNull.string("image");
    t.nonNull.string("description");
    t.nonNull.boolean("isAdminIssuedOnly");
    t.string("winningDescriptionTemplate");
    t.string("color");
    t.string("badgeDefinitionNostrEventId");
    t.int("incrementsNeeded");
    t.field("incrementOnAction", {
      type: UserActionType,
      resolve: async (parent) => {
        return prisma.badge
          .findUnique({
            where: { id: parent.id },
          })
          .incrementOnAction();
      },
    });
    t.nonNull.list.nonNull.field("awardedTo", {
      type: "User",
      resolve: async (parent) => {
        return prisma.badge
          .findUnique({
            where: { id: parent.id },
          })
          .UserBadge()
          .then((userBadges) =>
            prisma.user.findMany({
              where: {
                id: {
                  in: userBadges.map((userBadge) => userBadge.userId),
                },
              },
            })
          );
      },
    });
  },
});

const BadgeProgress = objectType({
  name: "BadgeProgress",
  definition(t) {
    t.nonNull.boolean("isCompleted");
    t.int("totalNeeded");
    t.int("current");
    t.date("awardedAt");
    t.string("badgeAwardNostrEventId");
    t.list.nonNull.field("metaData", {
      type: AwardedBadgeMetadata,
    });
  },
});

const AwardedBadgeMetadata = objectType({
  name: "AwardedBadgeMetadata",
  definition(t) {
    t.string("emoji");
    t.string("label");
    t.string("value");
  },
});

const UserBadge = objectType({
  name: "UserBadge",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.field("badge", {
      type: Badge,
    });
    t.field("progress", {
      type: BadgeProgress,
    });
  },
});

const UserActionType = objectType({
  name: "UserActionType",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
  },
});

const getAllBadges = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getAllBadges", {
      type: Badge,
      args: {},
      resolve: (_) => {
        return prisma.badge.findMany({
          select: {
            id: true,
            title: true,
            slug: true,
            image: true,
            description: true,
            winningDescriptionTemplate: true,
            color: true,
            badgeDefinitionNostrEventId: true,
          },
        });
      },
    });
  },
});

const getAllUserActionTypes = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getAllUserActionTypes", {
      type: UserActionType,
      args: {},
      resolve: (_) => {
        return prisma.userActionType.findMany();
      },
    });
  },
});

const getBadgeById = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getBadgeById", {
      type: Badge,
      args: { idOrSlug: nonNull(stringArg()) },
      resolve: (_, { idOrSlug }) => {
        let where = {};

        if (isNaN(idOrSlug)) where = { slug: idOrSlug };
        else where = { id: parseInt(idOrSlug) };

        return prisma.badge.findUnique({
          where,
        });
      },
    });
  },
});

const CreateOrUpdateBadgeInput = inputObjectType({
  name: "CreateOrUpdateBadgeInput",
  definition(t) {
    t.int("id");
    t.nonNull.string("title");
    t.nonNull.string("slug");
    t.nonNull.string("image");
    t.nonNull.string("description");
    t.nonNull.boolean("isAdminIssuedOnly");
    t.string("winningDescriptionTemplate");
    t.string("color");
    t.string("badgeDefinitionNostrEventId");
    t.int("incrementOnActionId");
    t.int("incrementsNeeded");
  },
});

const createOrUpdateBadge = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createOrUpdateBadge", {
      type: Badge,
      args: { input: CreateOrUpdateBadgeInput },
      async resolve(_root, args, ctx) {
        const user = ctx.user;
        if (!isAdmin(user?.id)) throw new ApolloError("Not Authorized");

        let {
          id,
          title,
          slug,
          image,
          description,
          winningDescriptionTemplate,
          color,
          badgeDefinitionNostrEventId,
          incrementOnActionId,
          incrementsNeeded,
          isAdminIssuedOnly,
        } = args.input;

        slug = toSlug(slug);

        if (isAdminIssuedOnly) {
          incrementOnActionId = null;
          incrementsNeeded = 1;
        } else {
          if (!incrementOnActionId || !incrementsNeeded)
            throw new ApolloError(
              "incrementOnActionId and incrementsNeeded are required"
            );

          if (incrementsNeeded < 1)
            throw new ApolloError("incrementsNeeded must be greater than 0");
        }

        let newBadgeData = null;

        if (!id) {
          // Create New Badge

          const slugExists = await prisma.badge.findUnique({
            where: {
              slug,
            },
          });

          if (slugExists)
            throw new ApolloError("A badge with this slug already exists");

          newBadgeData = await prisma.badge.create({
            data: {
              title,
              slug,
              image,
              description,
              winningDescriptionTemplate,
              color,
              badgeDefinitionNostrEventId,
              isAdminIssuedOnly,
              incrementOnActionId,
              incrementsNeeded,
            },
          });
        } else {
          // Update
          newBadgeData = await prisma.badge.update({
            where: {
              id,
            },
            data: {
              title,
              slug,
              image,
              description,
              winningDescriptionTemplate,
              color,
              badgeDefinitionNostrEventId,
              isAdminIssuedOnly,
              incrementOnAction: incrementOnActionId
                ? {
                    connect: { id: incrementOnActionId },
                  }
                : {
                    disconnect: true,
                  },
              incrementsNeeded,
            },
          });
        }

        await cacheService.invalidateBadgeById(newBadgeData.id);

        return newBadgeData;
      },
    });
  },
});

const BadgeMetadataInput = inputObjectType({
  name: "BadgeMetadataInput",
  definition(t) {
    t.string("emoji");
    t.string("label");
    t.string("value");
  },
});

const CreateMakerBadgeInput = inputObjectType({
  name: "CreateMakerBadgeInput",
  definition(t) {
    t.nonNull.list.nonNull.int("user_ids");
    t.nonNull.int("badge_id");
    t.nonNull.list.nonNull.field("metaData", {
      type: BadgeMetadataInput,
    });
  },
});

const createMakerBadge = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createMakerBadge", {
      type: Badge,
      args: { input: CreateMakerBadgeInput },
      async resolve(_root, args, ctx) {
        const user = ctx.user;
        if (!isAdmin(user?.id)) throw new ApolloError("Not Authorized");

        let { user_ids, badge_id, metaData } = args.input;

        const existingUserBadges = await prisma.userBadge.findMany({
          where: {
            userId: {
              in: user_ids,
            },
            badgeId: badge_id,
          },
        });

        const usersWithBadge = existingUserBadges.map(
          (userBadge) => userBadge.userId
        );
        const usersWithoutBadge = user_ids.filter(
          (user_id) => !usersWithBadge.includes(user_id)
        );

        await Promise.all([
          prisma.userBadge.updateMany({
            where: {
              userId: {
                in: usersWithBadge,
              },
              badgeId: badge_id,
            },
            data: {
              metaData,
            },
          }),

          prisma.userBadge.createMany({
            data: usersWithoutBadge.map((user_id) => ({
              userId: user_id,
              badgeId: badge_id,
              metaData,
            })),
          }),
        ]);

        await cacheService.invalidateBadgeById(badge_id);

        return prisma.badge.findUnique({
          where: {
            id: badge_id,
          },
        });
      },
    });
  },
});

const RequestNostrBadgeInput = inputObjectType({
  name: "RequestNostrBadgeInput",
  definition(t) {
    t.nonNull.int("badgeId");
    t.nonNull.string("publicKeyToAward");
  },
});

const requestNostrBadge = extendType({
  type: "Mutation",
  definition(t) {
    t.field("requestNostrBadge", {
      type: "Boolean",
      args: {
        input: RequestNostrBadgeInput,
      },
      resolve: async (_, { input }, ctx) => {
        const userId = ctx.user?.id;

        if (!userId) throw new ApolloError("Not Authorized");

        const { badgeId, publicKeyToAward } = input;
        const alreadyRequested = await prisma.nostrBadgeRequest.findFirst({
          where: {
            badgeId,
            userId,
          },
        });

        if (alreadyRequested)
          throw new ApolloError(
            "There's already a pending request for this badge"
          );

        try {
          await prisma.nostrBadgeRequest.create({
            data: {
              badgeId,
              userId,
              publicKeyToAward,
            },
          });
          return true;
        } catch (error) {
          console.error(error);
          throw new ApolloError("Failed to request Nostr Badge");
        }
      },
    });
  },
});

const NostrBadgeRequest = objectType({
  name: "NostrBadgeRequest",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("badge", {
      type: Badge,
    });
    t.nonNull.field("user", {
      type: "User",
    });
    t.nonNull.string("publicKeyToAward");
    t.nonNull.date("createdAt");
  },
});

const getPendingNostrBadgeRequests = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getPendingNostrBadgeRequests", {
      type: NostrBadgeRequest,
      args: {},
      resolve: (_, __, ctx) => {
        const isAdminUser = isAdmin(ctx.user?.id);

        if (!isAdminUser) throw new ApolloError("Not Authorized");

        return prisma.nostrBadgeRequest.findMany({
          include: {
            badge: true,
            user: true,
          },
          where: {
            isFullfilled: false,
          },
          orderBy: {
            createdAt: "asc",
          },
        });
      },
    });
  },
});

const AwardNostrBadgeInput = inputObjectType({
  name: "AwardNostrBadgeInput",
  definition(t) {
    t.nonNull.int("nostrBadgeRequestId");
    t.nonNull.string("awardEventId");
  },
});

const awardNostrBadge = extendType({
  type: "Mutation",
  definition(t) {
    t.field("awardNostrBadge", {
      type: "Boolean",
      args: {
        input: AwardNostrBadgeInput,
      },
      resolve: async (_, { input }, ctx) => {
        const isAdminUser = isAdmin(ctx.user?.id);

        if (!isAdminUser) throw new ApolloError("Not Authorized");

        const { nostrBadgeRequestId, awardEventId } = input;

        const nostrBadgeRequest = await prisma.nostrBadgeRequest.findUnique({
          where: {
            id: nostrBadgeRequestId,
          },
          include: {
            badge: true,
            user: true,
          },
        });

        if (!nostrBadgeRequest)
          throw new ApolloError("Nostr Badge Request not found");

        try {
          await prisma.nostrBadgeRequest.update({
            where: {
              id: nostrBadgeRequestId,
            },
            data: {
              isFullfilled: true,
            },
          });

          await prisma.userBadge.update({
            where: {
              userId_badgeId: {
                badgeId: nostrBadgeRequest.badgeId,
                userId: nostrBadgeRequest.userId,
              },
            },
            data: {
              badgeAwardNostrEventId: awardEventId,
            },
          });

          return true;
        } catch (error) {
          console.error(error);
          throw new ApolloError("Failed to award Nostr Badge");
        }
      },
    });
  },
});

module.exports = {
  // Types
  Badge,
  BadgeProgress,
  AwardedBadgeMetadata,
  UserBadge,
  // Queries
  getAllBadges,
  getBadgeById,
  getAllUserActionTypes,
  getPendingNostrBadgeRequests,
  // Mutations
  createOrUpdateBadge,
  createMakerBadge,
  requestNostrBadge,
  awardNostrBadge,
};
