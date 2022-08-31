const {
    intArg,
    objectType,
    stringArg,
    extendType,
    nonNull,
} = require('nexus');
const { prisma } = require('../../../prisma');



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
        t.nonNull.string('type');
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

module.exports = {
    // Types 
    Tournament,
    // Queries
    getTournamentById,
}