import { yupResolver } from "@hookform/resolvers/yup";
import linkifyHtml from "linkifyjs/lib/linkify-html";
import React from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { FaDiscord } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { Link } from "react-router-dom";
import Badge from "src/Components/Badge/Badge";
import Button from "src/Components/Button/Button";
import Card from "src/Components/Card/Card";
import ProjectLinksList from "src/features/Projects/pages/ProjectPage/Components/ProjectLinksList/ProjectLinksList";
import {
  Project,
  ScoreProjectInput,
  Story,
  Tag,
  TournamentJudgingRoundProjectScore,
  useScoreTournamentProjectMutation,
} from "src/graphql";
import { NotificationsService } from "src/services";
import {
  extractErrorMessage,
  getDateDifference,
} from "src/utils/helperFunctions";
import { createRoute } from "src/utils/routing";
import * as yup from "yup";

interface Props {
  roundId: string;
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
  latestStories: Array<Pick<Story, "id" | "title" | "createdAt">>;
  scores?: TournamentJudgingRoundProjectScore;
  note?: string | null;
  onUpdatedScore?: (score: TournamentJudgingRoundProjectScore) => void;
}

const schema: yup.SchemaOf<ScoreProjectInput> = yup
  .object({
    note: yup.string().nullable(),
    project_id: yup.number().required(),
    round_id: yup.string().required(),
    scores: yup
      .object({
        value_proposition: yup
          .number()
          .min(0)
          .max(10)
          .nullable()
          .transform((_, val) => (val === "" ? null : Number(val))),
        innovation: yup
          .number()
          .min(0)
          .max(10)
          .nullable()
          .transform((_, val) => (val === "" ? null : Number(val))),
        bitcoin_integration_and_scalability: yup
          .number()
          .min(0)
          .max(10)
          .nullable()
          .transform((_, val) => (val === "" ? null : Number(val))),
        execution: yup
          .number()
          .min(0)
          .max(10)
          .nullable()
          .transform((_, val) => (val === "" ? null : Number(val))),
        ui_ux_design: yup
          .number()
          .min(0)
          .max(10)
          .nullable()
          .transform((_, val) => (val === "" ? null : Number(val))),
        transparency: yup
          .number()
          .min(0)
          .max(10)
          .nullable()
          .transform((_, val) => (val === "" ? null : Number(val))),
        je_ne_sais_quoi: yup
          .number()
          .min(0)
          .max(10)
          .nullable()
          .transform((_, val) => (val === "" ? null : Number(val))),
      })
      .required(),
  })
  .required();

type ScoreProjectFormType = yup.InferType<typeof schema>;

export default function ProjectScoreCard({
  roundId,
  project,
  latestStories,
  scores,
  note,
  onUpdatedScore,
}: Props) {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<ScoreProjectFormType>({
    resolver: yupResolver(schema) as Resolver<ScoreProjectFormType>,
    defaultValues: {
      project_id: project.id,
      round_id: roundId,
      note: note ?? "",
      scores: {
        value_proposition: scores?.value_proposition ?? "",
        innovation: scores?.innovation ?? "",
        bitcoin_integration_and_scalability:
          scores?.bitcoin_integration_and_scalability ?? "",
        execution: scores?.execution ?? "",
        ui_ux_design: scores?.ui_ux_design ?? "",
        transparency: scores?.transparency ?? "",
        je_ne_sais_quoi: scores?.je_ne_sais_quoi ?? "",
      } as any,
    },
  });

  const [mutate, { loading }] = useScoreTournamentProjectMutation();

  const onSubmit: SubmitHandler<ScoreProjectFormType> = async (data) => {
    if (loading) return console.log("loading");
    try {
      const res = await mutate({
        variables: {
          input: {
            ...data,
          },
        },
      });
      const resData = res.data?.scoreTournamentProject?.scores;
      if (resData) {
        reset({
          project_id: project.id,
          round_id: roundId,
          scores: {
            value_proposition: resData.value_proposition ?? "",
            innovation: resData.innovation ?? "",
            bitcoin_integration_and_scalability:
              resData.bitcoin_integration_and_scalability ?? "",
            execution: resData.execution ?? "",
            ui_ux_design: resData.ui_ux_design ?? "",
            transparency: resData.transparency ?? "",
            je_ne_sais_quoi: resData.je_ne_sais_quoi ?? "",
          } as any,
        });
        onUpdatedScore?.(resData);
      }
      NotificationsService.success("Project score updated");
    } catch (error) {
      NotificationsService.error(
        extractErrorMessage(error) ?? "Something went wrong"
      );
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Card
      className={`flex flex-col gap-12 ${
        isDirty && "!bg-primary-25 !border-primary-100"
      }`}
    >
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
      <div className="mt-16">
        <p className="text-body5 text-gray-500 font-medium mb-8">
          🔗 Project Links
        </p>
        <div className="flex flex-wrap gap-16">
          <ProjectLinksList project={project} />
        </div>
      </div>

      <div className="mt-16">
        <p className="text-body5 text-gray-500 font-medium">
          ✍️ Latest Stories
        </p>
        {latestStories.length > 0 && (
          <ul className="">
            {latestStories.map((story) => (
              <li
                key={story.id}
                className="py-16 first:pt-8 border-b-[1px] border-gray-200 last-of-type:border-b-0  "
              >
                <Link
                  className="hover:underline text-body3 font-medium"
                  role={"button"}
                  target="_blank"
                  rel="noreferrer"
                  to={createRoute({
                    type: "story",
                    id: story.id,
                    title: story.title,
                  })}
                >
                  {story.title}
                </Link>
                <div className="flex flex-wrap items-center gap-8 text-body5 mt-8">
                  <p className="text-gray-600 mr-12">
                    Published{" "}
                    {getDateDifference(story.createdAt, { dense: true })} ago
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {latestStories.length === 0 && (
          <div className="flex flex-col gap-16 mt-16">
            <p className="text-body4 font-medium">
              No stories has been published for this project
            </p>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
        <p className="text-gray-500 font-medium mb-8">Score</p>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <label
              htmlFor={`value-proposition-input-${project.id}`}
              className="text-body5"
            >
              Value Proposition 🎯
            </label>
            <div className="input-wrapper mt-8 relative">
              <input
                id={`value-proposition-input-${project.id}`}
                type="number"
                min={0}
                max={10}
                className="input-text"
                placeholder=""
                {...register("scores.value_proposition")}
              />
            </div>
            {errors.scores?.value_proposition && (
              <p className="input-error">
                {errors.scores?.value_proposition.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor={`innovation-input-${project.id}`}
              className="text-body5"
            >
              Innovation 🧪
            </label>
            <div className="input-wrapper mt-8 relative">
              <input
                id={`innovation-input-${project.id}`}
                type="number"
                min={0}
                max={10}
                className="input-text"
                placeholder=""
                {...register("scores.innovation")}
              />
            </div>
            {errors.scores?.innovation && (
              <p className="input-error">{errors.scores?.innovation.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor={`bitcoin-integration-input-${project.id}`}
              className="text-body5"
            >
              Bitcoin Integration and Scalability ⚡️
            </label>
            <div className="input-wrapper mt-8 relative">
              <input
                id={`bitcoin-integration-input-${project.id}`}
                type="number"
                min={0}
                max={10}
                className="input-text"
                placeholder=""
                {...register("scores.bitcoin_integration_and_scalability")}
              />
            </div>
            {errors.scores?.bitcoin_integration_and_scalability && (
              <p className="input-error">
                {errors.scores?.bitcoin_integration_and_scalability.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`execution-input-${project.id}`}
              className="text-body5"
            >
              Execution ✅
            </label>
            <div className="input-wrapper mt-8 relative">
              <input
                id={`execution-input-${project.id}`}
                type="number"
                min={0}
                max={10}
                className="input-text"
                placeholder=""
                {...register("scores.execution")}
              />
            </div>
            {errors.scores?.execution && (
              <p className="input-error">{errors.scores?.execution.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor={`ui-ux-design-input-${project.id}`}
              className="text-body5"
            >
              UI/UX Design 🍒
            </label>
            <div className="input-wrapper mt-8 relative">
              <input
                id={`ui-ux-design-input-${project.id}`}
                type="number"
                min={0}
                max={10}
                className="input-text"
                placeholder=""
                {...register("scores.ui_ux_design")}
              />
            </div>
            {errors.scores?.ui_ux_design && (
              <p className="input-error">
                {errors.scores?.ui_ux_design.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`transparency-input-${project.id}`}
              className="text-body5"
            >
              Transparency 👁️
            </label>
            <div className="input-wrapper mt-8 relative">
              <input
                id={`transparency-input-${project.id}`}
                type="number"
                min={0}
                max={10}
                className="input-text"
                placeholder=""
                {...register("scores.transparency")}
              />
            </div>
            {errors.scores?.transparency && (
              <p className="input-error">
                {errors.scores?.transparency.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`je-ne-sais-quoi-input-${project.id}`}
              className="text-body5"
            >
              Je Ne Sais Quoi 🤩
            </label>
            <div className="input-wrapper mt-8 relative">
              <input
                id={`je-ne-sais-quoi-input-${project.id}`}
                type="number"
                min={0}
                max={10}
                className="input-text"
                placeholder=""
                {...register("scores.je_ne_sais_quoi")}
              />
            </div>
            {errors.scores?.je_ne_sais_quoi && (
              <p className="input-error">
                {errors.scores?.je_ne_sais_quoi.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-16">
          <label htmlFor={`note-input-${project.id}`} className="text-body5">
            Note
          </label>
          <div className="input-wrapper mt-8 relative">
            <textarea
              id={`note-input-${project.id}`}
              className="input-text"
              placeholder=""
              {...register("note")}
            />
          </div>
          {errors.note && <p className="input-error">{errors.note.message}</p>}
        </div>

        {isDirty && (
          <div className="flex flex-wrap gap-8 justify-end mt-24">
            <Button color="gray" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" color="primary" isLoading={loading}>
              Update Score
            </Button>
          </div>
        )}
      </form>
    </Card>
  );
}
