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

        if (!id) {
          // Create New Badge

          const slugExists = await prisma.badge.findUnique({
            where: {
              slug,
            },
          });

          if (slugExists)
            throw new ApolloError("A badge with this slug already exists");

          return await prisma.badge.create({
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
          return await prisma.badge.update({
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
  // Mutations
  createOrUpdateBadge,
};
