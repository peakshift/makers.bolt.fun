const {
    intArg,
    objectType,
    stringArg,
    extendType,
    nonNull,
} = require('nexus');
const { prisma } = require('../prisma')



const Hackathon = objectType({
    name: 'Hackathon',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('description');
        t.nonNull.string('cover_image');
        t.nonNull.date('start_date');
        t.nonNull.date('end_date');
        t.nonNull.string('location');
        t.nonNull.string('website');
        t.nonNull.list.nonNull.field('topics', {
            type: "Topic",
            resolve: (parent) => {
                return prisma.hackathon.findUnique({ where: { id: parent.id } }).topics();
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
                topic: intArg(),
            },
            resolve(_, args) {
                const { sortBy, topic } = args;
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

                        ...(topic && {
                            topics: {
                                some: {
                                    id: topic
                                }
                            }
                        })
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