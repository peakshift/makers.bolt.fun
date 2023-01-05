const { objectType, extendType, stringArg } = require("nexus");
const { prisma } = require("../../../prisma");

const Tag = objectType({
  name: "Tag",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.string("icon");
    t.string("description");
    t.string("long_description");
    t.boolean("isOfficial");

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
};
