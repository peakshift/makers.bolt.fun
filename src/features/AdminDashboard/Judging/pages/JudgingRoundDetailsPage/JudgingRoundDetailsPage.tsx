import dayjs from "dayjs";
import { marked } from "marked";
import React from "react";
import { MdEdit } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import BackButton from "src/Components/BackButton/BackButton";
import Button from "src/Components/Button/Button";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import { useTournament } from "src/features/AdminDashboard/Tournaments/pages/ManageTournamentPage/TournamentDetailsContext";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { useGetJudgingRoundDetailsQuery } from "src/graphql";
import { createRoute } from "src/utils/routing";

export default function JudgingRoundDetailsPage() {
  const { roundId: id } = useParams<{ roundId: string }>();

  const {
    tournamentDetails: { slug },
  } = useTournament();

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
    <div className="flex flex-col gap-42">
      <section>
        <div className="flex flex-wrap items-center gap-16 mb-24">
          <BackButton
            backRoute={createRoute({
              type: "judging-rounds",
              page: "list",
              tournamentIdOrSlug: slug,
            })}
          />
          <h2 className="text-h2 font-bolder text-gray-900">
            {judgingRound.title}
          </h2>
          <Button
            size="sm"
            color="gray"
            className="ml-auto self-center"
            href={createRoute({
              type: "judging-rounds",
              page: "update",
              tournamentIdOrSlug: slug,
              roundId: judgingRound.id,
            })}
          >
            Edit Info <MdEdit />
          </Button>
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
            <li key={project.id} className="flex items-center gap-12">
              <img
                className="w-48 aspect-square rounded-12 border border-gray-100"
                alt=""
                src={project.thumbnail_image!}
              />
              <div className="overflow-hidden">
                <Link
                  to={createRoute({ type: "project", tag: project.hashtag })}
                >
                  <p className="text-body4 text-gray-800 font-bold underline whitespace-nowrap overflow-hidden text-ellipsis">
                    {project.title}
                  </p>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-h3 font-bold mb-16">
          Judges ({judgingRound.judges.length})
        </h2>
        <ul className="flex flex-col gap-8">
          {judgingRound.judges.map((judge) => (
            <li key={judge.id} className="flex items-center gap-12">
              <Avatar src={judge.avatar} width={48} />
              <div className="overflow-hidden">
                <Link
                  to={createRoute({
                    type: "profile",
                    id: judge.id,
                    username: judge.name,
                  })}
                >
                  <p className="text-body4 text-gray-800 font-bold underline whitespace-nowrap overflow-hidden text-ellipsis">
                    {judge.name}
                  </p>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
