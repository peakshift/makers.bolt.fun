import { createLoader } from "src/utils/routing/helpers";
import {
  GetTagInfoDocument,
  GetTagInfoQuery,
  GetTagInfoQueryVariables,
} from "src/graphql";

export type LoaderData = GetTagInfoQuery;

export const tagPageLoader = createLoader<GetTagInfoQueryVariables>(
  ({ params }) => ({
    query: GetTagInfoDocument,
    variables: { tag: params.tag! },
  })
);
