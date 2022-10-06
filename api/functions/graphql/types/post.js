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
    inputObjectType,
} = require('nexus');
const { paginationArgs } = require('./helpers');
const { prisma } = require('../../../prisma');
const { getUserByPubKey } = require('../../../auth/utils/helperFuncs');
const { ApolloError } = require('apollo-server-lambda');
const { marked } = require('marked');
const { resolveImgObjectToUrl } = require('../../../utils/resolveImageUrl');
const { ImageInput } = require('./misc');
const { deleteImage } = require('../../../services/imageUpload.service');
const { logError } = require('../../../utils/logger');


const POST_TYPE = enumType({
    name: 'POST_TYPE',
    members: ['Story', 'Bounty', 'Question'],
});

const asType = type => (obj) => {
    if (Array.isArray(obj)) return obj.map(o => ({ ...o, type }))
    return { ...obj, type }
}

const asStoryType = asType('Story')
const asQuestionType = asType('Question')
const asBountyType = asType('Bounty')


const Author = objectType({
    name: 'Author',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('name');
        t.nonNull.string('avatar', {
            async resolve(parent) {
                return prisma.user.findUnique({ where: { id: parent.id } }).avatar_rel().then(resolveImgObjectToUrl)
            }
        });
        t.nonNull.date('join_date');

        t.string('lightning_address');
    }
})




const PostBase = interfaceType({
    name: 'PostBase',
    resolveType(item) {
        return item.type
    },
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.date('createdAt');
        t.nonNull.date('updatedAt');
        t.nonNull.string('body');
        t.nonNull.string('excerpt');
        t.nonNull.int('votes_count');
        t.boolean('is_published');
    },
})

const Story = objectType({
    name: 'Story',
    definition(t) {
        t.implements('PostBase');
        t.nonNull.string('type', {
            resolve: () => t.typeName
        });
        t.string('cover_image', {
            async resolve(parent) {
                return prisma.story.findUnique({ where: { id: parent.id } }).cover_image_rel().then(resolveImgObjectToUrl)
            }
        });
        t.nonNull.list.nonNull.field('comments', {
            type: "PostComment",
            resolve: (parent) => []
        });
        t.nonNull.list.nonNull.field('tags', {
            type: "Tag",
            resolve: (parent) => prisma.story.findUnique({ where: { id: parent.id } }).tags()
        });
        t.nonNull.int('comments_count', {
            resolve: async (parent) => {
                const post = await prisma.story.findUnique({
                    where: { id: parent.id },
                    include: {
                        _count: {
                            select: {
                                comments: true
                            }
                        }
                    }
                })
                return post._count.comments;
            }
        });
        t.nonNull.field('author', {
            type: "Author",
            resolve: (parent) =>
                prisma.story.findUnique({ where: { id: parent.id } }).user()

        });

        t.field('project', {
            type: "Project",
            resolve(parent) {
                return prisma.story.findUnique({ where: { id: parent.id } }).project();
            }
        })

    },
})

const StoryInputType = inputObjectType({
    name: 'StoryInputType',
    definition(t) {
        t.int('id');
        t.nonNull.string('title');
        t.nonNull.string('body');
        t.field('cover_image', {
            type: ImageInput
        })
        t.nonNull.list.nonNull.string('tags');
        t.boolean('is_published')
        t.int('project_id')
    }
})


const BountyApplication = objectType({
    name: 'BountyApplication',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('date');
        t.nonNull.string('workplan');
        t.nonNull.field('author', {
            type: "Author"
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
        t.string('cover_image');
        t.nonNull.string('deadline');
        t.nonNull.int('reward_amount');
        t.nonNull.int('applicants_count');
        t.nonNull.list.nonNull.field('applications', {
            type: "BountyApplication"
        });
        t.nonNull.field('author', {
            type: "Author",
            resolve: (parent) => {
                return prisma.bounty.findUnique({ where: { id: parent.id } }).user();
            }
        });

        t.nonNull.list.nonNull.field('tags', {
            type: "Tag",
            resolve: (parent) => []
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

        t.nonNull.list.nonNull.field('tags', {
            type: "Tag",
            resolve: (parent) => prisma.question.findUnique({ where: { id: parent.id } }).tags()
        });

        // t.nonNull.int('answers_count');
        // t.nonNull.list.nonNull.field('comments', {
        //     type: "PostComment",
        //     resolve: (parent) => {
        //         return prisma.question.findUnique({ where: { id: parent.id } }).comments();
        //     }
        // });

        t.nonNull.field('author', {
            type: "Author",
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
        t.nonNull.date('created_at');
        t.nonNull.string('body');
        t.nonNull.field('author', {
            type: "Author"
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
    resolveType: (item) => {
        return item.type
    },
})


const getFeed = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('getFeed', {
            type: "Post",
            args: {
                ...paginationArgs({ take: 10 }),
                sortBy: stringArg(), // all, popular, trending, newest
                tag: intArg({
                    default: 0
                })
            },
            resolve(_, { take, skip, tag, sortBy, }) {


                let orderBy = { createdAt: "desc" };

                if (sortBy === 'popular')
                    orderBy = { votes_count: 'desc' };
                else if (sortBy === 'newest')
                    orderBy = { createdAt: "desc" };

                return prisma.story.findMany({
                    orderBy: orderBy,
                    where: {
                        ...(tag && {
                            tags: {
                                some: {
                                    id: tag
                                }
                            },
                        }),
                        is_published: true,
                    },
                    skip,
                    take,
                }).then(asStoryType)
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
                const lastWeekDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
                return prisma.story.findMany({
                    where: {
                        createdAt: {
                            gte: lastWeekDate
                        },
                        is_published: true,
                    },
                    orderBy: { votes_count: 'desc' },
                    take: 5,
                }).then(asStoryType)
            }
        })
    }
})



const getMyDrafts = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('getMyDrafts', {
            type: "Post",
            args: {
                type: arg({
                    type: nonNull('POST_TYPE')
                })
            },
            async resolve(parent, { type }, ctx) {
                const user = await getUserByPubKey(ctx.userPubKey);
                // Do some validation
                if (!user)
                    throw new ApolloError("Not Authenticated");

                if (type === 'Story')
                    return prisma.story.findMany({
                        where: {
                            is_published: false,
                            user_id: user.id
                        },
                        orderBy: { createdAt: 'desc' },
                    }).then(asStoryType)
                return []
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
            resolve(_, { id, type }) {
                if (type === 'Story')
                    return prisma.story.findUnique({
                        where: { id }
                    }).then(asStoryType)

                if (type === 'Question')
                    return prisma.question.findUnique({
                        where: { id }
                    }).then(asQuestionType)
                return null
            }
        })
    }
})

const addCoverImage = async (providerImageId) => {
    const newCoverImage = await prisma.hostedImage.findFirst({
        where: {
            provider_image_id: providerImageId
        }
    })

    if (!newCoverImage) throw new ApolloError("New cover image not found")

    await prisma.hostedImage.update({
        where: {
            id: newCoverImage.id
        },
        data: {
            is_used: true
        }
    })

    return newCoverImage
}

const getHostedImageIdsFromBody = async (body, oldBodyImagesIds = null) => {
    let bodyImageIds = []

    const regex = /(?:!\[(.*?)\]\((.*?)\))/g
    let match;
    while ((match = regex.exec(body))) {
        const [, , value] = match

        // Useful for old external images in case of duplicates. We need to be sure we are targeting an image from the good story.
        const where = oldBodyImagesIds ? {
            AND: [
                { url: value },
                { id: { in: oldBodyImagesIds } }
            ]
        } :
            {
                url: value,
            }

        const hostedImage = await prisma.hostedImage.findFirst({
            where
        })
        if (hostedImage) {
            bodyImageIds.push(hostedImage.id)
            await prisma.hostedImage.update({
                where: {
                    id: hostedImage.id
                },
                data: {
                    is_used: true
                }
            })
        }
    }
    return bodyImageIds
}

const createStory = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createStory', {
            type: 'Story',
            args: { data: StoryInputType },
            async resolve(_root, args, ctx) {
                const { id, title, body, project_id, cover_image, tags, is_published } = args.data;
                const user = await getUserByPubKey(ctx.userPubKey);

                // Do some validation
                if (!user)
                    throw new ApolloError("Not Authenticated");

                let was_published = false;


                // TODO: validate post data

                let coverImage = null
                let bodyImageIds = []


                try {
                    if (id) {
                        const oldPost = await prisma.story.findFirst({
                            where: { id },
                            select: {
                                user_id: true,
                                is_published: true,
                                cover_image_id: true,
                                body_image_ids: true
                            }
                        })
                        was_published = oldPost.is_published;
                        if (user.id !== oldPost.user_id) throw new ApolloError("Not post author")

                        // Body images
                        bodyImageIds = await getHostedImageIdsFromBody(body, oldPost.body_image_ids)

                        // Old cover image is found
                        if (oldPost.cover_image_id) {
                            const oldCoverImage = await prisma.hostedImage.findFirst({
                                where: {
                                    id: oldPost.cover_image_id
                                }
                            })

                            // New cover image
                            if (cover_image?.id && cover_image.id !== oldCoverImage?.provider_image_id) {
                                await deleteImage(oldCoverImage.id)
                                coverImage = await addCoverImage(cover_image.id)
                            } else {
                                coverImage = oldCoverImage
                            }
                        } else {
                            // No old image found and new cover image
                            if (cover_image?.id) {
                                coverImage = await addCoverImage(cover_image.id)
                            }
                        }

                        // Remove unused body images
                        const unusedImagesIds = oldPost.body_image_ids.filter(x => !bodyImageIds.includes(x));
                        unusedImagesIds.map(async i => await deleteImage(i))

                    } else {
                        // Body images
                        bodyImageIds = await getHostedImageIdsFromBody(body)

                        // New story and new cover image
                        if (cover_image?.id) {
                            coverImage = await addCoverImage(cover_image.id)
                        }
                    }

                    // Preprocess & insert
                    const htmlBody = marked.parse(body);
                    const excerpt = htmlBody
                        .replace(/<[^>]+>/g, '')
                        .slice(0, 120)
                        .replace(/&amp;/g, "&")
                        .replace(/&#39;/g, "'")
                        .replace(/&quot;/g, '"')
                        ;


                    const coverImageRel = coverImage ? {
                        cover_image_rel: {
                            connect:
                            {
                                id: coverImage ? coverImage.id : null
                            }
                        }
                    } : {}

                    if (id) {
                        await prisma.story.update({
                            where: { id },
                            data: {
                                tags: {
                                    set: []
                                },
                            }
                        });

                        return prisma.story.update({
                            where: { id },
                            data: {
                                title,
                                body,
                                cover_image: '',
                                excerpt,
                                is_published: was_published || is_published,
                                project: project_id ? {
                                    connect: {
                                        id: project_id,
                                    },
                                } : {
                                    disconnect: true
                                },
                                tags: {
                                    connectOrCreate:
                                        tags.map(tag => {
                                            tag = tag.toLowerCase().trim();
                                            return {
                                                where: {
                                                    title: tag,
                                                },
                                                create: {
                                                    title: tag
                                                }
                                            }
                                        })
                                },
                                body_image_ids: bodyImageIds,
                                ...coverImageRel
                            }
                        })
                            .catch(error => {
                                logError(error)
                                throw new ApolloError("Unexpected error happened...")
                            })
                    }

                    return prisma.story.create({
                        data: {
                            title,
                            body,
                            cover_image: '',
                            excerpt,
                            is_published,
                            tags: {
                                connectOrCreate:
                                    tags.map(tag => {
                                        tag = tag.toLowerCase().trim();
                                        return {
                                            where: {
                                                title: tag,
                                            },
                                            create: {
                                                title: tag
                                            }
                                        }
                                    })
                            },
                            project: project_id ? {
                                connect: {
                                    id: project_id,
                                },
                            } : {
                                disconnect: true
                            },
                            user: {
                                connect: {
                                    id: user.id,
                                }
                            },
                            body_image_ids: bodyImageIds,
                            ...coverImageRel
                        }
                    }).catch(error => {
                        logError(error)
                        throw new ApolloError("Unexpected error happened...")
                    })


                } catch (error) {
                    logError(error)
                    throw new ApolloError("Unexpected error happened...")
                }
            }
        })
    },
})

const deleteStory = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('deleteStory', {
            type: 'Story',
            args: { id: nonNull(intArg()) },
            async resolve(_root, args, ctx) {
                const { id } = args;
                const user = await getUserByPubKey(ctx.userPubKey);
                // Do some validation
                if (!user)
                    throw new ApolloError("Not Authenticated");


                const oldPost = await prisma.story.findFirst({
                    where: { id },
                    select: {
                        user_id: true,
                        body_image_ids: true,
                        cover_image_id: true
                    }
                })
                if (user.id !== oldPost.user_id)
                    throw new ApolloError("Not post author")

                const deletedPost = await prisma.story.delete({
                    where: {
                        id
                    }
                })

                const coverImage = await prisma.hostedImage.findMany({
                    where: {
                        OR: [
                            { id: oldPost.cover_image_id },
                            {
                                id: {
                                    in: oldPost.body_image_ids
                                }
                            }
                        ]
                    },
                    select: {
                        id: true,
                        provider_image_id: true
                    }
                })
                coverImage.map(async i => await deleteImage(i.id))

                return deletedPost
            }
        })
    },
})




module.exports = {
    // Types
    POST_TYPE,
    Author,
    PostBase,
    BountyApplication,
    Bounty,
    Story,
    StoryInputType,
    Question,
    PostComment,
    Post,
    // Queries
    getFeed,
    getPostById,
    getTrendingPosts,
    getMyDrafts,

    // Mutations
    createStory,
    deleteStory,
}