const { ApolloServer } = require("apollo-server-lambda");
const schema = require('./schema')
const cookie = require('cookie')
const jose = require('jose');
const { CONSTS } = require('../utils');



const server = new ApolloServer({
  schema,

  context: async ({ event }) => {
    const cookies = cookie.parse(event.headers.Cookie ?? '');
    const authToken = cookies.Authorization;
    if (authToken) {
      const token = authToken.split(' ')[1];
      const { payload } = await jose.jwtVerify(token, Buffer.from(CONSTS.JWT_SECRET), {
        algorithms: ['HS256'],
      })
      return { userPubKey: payload.pubKey }
    }

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
