import { createLoader } from "src/utils/routing/helpers";
import {
  GetAllTopicsDocument,
  GetAllTopicsQuery,
  GetAllTopicsQueryVariables,
} from "src/graphql";

export type LoaderData = GetAllTopicsQuery;

export const allTopicsPageLoader = createLoader<GetAllTopicsQueryVariables>(
  () => ({
    query: GetAllTopicsDocument,
  })
);
