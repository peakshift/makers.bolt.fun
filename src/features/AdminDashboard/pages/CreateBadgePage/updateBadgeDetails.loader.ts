import { createLoader } from "src/utils/routing/helpers";
import {
  GetBadgeToEditDetailsDocument,
  GetBadgeToEditDetailsQuery,
  GetBadgeToEditDetailsQueryVariables,
} from "src/graphql";

export type LoaderData = GetBadgeToEditDetailsQuery;

export const updateBadgeDetailsLoader =
  createLoader<GetBadgeToEditDetailsQueryVariables>(({ params }) => ({
    query: GetBadgeToEditDetailsDocument,
    variables: { idOrSlug: params.idOrSlug! },
  }));
