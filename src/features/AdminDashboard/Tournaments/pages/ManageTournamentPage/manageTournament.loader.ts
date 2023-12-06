import { createLoader } from "src/utils/routing/helpers";
import {
  ManageTournamentDocument,
  ManageTournamentQuery,
  ManageTournamentQueryVariables,
} from "src/graphql";

export type LoaderData = ManageTournamentQuery;

export const manageTournamentPageLoader =
  createLoader<ManageTournamentQueryVariables>(({ params }) => ({
    query: ManageTournamentDocument,
    variables: {
      idOrSlug: params.id!,
    },
  }));
