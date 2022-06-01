const { objectType, extendType } = require("nexus");
const { getUserByPubKey } = require("../../auth/utils/helperFuncs");



const User = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('name');
        t.nonNull.string('avatar');
    }
})


const me = extendType({
    type: "Query",
    definition(t) {
        t.field('me', {
            type: "User",
            async resolve(parent, args, context) {
                const user = await getUserByPubKey(context.userPubKey)
                return user
            }
        })
    }
})

module.exports = {
    // Types
    User,

    // Queries
    me,
}