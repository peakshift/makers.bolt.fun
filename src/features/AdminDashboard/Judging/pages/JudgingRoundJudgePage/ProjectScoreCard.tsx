import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import linkifyHtml from "linkifyjs/lib/linkify-html";
import {
  Resolver,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "src/Components/Button/Button";
import Card from "src/Components/Card/Card";
import ProjectLinksList from "src/features/Projects/pages/ProjectPage/Components/ProjectLinksList/ProjectLinksList";
import {
  Project,
  ScoreProjectInput,
  Story,
  TournamentJudgingRoundProjectScore,
  TournamentJudgingRoundScoresSchema,
  useScoreTournamentProjectMutation,
} from "src/graphql";
import { NotificationsService } from "src/services";
import {
  extractErrorMessage,
  getDateDifference,
} from "src/utils/helperFunctions";
import { createRoute } from "src/utils/routing";
import advancedFormat from "dayjs/plugin/advancedFormat";
import * as yup from "yup";

dayjs.extend(advancedFormat);

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
    | "createdAt"
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
  scoresSchema: TournamentJudgingRoundScoresSchema[];
  scores?: TournamentJudgingRoundProjectScore[];
  note?: string | null;
  onUpdatedScore?: (score: TournamentJudgingRoundProjectScore[]) => void;
}

const schema: yup.SchemaOf<ScoreProjectInput> = yup
  .object({
    note: yup.string().nullable(),
    project_id: yup.number().required(),
    round_id: yup.string().required(),
    scores: yup
      .array()
      .of(
        yup.object({
          key: yup.string().required(),
          value: yup.string() as yup.StringSchema<string>,
        })
      )
      .required(),
  })
  .required();

type ScoreProjectFormType = yup.InferType<typeof schema>;

export default function ProjectScoreCard({
  roundId,
  project,
  latestStories,
  scoresSchema,
  scores,
  note,
  onUpdatedScore,
}: Props) {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
    control,
  } = useForm<ScoreProjectFormType>({
    resolver: yupResolver(schema) as Resolver<ScoreProjectFormType>,
    defaultValues: {
      project_id: project.id,
      round_id: roundId,
      note: note ?? "",
      scores:
        scoresSchema.map((schema) => {
          const fieldType = schema.type;
          const value = scores?.find(({ key }) => key === schema.key)?.value;

          return {
            key: schema.key,
            value: parseValue(value, fieldType) as any,
          };
        }) ?? [],
    },
  });

  const { fields: scoresFields } = useFieldArray({
    name: "scores",
    control,
  });

  const [mutate, { loading }] = useScoreTournamentProjectMutation();

  const onSubmit: SubmitHandler<ScoreProjectFormType> = async (data) => {
    if (loading) return console.log("loading");
    try {
      const res = await mutate({
        variables: {
          input: {
            ...data,
            scores:
              data.scores?.filter(({ value }) => {
                return value !== undefined && value !== null && value !== "";
              }) ?? [],
          },
        },
      });
      const newScores = res.data?.scoreTournamentProject?.scores;
      if (newScores) {
        reset({
          project_id: project.id,
          round_id: roundId,
          note: data.note ?? "",
          scores: scoresSchema.map((schema) => {
            const fieldType = schema.type;
            const value = newScores.find(
              ({ key }) => key === schema.key
            )?.value;

            return {
              key: schema.key,
              value: parseValue(value, fieldType) as any,
            };
          }),
        });
        onUpdatedScore?.(newScores);
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
      <p className="text-gray-600 text-body5">
        Project published on:{" "}
        <span className="font-bold">
          {dayjs(project.createdAt).format("Do MMM, YYYY")}
        </span>
      </p>
      <div
        className="text-body4 text-gray-600 leading-normal whitespace-pre-line"
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
                className="py-16 first:pt-8 last:pb-8 border-b-[1px] border-gray-200 last-of-type:border-b-0  "
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
          {scoresFields.map((field, index) => {
            const schema = scoresSchema.find(
              (schema) => schema.key === field.key
            );

            if (!schema) return null;

            if (schema.type === "range")
              return (
                <div key={field.key}>
                  <label
                    htmlFor={`score-input-${project.id}-${index}`}
                    className="text-body5"
                  >
                    {schema.label}
                  </label>
                  <div className="input-wrapper mt-8 relative">
                    <input
                      id={`score-input-${project.id}-${index}`}
                      type="number"
                      min={0}
                      max={10}
                      className="input-text"
                      placeholder=""
                      {...register(`scores.${index}.value` as const)}
                    />
                  </div>
                  {errors.scores?.[index]?.value && (
                    <p className="input-error">
                      {errors.scores?.[index]?.value?.message}
                    </p>
                  )}
                </div>
              );

            if (schema.type === "checkbox")
              return (
                <div key={field.key} className="flex flex-col gap-12">
                  <label
                    htmlFor={`score-input-${project.id}-${index}`}
                    className="text-body4"
                  >
                    {schema.label}
                  </label>
                  <input
                    id={`score-input-${project.id}-${index}`}
                    className="input-checkbox cursor-pointer w-40 h-40"
                    type="checkbox"
                    {...register(`scores.${index}.value` as const)}
                  />
                </div>
              );

            // if (schema.type === "radio")
            //   return (
            //     <div key={field.key} className="flex items-center gap-12">
            //       <input
            //         id={`score-input-${project.id}-${index}`}
            //         className="input-radio cursor-pointer"
            //         type="radio"
            //         {...register(`scores.${index}.value` as const)}
            //       />
            //       <label
            //         htmlFor={`score-input-${project.id}-${index}`}
            //         className="text-body4"
            //       >
            //         {schema.label}
            //       </label>
            //     </div>
            //   );

            return null;
          })}
        </div>
        <div className="mt-16">
          <label htmlFor={`note-input-${project.id}`} className="text-body5">
            Note for the Team
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

function parseValue(value: string | undefined, type: string) {
  if (!value) return "";
  if (type === "range") return value ? value : "";
  if (type === "checkbox") return value === "true";
  return value;
}
