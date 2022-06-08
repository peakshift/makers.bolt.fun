const { ApolloServer } = require("apollo-server-lambda");
const schema = require('./schema')
const { createExpressApp } = require("../../modules");


const server = new ApolloServer({
  schema,
  context: async ({ event, context, express }) => {
    const userPubKey = express.req.user?.id;
    return { userPubKey }
  },
});



const apolloHandler = server.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      credentials: true,
    }
  },
  expressAppFromMiddleware(middleware) {
    const app = createExpressApp();
    app.use(middleware)
    return app;
  }
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
