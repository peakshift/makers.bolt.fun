const {
    intArg,
    objectType,
    extendType,
    nonNull,
    stringArg,
    arg,
    enumType,
} = require('nexus')
const { parsePaymentRequest } = require('invoices');
const { getPaymetRequestForProject, hexToUint8Array } = require('./helpers');
const { createHash } = require('crypto');
const { prisma } = require('../prisma')


// the types of items we can vote to
const VOTE_ITEM_TYPE = enumType({
    name: 'VOTE_ITEM_TYPE',
    members: ['Story', 'Bounty', 'Question', 'Project', 'User', 'Comment'],
})

const Vote = objectType({
    name: 'Vote',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.int('amount_in_sat');
        t.nonNull.string('payment_request');
        t.nonNull.string('payment_hash');
        t.nonNull.boolean('paid');

        t.nonNull.field('project', {
            type: "Project",
            resolve: (parent, args,) => {
                return parent.project ?? prisma.vote.findUnique({
                    where: { id: parent.id }
                }).project()
            }
        })
    }
})

const Vote2 = objectType({
    name: 'Vote2',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.int('amount_in_sat');
        t.nonNull.string('payment_request');
        t.nonNull.string('payment_hash');
        t.nonNull.boolean('paid');

        t.nonNull.field('item_type', {
            type: "VOTE_ITEM_TYPE"
        })
        t.nonNull.int('item_id');

    }
})


const LnurlDetails = objectType({
    name: 'LnurlDetails',
    definition(t) {
        t.int('minSendable');
        t.int('maxSendable');
        t.string('metadata');
        t.int('commentAllowed');
    }
})

// This is the old voting mutation, it can only vote for projects (SHOULD BE REPLACED BY THE NEW VOTE MUTATION WHEN THAT ONE IS WORKING)
const voteMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field('vote', {
            type: "Vote",
            args: {
                project_id: nonNull(intArg()),
                amount_in_sat: nonNull(intArg())
            },
            resolve: async (_, args) => {
                const project = await prisma.project.findUnique({
                    where: { id: args.project_id },
                });
                const pr = await getPaymetRequestForProject(project, args.amount_in_sat);
                const invoice = parsePaymentRequest({ request: pr });
                return prisma.vote.create({
                    data: {
                        project_id: project.id,
                        amount_in_sat: args.amount_in_sat,
                        payment_request: pr,
                        payment_hash: invoice.id,
                    },
                    include: {
                        project: true
                    }
                });
            }
        })
    }
})



// This is the new voting mutation, it can vote for any type of item that we define in the VOTE_ITEM_TYPE enum
const vote2Mutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field('vote2', {
            type: "Vote2",
            args: {
                item_type: arg({
                    type: nonNull("VOTE_ITEM_TYPE")
                }),
                item_id: nonNull(intArg()),
                amount_in_sat: nonNull(intArg())
            },
            resolve: async (_, args) => {

                const { item_id, item_type, amount_in_sat } = args;

                // Create the invoice here according to it's type & get a payment request and a payment hash

                return {
                    id: 111,
                    amount_in_sat: amount_in_sat,
                    payment_request: '{{payment_request}}',
                    payment_hash: '{{payment_hash}}',
                    paid: true,
                    item_type: item_type,
                    item_id: item_id,
                }
            }

        })
    }
})


const confirmVoteMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field('confirmVote', {
            type: "Vote",
            args: {
                payment_request: nonNull(stringArg()),
                preimage: nonNull(stringArg())
            },
            resolve: async (_, args) => {
                const paymentHash = createHash("sha256")
                    .update(hexToUint8Array(args.preimage))
                    .digest("hex");
                // look for a vote for the payment request and the calculated payment hash
                const vote = await prisma.vote.findFirst({
                    where: {
                        payment_request: args.payment_request,
                        payment_hash: paymentHash,
                    },
                });
                // if we find a vote it means the preimage is correct and we update the vote and mark it as paid
                // can we write this nicer?
                if (vote) {
                    const project = await prisma.project.findUnique({
                        where: { id: vote.project_id },
                    });
                    // count up votes cache
                    await prisma.project.update({
                        where: { id: project.id },
                        data: {
                            votes_count: project.votes_count + vote.amount_in_sat,
                        },
                    });
                    // return the current vote
                    return prisma.vote.update({
                        where: { id: vote.id },
                        data: {
                            paid: true,
                            preimage: args.preimage,
                        },
                        include: {
                            project: true
                        }
                    });
                } else {
                    throw new Error("Invalid preimage");
                }
            }
        })
    }
})

module.exports = {
    // Enums
    VOTE_ITEM_TYPE,

    // Types
    Vote,
    Vote2,
    LnurlDetails,

    // Mutations
    voteMutation,
    vote2Mutation,
    confirmVoteMutation
}