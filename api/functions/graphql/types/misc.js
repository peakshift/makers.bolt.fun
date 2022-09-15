const { objectType, extendType, inputObjectType } = require("nexus");
const { prisma } = require('../../../prisma');

const ImageInput = inputObjectType({
    name: 'ImageInput',
    definition(t) {
        t.string('id');
        t.string('name');
        t.nonNull.string('url');
    }
});


module.exports = {
    // Types
    ImageInput,

    // Queries 
}