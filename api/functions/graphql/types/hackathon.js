const {
    intArg,
    objectType,
    stringArg,
    extendType,
    nonNull,
} = require('nexus');
const { prisma } = require('../../../prisma');
const resolveImgObjectToUrl = require('../../../utils/resolveImageUrl');



const Hackathon = objectType({
    name: 'Hackathon',
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
        t.nonNull.date('start_date');
        t.nonNull.date('end_date');
        t.nonNull.string('location');
        t.nonNull.string('website');
        t.nonNull.list.nonNull.field('tags', {
            type: "Tag",
            resolve: (parent) => {
                return prisma.hackathon.findUnique({ where: { id: parent.id } }).tags();
            }
        });
    }
})

const getAllHackathons = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('getAllHackathons', {
            type: "Hackathon",
            args: {
                sortBy: stringArg(),
                tag: intArg(),
            },
            resolve(_, args) {
                const { sortBy, tag } = args;
                return prisma.hackathon.findMany({
                    where: {
                        ...(sortBy === 'Upcoming' && {
                            start_date: {
                                gte: new Date(),
                            }
                        }),
                        ...(sortBy === 'Live' && {
                            start_date: { lte: new Date() },
                            end_date: { gte: new Date() }
                        }),
                        ...(sortBy === 'Finished' && {
                            end_date: {
                                lt: new Date()
                            }
                        }),



                        ...(tag && {
                            tags: {
                                some: {
                                    id: tag
                                }
                            }
                        })
                    },
                    orderBy: {
                        start_date: "desc"
                    }
                })
            }
        })
    }
})

module.exports = {
    // Types 
    Hackathon,
    // Queries
    getAllHackathons,
}