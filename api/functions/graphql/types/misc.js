const { inputObjectType } = require("nexus");

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