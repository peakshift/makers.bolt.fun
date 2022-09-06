const {
    intArg,
    objectType,
    stringArg,
    extendType,
    nonNull,
} = require('nexus')
const { prisma } = require('../../../prisma');
const resolveImgObjectToUrl = require('../../../utils/resolveImageUrl');

const { paginationArgs, getLnurlDetails, lightningAddressToLnurl } = require('./helpers');
const { MakerRole } = require('./users');


const Project = objectType({
    name: 'Project',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('description');
        t.nonNull.string('cover_image', {
            async resolve(parent) {
                const imgObject = await prisma.hostedImage.findUnique({
                    where: {
                        id: parent.cover_image_id
                    }
                });

                return resolveImgObjectToUrl(imgObject);
            }
        });
        t.nonNull.string('thumbnail_image', {
            async resolve(parent) {
                const imgObject = await prisma.hostedImage.findUnique({
                    where: {
                        id: parent.thumbnail_image_id
                    }
                });

                return resolveImgObjectToUrl(imgObject);
            }
        });
        t.nonNull.list.nonNull.string('screenshots', {
            async resolve(parent) {
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
        t.nonNull.string('website');
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

module.exports = {
    // Types
    Project,
    Award,
    // Queries
    getProject,
    allProjects,
    newProjects,
    hottestProjects,
    searchProjects,
    projectsByCategory,
    getLnurlDetailsForProject
}