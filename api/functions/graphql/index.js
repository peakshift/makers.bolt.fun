const { ApolloServer } = require("apollo-server-lambda");
const schema = require("./schema");
const extractUserFromCookie = require("../../utils/extractUserFromCookie");

const server = new ApolloServer({
  schema,
  context: async ({ event }) => {
    const user = await extractUserFromCookie(
      event.headers.cookie ?? event.headers.Cookie
    );
    return { user };
  },
});

const apolloHandler = server.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: [
        "https://tools.bolt.fun",
        "http://localhost:3000",
        "http://localhost:5173",
        "https://studio.apollographql.com",
      ],
      credentials: true,
    },
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
