const { objectType } = require("nexus");

const User = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('name');
        t.nonNull.string('image');

    }
})


module.exports = {
    // Types
    User
}