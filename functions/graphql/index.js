const { ApolloServer } = require("apollo-server-lambda");
const schema = require('./schema')


const server = new ApolloServer({
  schema,

  context: () => {
    return {
    };
  },
});

const apolloHandler = server.createHandler({
  cors: {
    origin: "*",
    methods: "*",
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
