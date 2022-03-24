const {
    intArg,
    objectType,
    extendType,
    nonNull,
    stringArg,
} = require('nexus')
const { parsePaymentRequest } = require('invoices');
const { getPaymetRequestForProject, hexToUint8Array } = require('./helpers');
const { createHash } = require('crypto');
const { prisma } = require('../prisma')



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


const LnurlDetails = objectType({
    name: 'LnurlDetails',
    definition(t) {
        t.int('minSendable');
        t.int('maxSendable');
        t.string('metadata');
        t.int('commentAllowed');
    }
})

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
    // Types
    Vote,
    LnurlDetails,

    // Mutations
    voteMutation,
    confirmVoteMutation
}