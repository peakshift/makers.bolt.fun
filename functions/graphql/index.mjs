const { ApolloServer } = require("apollo-server-lambda");
const { PrismaClient } = require("@prisma/client");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const prisma = new PrismaClient();
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: () => {
    return {
      prisma,
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
