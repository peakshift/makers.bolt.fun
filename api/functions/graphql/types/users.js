
const { prisma } = require('../../../prisma');
const { objectType, extendType, intArg, nonNull, inputObjectType } = require("nexus");
const { getUserByPubKey } = require("../../../auth/utils/helperFuncs");
const { removeNulls } = require("./helpers");



const User = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('name');
        t.nonNull.string('avatar');
        t.nonNull.date('join_date');
        t.string('role');
        t.string('email')
        t.string('jobTitle')
        t.string('lightning_address')
        t.string('website')
        t.string('twitter')
        t.string('github')
        t.string('linkedin')
        t.string('bio')
        t.string('location')
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

const profile = extendType({
    type: "Query",
    definition(t) {
        t.field('profile', {
            type: "User",
            args: {
                id: nonNull(intArg())
            },
            async resolve(parent, { id }) {
                return prisma.user.findFirst({
                    where: { id }
                })
            }
        })
    }
})

const UpdateProfileInput = inputObjectType({
    name: 'UpdateProfileInput',
    definition(t) {
        t.string('name');
        t.string('avatar');
        t.string('email')
        t.string('jobTitle')
        t.string('lightning_address')
        t.string('website')
        t.string('twitter')
        t.string('github')
        t.string('linkedin')
        t.string('bio')
        t.string('location')
    }
})

const updateProfile = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('updateProfile', {
            type: 'User',
            args: { data: UpdateProfileInput },
            async resolve(_root, args, ctx) {
                const user = await getUserByPubKey(ctx.userPubKey);

                // Do some validation
                if (!user)
                    throw new Error("You have to login");
                // TODO: validate new data


                // Preprocess & insert

                return prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: removeNulls(args.data)
                })
            }
        })
    },
})



module.exports = {
    // Types
    User,
    UpdateProfileInput,
    // Queries
    me,
    profile,
    // Mutations
    updateProfile,
}