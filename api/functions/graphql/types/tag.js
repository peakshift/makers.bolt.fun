const { objectType, extendType } = require("nexus");
const { prisma } = require('../../../prisma');

const Tag = objectType({
    name: 'Tag',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.string('icon');
        t.string('description');
        t.boolean('isOfficial');
    }
});

const officialTags = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('officialTags', {
            type: "Tag",
            resolve: () => {
                return prisma.tag.findMany({
                    orderBy: {
                        title: 'asc'
                    },
                    where: {
                        isOfficial: true
                    }
                });
            }
        })
    }
})

const popularTags = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('popularTags', {
            type: "Tag",
            resolve: () => {
                return prisma.tag.findMany({
                    where: {
                        isOfficial: true
                    },
                    take: 8,
                    orderBy: {
                        stories: {
                            _count: 'desc'
                        }
                    },
                });
            }
        })
    }
})

module.exports = {
    // Types
    Tag,

    // Queries
    popularTags,
    officialTags,
}