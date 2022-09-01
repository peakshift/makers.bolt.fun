
const { prisma } = require('../../../prisma');
const { objectType, extendType, intArg, nonNull, inputObjectType, interfaceType, list } = require("nexus");
const { getUserByPubKey } = require("../../../auth/utils/helperFuncs");
const { removeNulls } = require("./helpers");




const BaseUser = interfaceType({
    name: 'BaseUser',
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


        t.nonNull.list.nonNull.field('stories', {
            type: "Story",
            resolve: (parent) => {
                return prisma.story.findMany({ where: { user_id: parent.id, is_published: true }, orderBy: { createdAt: "desc" } });
            }
        });


    },
    resolveType() {
        return null
    },
})

const User = objectType({
    name: 'User',
    definition(t) {
        t.implements('BaseUser')
    }
})

const MyProfile = objectType({
    name: 'MyProfile',
    definition(t) {
        t.implements('BaseUser')
        t.string('nostr_prv_key')
        t.string('nostr_pub_key')

        t.nonNull.list.nonNull.field('walletsKeys', {
            type: "WalletKey",
            resolve: async (parent, _, context) => {
                const userKeys = await prisma.user.findUnique({ where: { id: parent.id } }).userKeys();
                return userKeys.map(k => ({ ...k, is_current: k.key === context.userPubKey }))
            }
        });
    }
})


const me = extendType({
    type: "Query",
    definition(t) {
        t.field('me', {
            type: "MyProfile",
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
                return prisma.user.findUnique({ where: { id } })
            }
        })
    }
})

const ProfileDetailsInput = inputObjectType({
    name: 'ProfileDetailsInput',
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

const updateProfileDetails = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('updateProfileDetails', {
            type: 'MyProfile',
            args: { data: ProfileDetailsInput },
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


const WalletKey = objectType({
    name: 'WalletKey',
    definition(t) {
        t.nonNull.string('key');
        t.nonNull.string('name');
        t.nonNull.boolean('is_current')
    }
})



const UserKeyInputType = inputObjectType({
    name: 'UserKeyInputType',
    definition(t) {
        t.nonNull.string('key');
        t.nonNull.string('name');
    }
})



const updateUserPreferences = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('updateUserPreferences', {
            type: 'MyProfile',
            args: { userKeys: list(nonNull(UserKeyInputType)) },
            async resolve(_root, args, ctx) {

                const user = await getUserByPubKey(ctx.userPubKey);
                if (!user)
                    throw new Error("You have to login");


                //Update the userkeys
                //--------------------

                // Check if all the sent keys belong to the user
                const userKeys = (await prisma.userKey.findMany({
                    where: {
                        AND: {
                            user_id: {
                                equals: user.id,
                            },
                            key: {
                                in: args.userKeys.map(i => i.key)
                            }
                        },
                    },
                    select: {
                        key: true
                    }
                })).map(i => i.key);

                const newKeys = [];
                for (let i = 0; i < args.userKeys.length; i++) {
                    const item = args.userKeys[i];
                    if (userKeys.includes(item.key))
                        newKeys.push(item);
                }


                if (newKeys.length === 0)
                    throw new Error("You can't delete all your wallets keys")

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

                return prisma.user.findUnique({ where: { id: user.id } });
            }
        })
    }
})




module.exports = {
    // Types
    BaseUser,
    User,
    MyProfile,
    WalletKey,
    // Queries
    me,
    profile,
    // Mutations
    updateProfileDetails,
    updateUserPreferences,
}
