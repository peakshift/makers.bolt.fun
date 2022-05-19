const {
    intArg,
    objectType,
    extendType,
    nonNull,
    interfaceType,
    unionType,
    stringArg,
    enumType,
    arg,
} = require('nexus');
const { paginationArgs } = require('./helpers');
const { prisma } = require('../prisma')


const POST_TYPE = enumType({
    name: 'POST_TYPE',
    members: ['Story', 'Bounty', 'Question'],
})

const Topic = objectType({
    name: 'Topic',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('icon');
    }
})


const allTopics = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('allTopics', {
            type: "Topic",
            resolve: () => {
                return prisma.topic.findMany({

                });
            }
        })
    }
})

const PostBase = interfaceType({
    name: 'PostBase',
    resolveType() {
        return null
    },
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('date');
        t.nonNull.string('excerpt');
        t.nonNull.string('body');
        t.nonNull.list.nonNull.field('tags', {
            type: "Tag"
        });
        t.nonNull.field('topic', {
            type: "Topic"
        });
        t.nonNull.int('votes_count');
    },
})

const Story = objectType({
    name: 'Story',
    definition(t) {
        t.implements('PostBase');
        t.nonNull.string('type', {
            resolve: () => 'Story'
        });
        t.nonNull.string('cover_image');
        t.nonNull.int('comments_count');
        t.nonNull.list.nonNull.field('comments', {
            type: "PostComment",
            resolve: (parent) => {
                return prisma.story.findUnique({ where: { id: parent.id } }).comments();
            }
        });

        t.nonNull.field('author', {
            type: "User",
            resolve: (parent) => {
                return prisma.story.findUnique({ where: { id: parent.id } }).user();
            }
        });
    },
})

const BountyApplication = objectType({
    name: 'BountyApplication',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('date');
        t.nonNull.string('workplan');
        t.nonNull.field('author', {
            type: "User"
        });
    }
})

const Bounty = objectType({
    name: 'Bounty',
    definition(t) {
        t.implements('PostBase');
        t.nonNull.string('type', {
            resolve: () => 'Bounty'
        });
        t.nonNull.string('cover_image');
        t.nonNull.string('deadline');
        t.nonNull.int('reward_amount');
        t.nonNull.int('applicants_count');
        t.nonNull.list.nonNull.field('applications', {
            type: "BountyApplication"
        });
        t.nonNull.field('author', {
            type: "User",
            resolve: (parent) => {
                return prisma.bounty.findUnique({ where: { id: parent.id } }).user();
            }
        });
    },
})

const Question = objectType({
    name: 'Question',
    definition(t) {
        t.implements('PostBase');
        t.nonNull.string('type', {
            resolve: () => 'Question',

        });
        t.nonNull.int('answers_count');
        t.nonNull.list.nonNull.field('comments', {
            type: "PostComment",
            resolve: (parent) => {
                return prisma.question.findUnique({ where: { id: parent.id } }).comments();
            }
        });

        t.nonNull.field('author', {
            type: "User",
            resolve: (parent) => {
                return prisma.question.findUnique({ where: { id: parent.id } }).user();
            }
        });
    },
})

const PostComment = objectType({
    name: 'PostComment',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('created_at');
        t.nonNull.string('body');
        t.nonNull.field('author', {
            type: "User"
        });
        t.int('parentId');
        t.nonNull.int('votes_count');
    }
})

const Post = unionType({
    name: 'Post',
    definition(t) {
        t.members('Story', 'Bounty', 'Question')
    },
    resolveType: (item) => item.type,
})


const getFeed = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('getFeed', {
            type: "Post",
            args: {
                ...paginationArgs({ take: 10 }),
                sortBy: stringArg({
                    default: "all"
                }), // all, popular, trending, newest
                topic: intArg()
            },
            resolve(_, { take, skip, topic, sortBy, }) {
                return prisma.story.findMany({
                    orderBy: { createdAt: "desc" },
                    where: {
                        topic_id: topic,
                    },
                    skip,
                    take,
                });
            }
        })
    }
})


const getTrendingPosts = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('getTrendingPosts', {
            type: "Post",
            args: {
            },
            resolve() {
                const now = new Date();
                const lastWeekDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toUTCString()
                return prisma.story.findMany({
                    take: 5,
                    where: {
                        createdAt: {
                            gt: lastWeekDate
                        }
                    }
                })
            }
        })
    }
})


const getPostById = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field('getPostById', {
            type: "Post",
            args: {
                id: nonNull(intArg()),
                type: arg({
                    type: nonNull('POST_TYPE')
                })
            },
            resolve(_, { id }) {
                return {
                    id: 4,
                    title: 'Digital Editor, Mars Review of Books',
                    body: "AASA",
                    cover_image: "AASA",
                    comments_count: 31,
                    date: "SSSS",
                    votes_count: 120,
                    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In odio libero accumsan...',
                    type: "Story",
                    tags: [
                        { id: 1, title: "lnurl" },
                        { id: 2, title: "webln" },
                        { id: 3, title: "guide" },
                    ],
                    author: {

                        id: 12,
                        name: "John Doe",
                        image: "SSSS",
                        join_date: "SSSS"
                    },
                }
            }
        })
    }
})




module.exports = {
    // Types
    POST_TYPE,
    Topic,
    PostBase,
    BountyApplication,
    Bounty,
    Story,
    Question,
    PostComment,
    Post,
    // Queries
    allTopics,
    getFeed,
    getPostById,
    getTrendingPosts
}