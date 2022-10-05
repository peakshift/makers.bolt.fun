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
const { deleteImage } = require('../../../services/imageUpload.service');
const { logError } = require('../../../utils/logger');
const { resolveImgObjectToUrl } = require('../../../utils/resolveImageUrl');
const { paginationArgs, getLnurlDetails, lightningAddressToLnurl } = require('./helpers');
const { ImageInput } = require('./misc');
const { Story } = require('./post');
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


        t.nonNull.list.nonNull.field('tournaments', {
            type: "Tournament",
            resolve: (parent) => {
                return prisma.tournamentProject.findMany({
                    where: { project_id: parent.id },
                    include: {
                        tournament: true
                    }
                }).then(res => res.map(item => item.tournament))
            }
        })

        t.nonNull.list.nonNull.field('stories', {
            type: Story,
            resolve: (parent) => {
                return prisma.story.findMany({
                    where: {
                        project_id: parent.id,
                    },
                    orderBy: {
                        createdAt: "desc"
                    },
                })
            }
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

        t.nonNull.list.nonNull.field('permissions', {
            type: ProjectPermissionEnum,
            resolve: async (parent, _, ctx) => {
                const user = await getUserByPubKey(ctx.userPubKey)
                if (!user) return [];

                const role = (await prisma.projectMember.findUnique({ where: { projectId_userId: { projectId: parent.id, userId: user.id } } }))?.role;

                if (!role) return [];

                if (role === ROLE_ADMIN) return [PROJECT_PERMISSIONS.UpdateMembers, PROJECT_PERMISSIONS.UpdateInfo];

                if (role === ROLE_OWNER) return Object.values(PROJECT_PERMISSIONS);

                return []
            }
        })
    }
})

const ROLE_OWNER = 'Owner'
const ROLE_ADMIN = 'Admin'
const ROLE_MAKER = 'Maker'

const TEAM_MEMBER_ROLE = enumType({
    name: 'TEAM_MEMBER_ROLE',
    members: [ROLE_OWNER, ROLE_ADMIN, ROLE_MAKER],
});

const PROJECT_PERMISSIONS = {
    UpdateInfo: "UpdateInfo",
    DeleteProject: "DeleteProject",
    UpdateAdmins: "UpdateAdmins",
    UpdateMembers: "UpdateMembers",
}

const ProjectPermissionEnum = enumType({
    name: 'ProjectPermissionEnum',
    members: PROJECT_PERMISSIONS,
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
                id: intArg(),
                tag: stringArg(),
            },
            resolve(_, { id, tag }) {
                if (tag) return prisma.project.findFirst({ where: { hashtag: tag } })
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

const similarProjects = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('similarProjects', {
            type: "Project",
            args: {
                id: nonNull(intArg())
            },
            async resolve(parent, { id }, ctx) {
                const currentProject = await prisma.project.findUnique({ where: { id }, select: { category_id: true } })

                return prisma.project.findMany({
                    where: {
                        AND: {
                            id: {
                                not: id
                            },
                            category_id: {
                                equals: currentProject.category_id
                            }
                        }
                    },
                    take: 5,
                })
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
        t.string('lightning_address');
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
                let {
                    title,
                    tagline,
                    hashtag,
                    description,
                    lightning_address,
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

                // Many Owners found. Throw an error
                if (members.filter((m) => m.role === ROLE_OWNER).length > 1) {
                    throw new ApolloError('Only 1 owner can be defined.')
                }

                // No owner found. Set the current user as Owner
                if (!members.find((m) => m.role === ROLE_OWNER)) {
                    const currentUser = members.find((m) => m.id === user.id)
                    if (currentUser) {
                        currentUser.role = ROLE_OWNER
                    } else {
                        members = [{ id: user.id, role: ROLE_OWNER }, ...members]
                    }
                }

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

                const project = await prisma.project.create({
                    data: {
                        title,
                        description,
                        lightning_address,
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

                await prisma.hostedImage
                    .updateMany({
                        where: {
                            id: {
                                in: [coverImage.id, thumbnailImage.id, ...screenshots_ids.map((s) => s.id)],
                            },
                        },
                        data: {
                            is_used: true,
                        },
                    })
                    .catch((error) => {
                        logError(error)
                        throw new ApolloError('Unexpected error happened...')
                    })

                return { project }
            },
        })
    },
})

const UpdateProjectInput = inputObjectType({
    name: 'UpdateProjectInput',
    definition(t) {
        t.int('id')
        t.nonNull.string('title')
        t.nonNull.string('hashtag')
        t.nonNull.string('website')
        t.nonNull.string('tagline')
        t.nonNull.string('description')
        t.nonNull.field('thumbnail_image', {
            type: ImageInput,
        })
        t.nonNull.field('cover_image', {
            type: ImageInput,
        })
        t.string('twitter')
        t.string('discord')
        t.string('github')
        t.string('slack')
        t.string('telegram')
        t.string('lightning_address');
        t.nonNull.int('category_id')
        t.nonNull.list.nonNull.int('capabilities')
        t.nonNull.list.nonNull.field('screenshots', {
            type: ImageInput,
        })
        t.nonNull.list.nonNull.field('members', {
            type: TeamMemberInput,
        })
        t.nonNull.list.nonNull.int('recruit_roles') // ids
        t.nonNull.field('launch_status', {
            type: ProjectLaunchStatusEnum,
        })
        t.nonNull.list.nonNull.int('tournaments') // ids
    },
})

const updateProject = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('updateProject', {
            type: CreateProjectResponse,
            args: { input: UpdateProjectInput },
            async resolve(_root, args, ctx) {
                const {
                    id,
                    title,
                    tagline,
                    hashtag,
                    description,
                    lightning_address,
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

                const project = await prisma.project.findFirst({
                    where: {
                        id,
                    },
                    include: {
                        members: true,
                    },
                })

                // Verifying current user is a member
                if (!project.members.some((m) => m.userId === user.id)) {
                    throw new ApolloError("You don't have permission to update this project")
                }

                // Maker can't change project info
                if (project.members.find((m) => m.userId === user.id)?.role === ROLE_MAKER) {
                    throw new ApolloError("Makers can't change project info")
                }

                let newMembers = []

                // Admin can only change makers
                if (project.members.find((m) => m.userId === user.id)?.role === ROLE_ADMIN) {
                    // Changing Makers
                    const newMakers = members.filter((m) => m.role === ROLE_MAKER)

                    // Set old Admins and Owner using current project.memebers because Admin can't change these Roles
                    const currentAdminsOwner = project.members
                        .filter((m) => m.role === ROLE_ADMIN || m.role === ROLE_OWNER)
                        .map((m) => ({ id: m.userId, role: m.role }))

                    newMembers = [...newMakers, ...currentAdminsOwner]
                } else {
                    // Curent user is Owner. Can change all users roles
                    newMembers = members
                }

                let imagesToDelete = []
                let imagesToAdd = []

                let coverImageRel = {}
                if (cover_image.id) {
                    const coverImage = await prisma.hostedImage.findFirst({
                        where: {
                            provider_image_id: cover_image.id,
                        },
                    })

                    coverImageRel = coverImage
                        ? {
                            cover_image_rel: {
                                connect: {
                                    id: coverImage ? coverImage.id : null,
                                },
                            },
                        }
                        : {}

                    if (coverImage) {
                        imagesToAdd.push(coverImage.id)
                    }

                    imagesToDelete.push(project.cover_image_id)
                }

                let thumbnailImageRel = {}
                if (thumbnail_image.id) {
                    const thumbnailImage = await prisma.hostedImage.findFirst({
                        where: {
                            provider_image_id: thumbnail_image.id,
                        },
                    })

                    thumbnailImageRel = thumbnailImage
                        ? {
                            thumbnail_image_rel: {
                                connect: {
                                    id: thumbnailImage ? thumbnailImage.id : null,
                                },
                            },
                        }
                        : {}

                    if (thumbnailImage) {
                        imagesToAdd.push(thumbnailImage.id)
                    }

                    imagesToDelete.push(project.thumbnail_image_id)
                }

                let screenshots_ids = []
                for (const screenshot of screenshots) {
                    if (screenshot.id) {
                        const newScreenshot = await prisma.hostedImage.findFirst({
                            where: {
                                provider_image_id: screenshot.id,
                            },
                            select: {
                                id: true,
                            },
                        })
                        if (newScreenshot) {
                            screenshots_ids.push(newScreenshot.id)
                            imagesToAdd.push(newScreenshot.id)
                        }
                    } else {
                        const newScreenshot = await prisma.hostedImage.findFirst({
                            where: {
                                url: screenshot.url,
                            },
                            select: {
                                id: true,
                            },
                        })
                        if (newScreenshot) {
                            screenshots_ids.push(newScreenshot.id)
                        }
                    }
                }
                const screenshotsIdsToDelete = project.screenshots_ids.filter((x) => !screenshots_ids.includes(x))
                imagesToDelete = [...imagesToDelete, ...screenshotsIdsToDelete]

                const updatedProject = await prisma.project
                    .update({
                        where: {
                            id,
                        },
                        data: {
                            title,
                            description,
                            lightning_address,
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
                            screenshots_ids,

                            category: {
                                connect: {
                                    id: category_id,
                                },
                            },
                            members: {
                                deleteMany: {},
                                create: newMembers.map((member) => {
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
                                deleteMany: {},
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
                                deleteMany: {},
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
                                set: capabilities.map((c) => {
                                    return {
                                        id: c,
                                    }
                                }),
                            },
                        },
                    })
                    .catch((error) => {
                        logError(error)
                        throw new ApolloError('Unexpected error happened...')
                    })

                if (imagesToAdd.length > 0) {
                    await prisma.hostedImage
                        .updateMany({
                            where: {
                                id: {
                                    in: imagesToAdd,
                                },
                            },
                            data: {
                                is_used: true,
                            },
                        })
                        .catch((error) => {
                            logError(error)
                            throw new ApolloError('Unexpected error happened...')
                        })
                }

                imagesToDelete.map(async (i) => await deleteImage(i))

                return { project: updatedProject }
            },
        })
    },
})

const deleteProject = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('deleteProject', {
            type: 'Project',
            args: { id: nonNull(intArg()) },
            async resolve(_root, args, ctx) {
                const { id } = args
                const user = await getUserByPubKey(ctx.userPubKey)

                // Do some validation
                if (!user) throw new ApolloError('Not Authenticated')

                const project = await prisma.project.findFirst({
                    where: { id },
                    include: {
                        members: true,
                    },
                })

                if (!project) throw new ApolloError('Project not found')

                if (project.members.find((m) => m.userId === user.id)?.role !== ROLE_OWNER)
                    throw new ApolloError("You don't have the right to delete this project")

                // Award is not implemented yet
                // await prisma.award.deleteMany({
                //     where: {
                //         projectId: project.id
                //     }
                // })

                await prisma.projectRecruitRoles.deleteMany({
                    where: {
                        projectId: project.id,
                    },
                })

                await prisma.projectMember.deleteMany({
                    where: {
                        projectId: project.id,
                    },
                })

                await prisma.tournamentProject.deleteMany({
                    where: {
                        project_id: project.id,
                    },
                })

                const deletedProject = await prisma.project.delete({
                    where: {
                        id,
                    },
                })

                const imagesToDelete = await prisma.hostedImage.findMany({
                    where: {
                        OR: [
                            { id: project.cover_image_id },
                            { id: project.thumbnail_image_id },
                            {
                                id: {
                                    in: project.screenshots_ids,
                                },
                            },
                        ],
                    },
                    select: {
                        id: true,
                    },
                })
                imagesToDelete.map(async (i) => await deleteImage(i.id))

                return deletedProject
            },
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
    similarProjects,

    // Mutations
    createProject,
    updateProject,
    deleteProject,
}