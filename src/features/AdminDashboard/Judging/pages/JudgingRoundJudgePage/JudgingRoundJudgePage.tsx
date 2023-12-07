import dayjs from "dayjs";
import { marked } from "marked";
import { useParams } from "react-router-dom";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import { useJudgingRoundJudgePageQuery } from "src/graphql";
import ProjectScoreCard from "./ProjectScoreCard";

export default function JudgingRoundJudgePage() {
  const { roundId } = useParams<{ roundId: string }>();

  if (!roundId) throw new Error("No judging round id provided");

  const query = useJudgingRoundJudgePageQuery({
    variables: {
      judgingRoundId: roundId,
    },
  });

  if (query.loading || !query.data) return <LoadingPage />;

  const judgingRound = query.data.getJudgingRoundById;

  return (
    <div className="flex flex-col gap-42">
      <section>
        <div className="flex flex-wrap items-center gap-16 mb-24">
          <h2 className="text-h2 font-bolder text-gray-900">
            {judgingRound.title}
          </h2>
        </div>
        <p className="mb-16">
          Round closes on:{" "}
          <span className="font-bold">
            {dayjs(judgingRound.end_date).format("MMM DD")}
          </span>
        </p>
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{
            __html: marked.parse(judgingRound.description),
          }}
        ></div>
      </section>

      <section>
        <h2 className="text-h3 font-bold mb-16">
          Projects ({judgingRound.projects.length})
        </h2>
        <ul className="flex flex-col gap-8">
          {judgingRound.projects.map((project) => (
            <li key={project.id} className="">
              <ProjectScoreCard
                project={project}
                scores={
                  judgingRound.my_scores.find(
                    (score) => score.project.id === project.id
                  )?.score
                }
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
