import { createLoader } from "src/utils/routing/helpers";
import {
  PostDetailsDocument,
  PostDetailsQuery,
  PostDetailsQueryVariables,
  Post_Type,
} from "src/graphql";
import { capitalize } from "src/utils/helperFunctions";

export type LoaderData = PostDetailsQuery | null;

export const postDetailsPageLoader = createLoader<
  PostDetailsQueryVariables,
  { type: Post_Type }
>(({ params }, { type }) => {
  const { slug } = params;

  const id = Number(
    slug?.includes("--") ? slug.slice(slug.lastIndexOf("--") + 2) : slug
  );

  return {
    query: PostDetailsDocument,
    variables: {
      id,
      type,
    },
    skip: isNaN(id),
  };
});
