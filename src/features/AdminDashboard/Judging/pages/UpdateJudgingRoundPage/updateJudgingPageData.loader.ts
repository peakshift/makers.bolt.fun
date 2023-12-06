import { createLoader } from "src/utils/routing/helpers";
import {
  GetJudgingRoundDetailsDocument,
  GetJudgingRoundDetailsQuery,
  GetJudgingRoundDetailsQueryVariables,
} from "src/graphql";

export type LoaderData = GetJudgingRoundDetailsQuery;

export const updateJudgingPageDataLoader =
  createLoader<GetJudgingRoundDetailsQueryVariables>(({ params }) => ({
    query: GetJudgingRoundDetailsDocument,
    variables: { judgingRoundId: params.roundId! },
  }));
