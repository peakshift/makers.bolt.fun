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

const Badge = objectType({
  name: "Badge",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("slug");
    t.nonNull.string("image");
    t.nonNull.string("description");
    t.string("winningDescriptionTemplate");
    t.string("color");
    t.string("badgeDefinitionNostrEventId");
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
    t.string("winningDescriptionTemplate");
    t.string("color");
    t.string("badgeDefinitionNostrEventId");
  },
});

const createOrUpdateBadge = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createOrUpdateBadge", {
      type: Badge,
      args: { input: CreateOrUpdateBadgeInput },
      async resolve(_root, args, ctx) {
        let {
          id,
          title,
          slug,
          image,
          description,
          winningDescriptionTemplate,
          color,
          badgeDefinitionNostrEventId,
        } = args.input;

        const user = ctx.user;

        // Do some validation
        if (!user?.id) throw new ApolloError("Not Authenticated");

        if (isAdmin(user.id)) throw new ApolloError("Not Authorized");

        if (!id) {
          // Create
          return await prisma.badge.create({
            data: {
              title,
              slug,
              image,
              description,
              winningDescriptionTemplate,
              color,
              badgeDefinitionNostrEventId,
            },
          });
        } else {
          // Update
          return await prisma.badge.update({
            where: { id },
            data: {
              title,
              slug,
              image,
              description,
              winningDescriptionTemplate,
              color,
              badgeDefinitionNostrEventId,
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
  // Mutations
  createOrUpdateBadge,
};
