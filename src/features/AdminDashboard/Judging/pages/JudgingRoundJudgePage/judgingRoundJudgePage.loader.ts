import { createLoader } from "src/utils/routing/helpers";
import {
  JudgingRoundJudgePageDocument,
  JudgingRoundJudgePageQuery,
  JudgingRoundJudgePageQueryVariables,
} from "src/graphql";

export type LoaderData = JudgingRoundJudgePageQuery;

export const judgingRoundJudgePageDataLoader =
  createLoader<JudgingRoundJudgePageQueryVariables>(({ params }) => ({
    query: JudgingRoundJudgePageDocument,
    variables: { judgingRoundId: params.roundId! },
  }));
