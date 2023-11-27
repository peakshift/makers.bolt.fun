const { objectType, extendType } = require("nexus");
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

module.exports = {
  // Types
  Badge,
  BadgeProgress,
  AwardedBadgeMetadata,
  UserBadge,
  // Queries
  getAllBadges,
};
