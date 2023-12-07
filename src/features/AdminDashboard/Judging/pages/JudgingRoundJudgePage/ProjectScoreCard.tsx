import linkifyHtml from "linkifyjs/lib/linkify-html";
import React from "react";
import { FaDiscord } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { Link } from "react-router-dom";
import Card from "src/Components/Card/Card";
import ProjectLinksList from "src/features/Projects/pages/ProjectPage/Components/ProjectLinksList/ProjectLinksList";
import { Project, TournamentJudgingRoundProjectScore } from "src/graphql";
import { createRoute } from "src/utils/routing";

interface Props {
  project: Pick<
    Project,
    | "id"
    | "title"
    | "tagline"
    | "hashtag"
    | "thumbnail_image"
    | "description"
    | "github"
    | "website"
    | "discord"
    | "twitter"
    | "youtube"
    | "npub"
    | "figma"
    | "replit"
  >;
  scores?: TournamentJudgingRoundProjectScore;
}

export default function ProjectScoreCard({ project, scores }: Props) {
  return (
    <Card className="flex flex-col gap-12">
      <div className="flex items-center gap-12">
        <img
          className="w-48 aspect-square rounded-12 border border-gray-100"
          alt=""
          src={project.thumbnail_image!}
        />
        <div className="overflow-hidden">
          <Link to={createRoute({ type: "project", tag: project.hashtag })}>
            <p className="text-body4 text-gray-800 font-bold underline whitespace-nowrap overflow-hidden text-ellipsis">
              {project.title}
            </p>
          </Link>
          <p className="text-gray-600 text-body5">{project.tagline}</p>
        </div>
      </div>

      <div
        className="mt-16 text-body4 text-gray-600 leading-normal whitespace-pre-line"
        dangerouslySetInnerHTML={{
          __html: linkifyHtml(project.description, {
            className: " text-blue-500 underline",
            defaultProtocol: "https",
            target: "_blank",
            rel: "noreferrer",
          }),
        }}
      ></div>
      <div>
        <p className="text-body5 text-gray-500 font-medium mb-8">Links</p>

        <div className="flex flex-wrap gap-16">
          <ProjectLinksList project={project} />
        </div>
      </div>
    </Card>
  );
}
