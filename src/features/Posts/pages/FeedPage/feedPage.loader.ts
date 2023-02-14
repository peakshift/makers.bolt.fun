import { createLoader } from "src/utils/routing/helpers";
import { FeedDocument, FeedQuery, FeedQueryVariables } from "src/graphql";

export type LoaderData = FeedQuery;

export const feedPageLoader = createLoader<FeedQueryVariables>(() => {
  return {
    query: FeedDocument,
    variables: {
      take: 10,
      skip: 0,
      sortBy: "recent",
      tag: null,
    },
  };
});
