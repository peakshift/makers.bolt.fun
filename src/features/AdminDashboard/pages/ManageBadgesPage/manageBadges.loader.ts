import { createLoader } from "src/utils/routing/helpers";
import {
  ManageBadgesDocument,
  ManageBadgesQuery,
  ManageBadgesQueryVariables,
} from "src/graphql";

export type LoaderData = ManageBadgesQuery;

export const manageBadgesLoader = createLoader<ManageBadgesQueryVariables>(
  () => ({
    query: ManageBadgesDocument,
  })
);
