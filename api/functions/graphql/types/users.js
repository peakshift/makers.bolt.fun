
const { prisma } = require('../../../prisma');
const { objectType, extendType, intArg, nonNull, inputObjectType, list } = require("nexus");
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
        t.string('nostr_prv_key')
        t.string('nostr_pub_key')

        t.nonNull.list.nonNull.field('stories', {
            type: "Story",
            resolve: (parent) => {
                return prisma.story.findMany({ where: { user_id: parent.id, is_published: true }, orderBy: { createdAt: "desc" } });
            }
        });
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
            async resolve(parent, { id }, ctx) {
                const user = await getUserByPubKey(ctx.userPubKey);
                const isSelf = user?.id === id;
                const profile = await prisma.user.findFirst({
                    where: { id },
                });
                if (!isSelf)
                    profile.nostr_prv_key = null;
                return profile;
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


const UserKey = objectType({
    name: 'UserKey',
    definition(t) {
        t.nonNull.string('key');
        t.nonNull.string('name');
    }
})

const myWalletsKeys = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field('myWalletsKeys', {
            type: "UserKey",

            async resolve(_, __, ctx) {
                const user = await getUserByPubKey(ctx.userPubKey);

                if (!user)
                    throw new Error("You have to login");

                return prisma.userKey.findMany({
                    where: {
                        user_id: user.id,
                    }
                })
            }
        })
    }
})

const UserKeyInputType = inputObjectType({
    name: 'UserKeyInputType',
    definition(t) {
        t.nonNull.string('key');
        t.nonNull.string('name');
    }
})



const updateUserWalletKeys = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.list.nonNull.field('updateUserWalletKeys', {
            type: 'UserKey',
            args: { data: list(nonNull(UserKeyInputType)) },
            async resolve(_root, args, ctx) {



                const user = await getUserByPubKey(ctx.userPubKey);
                if (!user)
                    throw new Error("You have to login");



                // Check if all the sent keys belong to the user
                const userKeys = (await prisma.userKey.findMany({
                    where: {
                        AND: {
                            user_id: {
                                equals: user.id,
                            },
                            key: {
                                in: args.data.map(i => i.key)
                            }
                        },
                    },
                    select: {
                        key: true
                    }
                })).map(i => i.key);

                const newKeys = [];
                for (let i = 0; i < args.data.length; i++) {
                    const item = args.data[i];
                    if (userKeys.includes(item.key))
                        newKeys.push(item);
                }


                if (newKeys.length === 0)
                    throw new Error("You can't delete all your keys")

                await prisma.userKey.deleteMany({
                    where: {
                        user_id: user.id
                    }
                })

                await prisma.userKey.createMany({
                    data: newKeys.map(i => ({
                        user_id: user.id,
                        key: i.key,
                        name: i.name,
                    }))
                })

                return newKeys;

            }
        })
    }
})



module.exports = {
    // Types
    User,
    UpdateProfileInput,
    UserKey,
    // Queries
    me,
    profile,
    myWalletsKeys,
    // Mutations
    updateProfile,
    updateUserWalletKeys,
}