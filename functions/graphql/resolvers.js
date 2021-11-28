const { parsePaymentRequest } = require('invoices');
const axios = require('axios');
const { createHash } = require('crypto');

function hexToUint8Array (hexString) {
  const match = hexString.match(/.{1,2}/g);
  if (match) {
    return new Uint8Array(match.map((byte) => parseInt(byte, 16)));
  }
}

// TODO validate responses
function getPaymetRequest(lightning_address, amount_in_sat) {
  const [name, domain] = lightning_address.split("@");
  const lnurl = `https://${domain}/.well-known/lnurlp/${name}`;
  return axios.get(lnurl)
    .then((response) => {
      console.log(response.data);
      const callbackUrl = response.data.callback;
      const amount = amount_in_sat * 1000; // msats
      return axios.get(callbackUrl, { params: { amount }} )
        .then(prResponse => {
          console.log(prResponse.data);
          return prResponse.data.pr;
        });
    })
    .catch(function (error) {
      console.error(error);
    })
}

module.exports = {
  Query: {
    allCategories: async (_source, args, context) => {
      return context.prisma.category.findMany({
        orderBy: { title: 'desc'},
        include: {
          project: {
            take: 5,
            orderBy: { votes_count: "desc" }
          }
        }
      });
    },
    allProjects: async (_source, args, context) => {
      const first = args.first || 50;
      const skip = args.skip || 0;
      return context.prisma.project.findMany({
        orderBy: { created_at: 'desc' },
        include: { category: true },
        skip,
        first,
      });
    },
    getProject: async (_source, args, context) => {
      return context.prisma.project.findUnique({
        where: {
          id: args.id,
        },
        include: { category: true }
      });
    },
  },
  Mutation: {
    vote: async (_source, args, context) => {
      const project = await context.prisma.project.findUnique({where: { id: args.project_id }});
      const pr = await getPaymetRequest(project.lightning_address, args.amount_in_sat);
      const invoice = parsePaymentRequest({ request: pr });
      return context.prisma.vote.create({
        data: {
          project_id: project.id,
          amount_in_sat: args.amount_in_sat,
          payment_request: pr,
          payment_hash: invoice.id,
        }
      });
    },
    confirmVote: async (_source, args, context) => {
      const paymentHash = createHash('sha256').update(hexToUint8Array(args.preimage)).digest('hex');
      // look for a vote for the payment request and the calculated payment hash
      const vote = await context.prisma.vote.findFirst({where: { payment_request: args.payment_request, payment_hash: paymentHash}});
      // if we find a vote it means the preimage is correct and we update the vote and mark it as paid
      if (vote) {
        return context.prisma.vote.update({
          where: { id: vote.id },
          data: {
            paid: true,
            preimage: args.preimage,
          }
        });
      } else {
        throw new Error("Invalid preimage");
      }
    }
  },
};