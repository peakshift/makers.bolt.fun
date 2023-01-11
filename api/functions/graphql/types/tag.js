const { PrismaSelect } = require("@paljs/plugins");
const { objectType, extendType, stringArg, intArg } = require("nexus");
const { prisma } = require("../../../prisma");
const { defaultPrismaSelectFields } = require("./helpers");

const Tag = objectType({
  name: "Tag",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.string("icon");
    t.string("description");
    t.string("long_description");
    t.boolean("isOfficial");
    t.nonNull.int("posts_count", {
      resolve: (parent) =>
        prisma.story.count({
          where: {
            tags: {
              some: {
                id: parent.id,
              },
            },
          },
        }),
    });

    t.nonNull.list.nonNull.field("moderators", {
      type: "User",
      resolve: (parent) =>
        prisma.tag.findUnique({ where: { id: parent.id } }).moderators(),
    });
  },
});

const officialTags = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("officialTags", {
      type: "Tag",
      resolve: () => {
        return prisma.tag.findMany({
          orderBy: {
            title: "asc",
          },
          where: {
            isOfficial: true,
          },
        });
      },
    });
  },
});

const popularTags = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("popularTags", {
      type: "Tag",
      resolve: () => {
        return prisma.tag.findMany({
          where: {
            isOfficial: true,
          },
          take: 8,
          orderBy: {
            stories: {
              _count: "desc",
            },
          },
        });
      },
    });
  },
});

const activeUsers = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("activeUsers", {
      type: "User",
      args: {
        tagId: intArg(),
        lastDays: intArg({ default: 30 }),
        take: intArg({ default: 3 }),
      },
      resolve: async (_, { tagId, lastDays, take }, ctx, info) => {
        const select = new PrismaSelect(info, {
          defaultFields: defaultPrismaSelectFields,
        }).valueWithFilter("User");

        const now = new Date();
        const lastWeekDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - lastDays
        );

        const users_ids = await prisma.story
          .groupBy({
            by: ["user_id"],
            where: {
              createdAt: {
                gte: lastWeekDate,
              },
              ...(tagId && {
                tags: {
                  some: { id: tagId },
                },
              }),
            },
            _count: {
              id: true,
            },
            orderBy: {
              _count: {
                id: "desc",
              },
            },
            take,
          })
          .then((res) => res.map((i) => i.user_id));

        const usersData = await prisma.user.findMany({
          ...select,
          where: {
            id: {
              in: users_ids,
            },
          },
        });

        const sortedUsersData = users_ids.map((id) =>
          usersData.find((data) => data.id === id)
        );

        return sortedUsersData;
      },
    });
  },
});

const getTagInfo = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getTagInfo", {
      type: "Tag",
      args: {
        tag: stringArg(),
      },
      resolve: (_, { tag }) => {
        return prisma.tag.findUnique({
          where: {
            title: tag,
          },
        });
      },
    });
  },
});

module.exports = {
  // Types
  Tag,
  // Queries
  popularTags,
  officialTags,
  getTagInfo,
  activeUsers,
};
