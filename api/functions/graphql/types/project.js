const { ApolloError } = require('apollo-server-lambda');
const {
    intArg,
    objectType,
    stringArg,
    extendType,
    nonNull,
    enumType,
    inputObjectType,
} = require('nexus');
const { getUserByPubKey } = require('../../../auth/utils/helperFuncs');
const { prisma } = require('../../../prisma');
const { resolveImgObjectToUrl } = require('../../../utils/resolveImageUrl');

const { paginationArgs, getLnurlDetails, lightningAddressToLnurl } = require('./helpers');
const { ImageInput } = require('./misc');
const { TournamentProject } = require('./tournament');
const { MakerRole } = require('./users');



const Project = objectType({
    name: 'Project',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('tagline');
        t.nonNull.string('website');
        t.nonNull.string('description');
        t.nonNull.string('hashtag');
        t.nonNull.string('cover_image', {
            async resolve(parent) {
                return prisma.project.findUnique({ where: { id: parent.id } }).cover_image_rel().then(resolveImgObjectToUrl)
            }
        });
        t.nonNull.string('thumbnail_image', {
            async resolve(parent) {
                return prisma.project.findUnique({ where: { id: parent.id } }).thumbnail_image_rel().then(resolveImgObjectToUrl)
            }
        });
        t.nonNull.field('launch_status', {
            type: ProjectLaunchStatusEnum
        });
        t.string('twitter');
        t.string('discord');
        t.string('github');
        t.string('slack');
        t.string('telegram');
        t.nonNull.list.nonNull.string('screenshots', {
            async resolve(parent) {
                if (!parent.screenshots_ids) return null
                const imgObject = await prisma.hostedImage.findMany({
                    where: {
                        id: { in: parent.screenshots_ids }
                    }
                });

                return imgObject.map(img => {
                    return resolveImgObjectToUrl(img);
                });
            }
        });
        t.string('lightning_address');
        t.string('lnurl_callback_url');
        t.nonNull.int('votes_count');

        t.nonNull.field('category', {
            type: "Category",
            resolve: (parent) => {
                return prisma.project.findUnique({ where: { id: parent.id } }).category();
            }
        });

        t.nonNull.list.nonNull.field('awards', {
            type: "Award",
            resolve: (parent) => {
                return prisma.project.findUnique({ where: { id: parent.id } }).awards();
            }
        });

        t.nonNull.list.nonNull.field('tags', {
            type: "Tag",
            resolve: (parent) => {
                return prisma.project.findUnique({ where: { id: parent.id } }).tags();
            }
        })

        t.nonNull.list.nonNull.field('members', {
            type: ProjectMember,
            resolve: (parent) => {
                return prisma.projectMember.findMany({
                    where: {
                        projectId: parent.id
                    },
                    include: {
                        user: true
                    }
                })
            }
        })

        t.list.nonNull.field('tournaments', {
            type: TournamentProject
        })

        t.nonNull.list.nonNull.field('capabilities', {
            type: Capability,
            resolve: async (parent) => {
                return prisma.project.findUnique({ where: { id: parent.id } }).capabilities()
            }
        })

        t.nonNull.list.nonNull.field('recruit_roles', {
            type: MakerRole,
            resolve: async (parent) => {
                const data = await prisma.project.findUnique({
                    where: {
                        id: parent.id
                    },
                    select: {
                        recruit_roles: {
                            select: {
                                role: true,
                                level: true
                            }
                        },
                    }
                })
                return data.recruit_roles.map(data => {
                    return ({ ...data.role, level: data.level })
                })
            }
        })
    }
})

const TEAM_MEMBER_ROLE = enumType({
    name: 'TEAM_MEMBER_ROLE',
    members: ['Admin', 'Maker'],
});

const ProjectMember = objectType({
    name: "ProjectMember",
    definition(t) {
        t.nonNull.field('user', {
            type: "User"
        })
        t.nonNull.field("role", {
            type: TEAM_MEMBER_ROLE
        })
    }
})


const Award = objectType({
    name: 'Award',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('image');
        t.nonNull.string('url');
        t.nonNull.field('project', {
            type: "Project",
            resolve: (parent) => {
                return prisma.award.findUnique({ where: { id: parent.id } }).project();
            }
        })
    }
})


const Capability = objectType({
    name: 'Capability',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('icon');
    }
})

const checkValidProjectHashtag = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.boolean('checkValidProjectHashtag', {
            args: {
                hashtag: nonNull(stringArg()),
                projectId: intArg(),
            },
            async resolve(parent, args, context) {
                if (args.projectId) {
                    return !(await prisma.project.findFirst({
                        where: {
                            id: {
                                not: args.projectId,
                            },
                            hashtag: {
                                equals: args.hashtag
                            }
                        }
                    }))
                }
                return !(await prisma.project.findFirst({
                    where: {
                        hashtag: {
                            equals: args.hashtag
                        }
                    }
                }))
            }
        })
    }
})

const getAllCapabilities = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('getAllCapabilities', {
            type: Capability,
            async resolve(parent, args, context) {
                return prisma.capability.findMany();
            }
        })
    }
})


const getProject = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field('getProject', {
            type: "Project",
            args: {
                id: nonNull(intArg())
            },
            resolve(_, { id }) {
                return prisma.project.findUnique({
                    where: { id }
                })
            }
        })
    }
})

const allProjects = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('allProjects', {
            type: "Project",
            args: paginationArgs({ take: 50 }),
            resolve(_, { take, skip }) {
                return prisma.project.findMany({
                    orderBy: { votes_count: "desc" },
                    skip,
                    take,
                });
            }
        })
    }
})

const newProjects = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('newProjects', {
            type: "Project",
            args: paginationArgs({ take: 50 }),
            resolve(_, args) {
                const take = args.take || 50;
                const skip = args.skip || 0;
                return prisma.project.findMany({
                    orderBy: { createdAt: "desc" },
                    skip,
                    take,
                });
            }
        })
    }
})


const hottestProjects = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('hottestProjects', {
            type: "Project",
            args: paginationArgs({ take: 50 }),
            async resolve(_, { take, skip }) {
                return prisma.project.findMany({
                    orderBy: { votes_count: "desc" },
                    skip,
                    take,
                });
            }
        })
    }
})


const searchProjects = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('searchProjects', {
            type: "Project",
            args: {
                ...paginationArgs({ take: 50 }),
                search: nonNull(stringArg())
            },
            async resolve(_, { take, skip, search }) {
                return prisma.project.findMany({
                    where: {
                        OR: [{
                            title: {
                                contains: search,
                                mode: 'insensitive'
                            },
                        }, {
                            description: {
                                contains: search,
                                mode: 'insensitive'
                            },
                        }]
                    },
                    skip,
                    take,
                });
            }
        })
    }
})


const projectsByCategory = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('projectsByCategory', {
            type: "Project",
            args: {
                ...paginationArgs(),
                category_id: nonNull(intArg())
            },
            async resolve(_, { take, skip, category_id }) {
                return prisma.project.findMany({
                    where: { category_id },
                    orderBy: { votes_count: "desc" },
                    skip,
                    take,
                });
            }
        })
    }
})


const getLnurlDetailsForProject = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field('getLnurlDetailsForProject', {
            type: "LnurlDetails",
            args: { project_id: nonNull(intArg()) },
            async resolve(_, args) {
                const project = await prisma.project.findUnique({
                    where: {
                        id: args.project_id,
                    },
                });
                const lnurlDetails = await getLnurlDetails(
                    lightningAddressToLnurl(project.lightning_address)
                );
                if (
                    !lnurlDetails.data ||
                    lnurlDetails.data.status.toLowerCase() !== "ok"
                ) {
                    console.error(lnurlDetails.data);
                    throw new Error("Recipient not available");
                }

                // cache the callback URL
                await prisma.project.update({
                    where: { id: project.id },
                    data: {
                        lnurl_callback_url: lnurlDetails.data.callback,
                    },
                });
                // # SENDING MESSAGES TO THE PROJECT OWNER USING LNURL-PAY COMMENTS
                // comments in lnurl pay can be used to send a private message or
                // post on the projcet owners site. could even be used for advertising
                // or tip messages. or can even be a pay to respond / paid advise
                return {
                    minSendable: parseInt(lnurlDetails.data.minSendable) / 1000,
                    maxSendable: parseInt(lnurlDetails.data.maxSendable) / 1000,
                    metadata: lnurlDetails.data.metadata,
                    commentAllowed: lnurlDetails.data.commentAllowed,
                };
            }
        })
    }
})

const TeamMemberInput = inputObjectType({
    name: 'TeamMemberInput',
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.field("role", {
            type: TEAM_MEMBER_ROLE
        })
    }
})

const ProjectLaunchStatusEnum = enumType({
    name: 'ProjectLaunchStatusEnum',
    members: ['WIP', 'Launched'],
});

const CreateProjectInput = inputObjectType({
    name: 'CreateProjectInput',
    definition(t) {
        t.int('id') // exists in update
        t.nonNull.string('title');
        t.nonNull.string('hashtag');
        t.nonNull.string('website');
        t.nonNull.string('tagline');
        t.nonNull.string('description');
        t.nonNull.field('thumbnail_image', {
            type: ImageInput
        })
        t.nonNull.field('cover_image', {
            type: ImageInput
        })
        t.string('twitter');
        t.string('discord');
        t.string('github');
        t.string('slack');
        t.string('telegram');
        t.nonNull.int('category_id');
        t.nonNull.list.nonNull.int('capabilities'); // ids
        t.nonNull.list.nonNull.field('screenshots', {
            type: ImageInput
        });
        t.nonNull.list.nonNull.field('members', {
            type: TeamMemberInput
        });
        t.nonNull.list.nonNull.int('recruit_roles'); // ids
        t.nonNull.field('launch_status', {
            type: ProjectLaunchStatusEnum
        });
        t.nonNull.list.nonNull.int('tournaments'); // ids
    }
})

const CreateProjectResponse = objectType({
    name: 'CreateProjectResponse',
    definition(t) {
        t.nonNull.field('project', { type: Project })
    }
})

const createProject = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createProject', {
            type: CreateProjectResponse,
            args: { input: CreateProjectInput },
            async resolve(_root, args, ctx) {
                const {
                    title,
                    tagline,
                    hashtag,
                    description,
                    capabilities,
                    category_id,
                    cover_image,
                    discord,
                    github,
                    slack,
                    telegram,
                    twitter,
                    website,
                    launch_status,
                    members,
                    recruit_roles,
                    screenshots,
                    thumbnail_image,
                    tournaments,
                } = args.input

                const user = await getUserByPubKey(ctx.userPubKey)

                // Do some validation
                if (!user) throw new ApolloError('Not Authenticated')

                const coverImage = await prisma.hostedImage.findFirst({
                    where: {
                        provider_image_id: cover_image.id,
                    },
                })

                const coverImageRel = coverImage
                    ? {
                          cover_image_rel: {
                              connect: {
                                  id: coverImage ? coverImage.id : null,
                              },
                          },
                      }
                    : {}

                const thumbnailImage = await prisma.hostedImage.findFirst({
                    where: {
                        provider_image_id: thumbnail_image.id,
                    },
                })

                const thumbnailImageRel = thumbnailImage
                    ? {
                          thumbnail_image_rel: {
                              connect: {
                                  id: thumbnailImage ? thumbnailImage.id : null,
                              },
                          },
                      }
                    : {}

                const screenshots_ids = await prisma.hostedImage.findMany({
                    where: {
                        provider_image_id: {
                            in: screenshots.map((s) => s.id),
                        },
                    },
                    select: {
                        id: true,
                    },
                })

                return await prisma.project.create({
                    data: {
                        title,
                        description,
                        tagline,
                        hashtag,
                        website,
                        discord,
                        github,
                        twitter,
                        slack,
                        telegram,
                        launch_status,

                        ...coverImageRel,
                        ...thumbnailImageRel,
                        screenshots_ids: screenshots_ids.map((s) => s.id),

                        category: {
                            connect: {
                                id: category_id,
                            },
                        },
                        members: {
                            create: members.map((member) => {
                                return {
                                    role: member.role,
                                    user: {
                                        connect: {
                                            id: member.id,
                                        },
                                    },
                                }
                            }),
                        },
                        recruit_roles: {
                            create: recruit_roles.map((role) => {
                                return {
                                    level: 0,
                                    role: {
                                        connect: {
                                            id: role,
                                        },
                                    },
                                }
                            }),
                        },
                        tournaments: {
                            create: tournaments.map((tournament) => {
                                return {
                                    tournament: {
                                        connect: {
                                            id: tournament,
                                        },
                                    },
                                }
                            }),
                        },
                        capabilities: {
                            connect: capabilities.map((c) => {
                                return {
                                    id: c,
                                }
                            }),
                        },
                    },
                })
            },
        })
    },
})


const UpdateProjectInput = inputObjectType({
    name: 'UpdateProjectInput',
    definition(t) {
        t.int('id')
        t.nonNull.string('title');
        t.nonNull.string('hashtag');
        t.nonNull.string('website');
        t.nonNull.string('tagline');
        t.nonNull.string('description');
        t.nonNull.field('thumbnail_image', {
            type: ImageInput
        })
        t.nonNull.field('cover_image', {
            type: ImageInput
        })
        t.string('twitter');
        t.string('discord');
        t.string('github');
        t.string('slack');
        t.string('telegram');
        t.nonNull.int('category_id');
        t.nonNull.list.nonNull.int('capabilities');
        t.nonNull.list.nonNull.field('screenshots', {
            type: ImageInput
        });
        t.nonNull.list.nonNull.field('members', {
            type: TeamMemberInput
        });
        t.nonNull.list.nonNull.int('recruit_roles'); // ids
        t.nonNull.field('launch_status', {
            type: ProjectLaunchStatusEnum
        });
        t.nonNull.list.nonNull.int('tournaments'); // ids
    }
})

const updateProject = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('updateProject', {
            type: CreateProjectResponse,
            args: { input: UpdateProjectInput },
            async resolve(_root, args, ctx) {

            }
        })
    },
})

const deleteProject = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('deleteProject', {
            type: CreateProjectResponse,
            args: { id: nonNull(intArg()) },
            async resolve(_root, args, ctx) {
                // ...
            }
        })
    },
})


module.exports = {
    // Types
    Project,
    Award,
    TEAM_MEMBER_ROLE,
    // Queries
    getProject,
    allProjects,
    newProjects,
    hottestProjects,
    searchProjects,
    projectsByCategory,
    getLnurlDetailsForProject,
    getAllCapabilities,
    checkValidProjectHashtag,

    // Mutations
    createProject,
    updateProject,
    deleteProject,
}