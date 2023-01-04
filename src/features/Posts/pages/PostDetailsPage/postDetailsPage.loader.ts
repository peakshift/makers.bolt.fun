import { createLoader } from "src/utils/routing/helpers";
import {
  PostDetailsDocument,
  PostDetailsQuery,
  PostDetailsQueryVariables,
  Post_Type,
} from "src/graphql";
import { capitalize } from "src/utils/helperFunctions";

export type LoaderData = PostDetailsQuery;

export const postDetailsPageLoader = createLoader<
  PostDetailsQueryVariables,
  { type: "story" | "question" }
>(({ params }, { type }) => {
  const { slug } = params;

  const id = Number(
    slug?.includes("--") ? slug.slice(slug.lastIndexOf("--") + 2) : slug
  );

  return {
    query: PostDetailsDocument,
    variables: {
      id,
      type: capitalize(type) as Post_Type,
    },
    skip: isNaN(id),
  };
});
