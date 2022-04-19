const {
    intArg,
    objectType,
    extendType,
    nonNull,
    interfaceType,
    unionType,
} = require('nexus');
const { paginationArgs } = require('./helpers');




const PostBase = interfaceType({
    name: 'PostBase',
    resolveType() {
        return null
    },
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('date');
        t.nonNull.field('author', {
            type: "User"
        });
        t.nonNull.string('excerpt');
        t.nonNull.list.nonNull.field('tags', {
            type: "Tag"
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
    },
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
            type: "PostComment"
        })
    },
})

const PostComment = objectType({
    name: 'PostComment',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('date');
        t.nonNull.string('body');
        t.nonNull.field('author', {
            type: "User"
        });
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
                ...paginationArgs({ take: 10 })
            },
            resolve(_, { take, skip }) {
                const feed = []
                return feed.slice(skip, skip + take);
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

                return [];
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
                id: nonNull(intArg())
            },
            resolve(_, { id }) {
                return {}
            }
        })
    }
})




module.exports = {
    // Types
    PostBase,
    Bounty,
    Story,
    Question,
    PostComment,
    Post,
    // Queries
    getFeed,
    getPostById,
    getTrendingPosts
}