const { parsePaymentRequest } = require("invoices");
const axios = require("axios");
const { createHash } = require("crypto");

function hexToUint8Array(hexString) {
  const match = hexString.match(/.{1,2}/g);
  if (match) {
    return new Uint8Array(match.map((byte) => parseInt(byte, 16)));
  }
}

// TODO: generaly validate LNURL responses
// get lnurl params
function getLnurlDetails(lnurl) {
  return axios.get(lnurl);
}

// parse lightning address and return a url that can be
// used in a request
function lightningAddressToLnurl(lightning_address) {
  const [name, domain] = lightning_address.split("@");
  return `https://${domain}/.well-known/lnurlp/${name}`;
}

// when pressing tip or selecting an amount.
// this is used for caching so the frontend doesnt
// have to make an additional http request to get
// the callback url for future visits
async function getLnurlCallbackUrl(lightning_address) {
  return getLnurlDetails(lightningAddressToLnurl(lightning_address)).then(
    (response) => {
      return response.data.callback;
    }
  );
}

async function getPaymetRequestForProject(project, amount_in_sat) {
  // # NOTE: CACHING LNURL CALLBACK URLS + PARAMETERS
  // LNURL flows have a lot of back and forth and can impact
  // the load time for your application users.
  // You may consider caching the callback url, or resolved
  // parameters but be mindful of this.
  // The LNURL service provider can change the callback url
  // details or the paramters that is returned we must be
  // careful when trying to optimise the amount of
  // requests so be mindful of this when you are storing
  // these items.
  let lnurlCallbackUrl = project.lnurl_callback_url;
  const amount = amount_in_sat * 1000; // msats
  if (!lnurlCallbackUrl) {
    lnurlCallbackUrl = await getLnurlCallbackUrl(project.lightning_address);
  }
  return axios
    .get(lnurlCallbackUrl, { params: { amount } })
    .then((prResponse) => {
      console.log(prResponse.data);
      return prResponse.data.pr;
    });
}

module.exports = {
  Query: {
    allCategories: async (_source, args, context) => {
      return context.prisma.category.findMany({
        orderBy: { title: "desc" },
        include: {
          project: {
            take: 5,
            orderBy: { votes_count: "desc" },
          },
        },
      });
    },
    getCategory: async (_source, args, context) => {
      return context.prisma.category.findUnique({
        where: { id: args.id },
        include: {
          project: {
            take: 5,
            orderBy: { votes_count: "desc" },
          },
        },
      });
    },
    newProjects: async (_source, args, context) => {
      const take = args.take || 50;
      const skip = args.skip || 0;
      return context.prisma.project.findMany({
        orderBy: { created_at: "desc" },
        include: { category: true },
        skip,
        take,
      });
    },
    allProjects: async (_source, args, context) => {
      const take = args.take || 50;
      const skip = args.skip || 0;
      return context.prisma.project.findMany({
        orderBy: { votes_count: "desc" },
        include: { category: true },
        skip,
        take,
      });
    },
    projectsByCategory: async (_source, args, context) => {
      const take = args.take || 50;
      const skip = args.skip || 0;
      const categoryId = args.category_id;
      return context.prisma.project.findMany({
        where: { category_id: categoryId },
        orderBy: { votes_count: "desc" },
        include: { category: true },
        skip,
        take,
      });
    },
    getProject: async (_source, args, context) => {
      return context.prisma.project.findUnique({
        where: {
          id: args.id,
        },
        include: { category: true },
      });
    },
    getLnurlDetailsForProject: async (_source, args, context) => {
      const project = await context.prisma.project.findUnique({
        where: {
          id: args.project_id,
        },
      });
      const lnurlDetails = await getLnurlDetails(
        lightningAddressToLnurl(project.lightning_address)
      );
      if (
        !lnurlDetails.data ||
        lnurlDetails.data.status.toLowerCase() !== "ok"
      ) {
        console.error(lnurlDetails.data);
        throw new Error("Recipient not available");
      }

      // cache the callback URL
      await context.prisma.project.update({
        where: { id: project.id },
        data: {
          lnurl_callback_url: lnurlDetails.data.callback,
        },
      });
      // # SENDING MESSAGES TO THE PROJECT OWNER USING LNURL-PAY COMMENTS
      // comments in lnurl pay can be used to send a private message or
      // post on the projcet owners site. could even be used for advertising
      // or tip messages. or can even be a pay to respond / paid advise
      return {
        minSendable: parseInt(lnurlDetails.data.minSendable) / 1000,
        maxSendable: parseInt(lnurlDetails.data.maxSendable) / 1000,
        metadata: lnurlDetails.data.metadata,
        commentAllowed: lnurlDetails.data.commentAllowed,
      };
    },
  },
  Mutation: {
    // votes are like BTC Pay Server / ecommerce store "orders"
    // the amount that needs to be paid is recorded, and the service
    // awaits the payment. once the payment is made then a verification
    // is necessary (confirmVote) since lnurl does not give a response
    // for a successful payment. the payment is asyncronmous so we
    // dont know when its get paid, and lnurl does not provide a webhook
    // setup, or something for us to poll or subscribe to so we determine
    // if a invoice is paid.
    // the way that we implemented this check is that the client needs
    // to provide the preimage for their vote to be counted on the site.
    //
    vote: async (_source, args, context) => {
      const project = await context.prisma.project.findUnique({
        where: { id: args.project_id },
      });
      const pr = await getPaymetRequestForProject(project, args.amount_in_sat);
      const invoice = parsePaymentRequest({ request: pr });
      return context.prisma.vote.create({
        data: {
          project_id: project.id,
          amount_in_sat: args.amount_in_sat,
          payment_request: pr,
          payment_hash: invoice.id,
        },
      });
    },
    confirmVote: async (_source, args, context) => {
      const paymentHash = createHash("sha256")
        .update(hexToUint8Array(args.preimage))
        .digest("hex");
      // look for a vote for the payment request and the calculated payment hash
      const vote = await context.prisma.vote.findFirst({
        where: {
          payment_request: args.payment_request,
          payment_hash: paymentHash,
        },
      });
      // if we find a vote it means the preimage is correct and we update the vote and mark it as paid
      // can we write this nicer?
      if (vote) {
        const project = await context.prisma.project.findUnique({
          where: { id: vote.project_id },
        });
        // count up votes cache
        await context.prisma.project.update({
          where: { id: project.id },
          data: {
            votes_count: project.votes_count + vote.amount_in_sat,
          },
        });
        // return the current vote
        return context.prisma.vote.update({
          where: { id: vote.id },
          data: {
            paid: true,
            preimage: args.preimage,
          },
        });
      } else {
        throw new Error("Invalid preimage");
      }
    },
  },
};
