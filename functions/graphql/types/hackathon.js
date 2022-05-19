const {
    intArg,
    objectType,
    stringArg,
    extendType,
    nonNull,
} = require('nexus');



const Hackathon = objectType({
    name: 'Hackathon',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('description');
        t.nonNull.string('cover_image');
        t.nonNull.string('date');
        t.nonNull.string('location');
        t.nonNull.string('website');
        t.nonNull.list.nonNull.field('topics', {
            type: "Topic",
            resolve: (parent) => {
                return []
            }
        });
    }
})

const getAllHackathons = extendType({
    type: "Query",
    args: {
        sortBy: stringArg(),
        topic: stringArg(),
    },
    definition(t) {
        t.nonNull.list.nonNull.field('getAllHackathons', {
            type: "Hackathon",
            resolve(_, args) {
                return [];
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