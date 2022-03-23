const { ApolloServer } = require("apollo-server-lambda");
// const resolvers = require("./resolvers/resolvers");
// const typeDefs = require("./schema");
// const { prisma } = require('./prisma')
const schema = require('./schema')


const server = new ApolloServer({
  schema,

  context: () => {
    return {
      // prisma,
    };
  },
});

const apolloHandler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});


// https://github.com/vendia/serverless-express/issues/427#issuecomment-924580007
const handler = (event, context, ...args) => {
  return apolloHandler(
    {
      ...event,
      requestContext: context,
    },
    context,
    ...args
  );
};

exports.handler = handler;
