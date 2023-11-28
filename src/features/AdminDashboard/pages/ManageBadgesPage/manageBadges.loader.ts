import { createLoader } from "src/utils/routing/helpers";
import {
  GetAllBadgesDocument,
  GetAllBadgesQuery,
  GetAllBadgesQueryVariables,
} from "src/graphql";

export type LoaderData = GetAllBadgesQuery;

export const manageBadgesLoader = createLoader<GetAllBadgesQueryVariables>(
  () => ({
    query: GetAllBadgesDocument,
  })
);
