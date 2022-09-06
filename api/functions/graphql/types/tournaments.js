const {
    intArg,
    objectType,
    stringArg,
    extendType,
    nonNull,
} = require('nexus');
const { prisma } = require('../../../prisma');



const Tournament = objectType({
    name: 'Tournament',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('description');
        t.nonNull.string('thumbnail_image');
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
        t.nonNull.string('website');
        t.nonNull.list.nonNull.field('tags', {
            type: "Tag",
            resolve: (parent) => {
                // return prisma.hackathon.findUnique({ where: { id: parent.id } }).tags();
                return [];
            }
        });
    }
})

const getAllTournaments = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('getAllTournaments', {
            type: Tournament,
            args: {
                sortBy: stringArg(),
                tag: intArg(),
            },
            resolve(_, args) {
                const { sortBy, tag } = args;
                return [];
            }
        })
    }
})

module.exports = {
    // Types 
    Tournament,
    // Queries
    getAllTournaments,
}