import dayjs from "dayjs";
import { marked } from "marked";
import { useState } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import { useJudgingRoundJudgePageQuery } from "src/graphql";
import ProjectScoreCard from "./ProjectScoreCard";

export default function JudgingRoundJudgePage() {
  const { roundId } = useParams<{ roundId: string }>();

  if (!roundId) throw new Error("No judging round id provided");

  const [judgedProjects, setJudgedProjects] = useState<number[]>([]);

  const query = useJudgingRoundJudgePageQuery({
    variables: {
      judgingRoundId: roundId,
    },
    onCompleted: (data) => {
      data.getJudgingRoundById.my_scores.forEach(({ project, scores }) => {
        for (const [key, score] of Object.entries(scores)) {
          if (key === "__typename") continue;

          if (score != null) {
            setJudgedProjects((prev) => {
              if (prev.includes(project.id)) return prev;

              return [...prev, project.id];
            });
            break;
          }
        }
      });
    },
  });

  if (query.loading || !query.data) return <LoadingPage />;

  const judgingRound = query.data.getJudgingRoundById;

  return (
    <div className="page-container">
      <div className="flex flex-col gap-42">
        <section>
          <div className="flex flex-wrap items-center gap-16 mb-24">
            <h2 className="text-h2 font-bolder text-gray-900">
              {judgingRound.title}
            </h2>
          </div>
          <p className="mb-16 ">
            Judging closes in:{" "}
            <span className="font-bold text-orange-500 text-body3">
              {getDateTimeDifference(judgingRound.end_date)}
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
          <div className="mb-16">
            <p>
              You scored{" "}
              <span className="font-bold text-green-600">
                {judgedProjects.length}
              </span>{" "}
              out of {judgingRound.projects.length} projects
            </p>
            <div className="relative h-4 w-full mt-8 rounded-4 overflow-hidden bg-gray-200">
              <div
                className="absolute h-full bg-green-500"
                style={{
                  width: `${
                    (judgedProjects.length / judgingRound.projects.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <ul className="flex flex-col gap-8">
            {judgingRound.projects.map((project) => (
              <li key={project.id} className="">
                <ProjectScoreCard
                  project={project}
                  roundId={judgingRound.id}
                  scores={
                    judgingRound.my_scores.find(
                      (score) => score.project.id === project.id
                    )?.scores
                  }
                  note={
                    judgingRound.my_scores.find(
                      (score) => score.project.id === project.id
                    )?.note
                  }
                  onUpdatedScore={(scores) => {
                    let hasNonNullScore = false;

                    for (const [key, score] of Object.entries(scores)) {
                      if (key === "__typename") continue;

                      if (score != null) {
                        setJudgedProjects((prev) => {
                          if (prev.includes(project.id)) return prev;

                          return [...prev, project.id];
                        });
                        hasNonNullScore = true;
                        break;
                      }
                    }

                    if (!hasNonNullScore)
                      setJudgedProjects((prev) =>
                        prev.filter((id) => id !== project.id)
                      );
                  }}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function getDateTimeDifference(endDate: string) {
  const diffInMs = dayjs(endDate).diff(new Date());

  if (diffInMs < 0) return "Round has ended";

  // "## days ## hours"
  return `${Math.floor(diffInMs / 1000 / 60 / 60 / 24)} days ${Math.floor(
    (diffInMs / 1000 / 60 / 60) % 24
  )} hours`;
}
