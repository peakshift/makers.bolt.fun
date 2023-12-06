import React from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import { useGetJudgingRoundDetailsQuery } from "src/graphql";

export default function UpdateJudgingRoundPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) throw new Error("No judging round id provided");

  const query = useGetJudgingRoundDetailsQuery({
    variables: {
      judgingRoundId: id!,
    },
    skip: !id,
  });

  if (query.loading || !query.data) return <LoadingPage />;

  const judgingRound = query.data.getJudgingRoundById;

  return (
    <div>UpdateJudgingRoundPage</div>
    // Check the badges form
  );
}
