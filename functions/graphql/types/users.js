const { objectType } = require("nexus");

const User = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('name');
        t.nonNull.string('avatar');
    }
})


module.exports = {
    // Types
    User
}