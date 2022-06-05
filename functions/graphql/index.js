const { ApolloServer } = require("apollo-server-lambda");
const schema = require('./schema')
const cookie = require('cookie')
const jose = require('jose');
const { CONSTS } = require('../utils');

const extractKey = async (cookieHeader) => {
  const cookies = cookie.parse(cookieHeader ?? '');
  const authToken = cookies.Authorization;
  if (authToken) {
    const token = authToken.split(' ')[1];
    const { payload } = await jose.jwtVerify(token, Buffer.from(CONSTS.JWT_SECRET), {
      algorithms: ['HS256'],
    })
    return payload.pubKey
  }
  return null;
}


const server = new ApolloServer({
  schema,
  context: async ({ event }) => {
    const userPubKey = await extractKey(event.headers.cookie ?? event.headers.Cookie)
    return { userPubKey }
  },
});

const apolloHandler = server.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: true,
      credentials: true,
    }
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
