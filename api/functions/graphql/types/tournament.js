const {
    intArg,
    objectType,
    stringArg,
    extendType,
    nonNull,
    enumType,
} = require('nexus');
const { prisma } = require('../../../prisma');
const { paginationArgs } = require('./helpers');



const TournamentPrize = objectType({
    name: 'TournamentPrize',
    definition(t) {
        t.nonNull.string('title');
        t.nonNull.string('amount');
        t.nonNull.string('image');
    }
})

const TournamentJudge = objectType({
    name: 'TournamentJudge',
    definition(t) {
        t.nonNull.string('name');
        t.nonNull.string('jobTitle');
        t.nonNull.string('avatar');
    }
})

const TournamentFAQ = objectType({
    name: 'TournamentFAQ',
    definition(t) {
        t.nonNull.string('question');
        t.nonNull.string('answer');
    }
})



const TournamentEventTypeEnum = enumType({
    name: 'TournamentEventTypeEnum',
    members: {
        TwitterSpace: 0,
        Workshop: 1,
        IRLMeetup: 2,
        OnlineMeetup: 3,
    },
});


const TournamentEvent = objectType({
    name: 'TournamentEvent',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('image');
        t.nonNull.string('description');
        t.nonNull.date('date');
        t.nonNull.string('location');
        t.nonNull.string('website');
        t.nonNull.field('type', { type: TournamentEventTypeEnum })
        t.nonNull.list.nonNull.string('links');
    }
})

const Tournament = objectType({
    name: 'Tournament',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('description');
        t.nonNull.string('thumbnail_image');
        t.nonNull.string('cover_image');
        t.nonNull.date('start_date');
        t.nonNull.date('end_date');
        t.nonNull.string('location');
        t.nonNull.string('website');

        t.nonNull.int('events_count');
        t.nonNull.int('makers_count');
        t.nonNull.int('projects_count');

        t.nonNull.list.nonNull.field('prizes', { type: TournamentPrize, });
        t.nonNull.list.nonNull.field('judges', { type: TournamentJudge, });
        t.nonNull.list.nonNull.field('faqs', { type: TournamentFAQ, });
        t.nonNull.list.nonNull.field('events', { type: TournamentEvent, });
    }
})

const getTournamentById = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field('getTournamentById', {
            type: Tournament,
            args: {
                id: nonNull(intArg()),
            },
            resolve(_, { id }) {
                return null
            }
        })
    }
})

const getMakersInTournament = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('getMakersInTournament', {
            type: "User",
            args: {
                tournamentId: nonNull(intArg()),
                ...paginationArgs({ take: 10 }),
                search: stringArg(),
                roleId: intArg(),
            },
            resolve(_, args) {


                let filters = [];

                if (args.search) filters.push({
                    OR: [
                        {
                            name: {
                                contains: args.search,
                                mode: 'insensitive'
                            }
                        },
                        {
                            jobTitle: {
                                contains: args.search,
                                mode: 'insensitive'
                            }
                        }
                    ]
                })


                if (args.roleId) filters.push({
                    roles: {
                        some: {
                            roleId: args.roleId
                        }
                    }
                })

                console.log(filters[0]);


                return prisma.user.findMany({
                    ...(filters.length > 0 && {
                        where: {
                            AND: filters
                        }
                    }),
                    skip: args.skip,
                    take: args.take,
                })
            }
        })
    }
})

module.exports = {
    // Types 
    Tournament,
    // Queries
    getTournamentById,
    getMakersInTournament,
}