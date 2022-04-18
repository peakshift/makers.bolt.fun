const {
    intArg,
    objectType,
    stringArg,
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

let coverImgsCntr = -1;
function getCoverImage() {
    const coverImgs = [
        'https://picsum.photos/id/10/1660/1200',
        'https://picsum.photos/id/1000/1660/1200',
        'https://picsum.photos/id/1002/1660/1200',
        'https://picsum.photos/id/1008/1660/1200',
    ]

    return coverImgs[(++coverImgsCntr) % coverImgs.length]
}
let avatarImgsCntr = -1;

function getAvatarImage() {
    const avatarImgs = [
        'https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2',
        'https://i.pravatar.cc/150?img=3',
        'https://i.pravatar.cc/150?img=4',
    ]

    return avatarImgs[(++avatarImgsCntr) % avatarImgs.length]
}
const getAuthor = () => ({
    id: 12,
    name: "John Doe",
    image: getAvatarImage()
})
const date = new Date().toString()
const posts = {
    stories: [
        {
            id: 4,
            title: 'Digital Editor, Mars Review of Books',
            cover_image: getCoverImage(),
            comments_count: 31,
            date,
            votes_count: 120,
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In odio libero accumsan...',
            type: "Story",
            tags: [
                { id: 1, title: "lnurl" },
                { id: 2, title: "webln" },
                { id: 3, title: "guide" },
            ],
            author: getAuthor()
        },
        {
            id: 14,
            title: 'Digital Editor, Mars Review of Books',
            cover_image: getCoverImage(),
            comments_count: 31,
            date,
            votes_count: 120,
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In odio libero accumsan...',
            type: "Story",
            tags: [
                { id: 1, title: "lnurl" },
                { id: 2, title: "webln" },
                { id: 3, title: "guide" },
            ],
            author: getAuthor()
        },
        {
            id: 44,
            title: 'Digital Editor, Mars Review of Books',
            cover_image: getCoverImage(),
            comments_count: 31,
            date,
            votes_count: 120,
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In odio libero accumsan...',
            type: "Story",
            tags: [
                { id: 1, title: "lnurl" },
                { id: 2, title: "webln" },
                { id: 3, title: "guide" },
            ],
            author: getAuthor()
        }
    ],
    bounties: [
        {
            type: "Bounty",
            id: 22,
            title: 'Digital Editor, Mars Review of Books',
            cover_image: getCoverImage(),
            applicants_count: 31,
            date,
            votes_count: 120,
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In odio libero accumsan...',
            tags: [
                { id: 1, title: "lnurl" },
                { id: 2, title: "webln" },
                { id: 3, title: "guide" },
            ],
            author: getAuthor(),
            deadline: "25 May",
            reward_amount: 200_000,
        }
    ],
    questions: [
        {
            type: "Question",
            id: 33,
            title: 'Digital Editor, Mars Review of Books',
            answers_count: 31,
            date,
            votes_count: 70,
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In odio libero accumsan...',
            tags: [
                { id: 1, title: "lnurl" },
                { id: 2, title: "webln" },
            ],
            author: getAuthor(),
            comments: [
                {
                    id: 1,
                    author: getAuthor(),
                    date,
                    body: 'Naw, I’m 42 and know people who started in their 50’s, you got this!'
                },
                {
                    id: 2,
                    author: getAuthor(),
                    date,
                    body: 'Naw, I’m 42 and know people who started in their 50’s, you got this!'
                },
            ]
        },
        {
            type: "Question",
            id: 233,
            title: 'Digital Editor, Mars Review of Books',
            answers_count: 31,
            date,
            votes_count: 70,
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In odio libero accumsan...',
            tags: [
                { id: 1, title: "lnurl" },
                { id: 2, title: "webln" },
            ],
            author: getAuthor(),
            comments: [
                {
                    id: 1,
                    author: getAuthor(),
                    date,
                    body: 'Naw, I’m 42 and know people who started in their 50’s, you got this!'
                },
                {
                    id: 2,
                    author: getAuthor(),
                    date,
                    body: 'Naw, I’m 42 and know people who started in their 50’s, you got this!'
                },
            ]
        },
        {
            type: "Question",
            id: 133,
            title: 'Digital Editor, Mars Review of Books',
            answers_count: 31,
            date,
            votes_count: 70,
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In odio libero accumsan...',
            tags: [
                { id: 1, title: "lnurl" },
                { id: 2, title: "webln" },
            ],
            author: getAuthor(),
            comments: [
                {
                    id: 1,
                    author: getAuthor(),
                    date,
                    body: 'Naw, I’m 42 and know people who started in their 50’s, you got this!'
                },
                {
                    id: 2,
                    author: getAuthor(),
                    date,
                    body: 'Naw, I’m 42 and know people who started in their 50’s, you got this!'
                },
            ]
        }
    ]
}

const getFeed = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('getFeed', {
            type: "Post",
            args: {
                ...paginationArgs({ take: 5 })
            },
            resolve(_, { take, skip }) {
                const feed = [
                    ...posts.bounties,
                    ...posts.stories,
                    ...posts.questions,
                ]
                return feed.slice(skip, skip + take);
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
    getPostById
}