import { APIGatewayEvent, Context } from "aws-lambda";
import { ApolloServer } from "apollo-server-lambda";
import { DocumentNode } from "graphql";
import schema from "./schema";
import extractUserFromCookie from "../../utils/extractUserFromCookie";

interface CustomContext {
  user?: {
    pubKey: string;
    id: string;
  } | null;
}

const server = new ApolloServer({
  schema,
  context: async ({
    event,
  }: {
    event: APIGatewayEvent;
  }): Promise<CustomContext> => {
    const user = await extractUserFromCookie(
      event.headers.cookie ?? event.headers.Cookie
    );
    return { user };
  },
});

const apolloHandler = server.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    },
  },
});

const handler = async (
  event: APIGatewayEvent,
  context: Context,
  args
): Promise<any> => {
  return apolloHandler(
    {
      ...event,
      requestContext: context,
    },
    context,
    args
  );
};

export { handler };
