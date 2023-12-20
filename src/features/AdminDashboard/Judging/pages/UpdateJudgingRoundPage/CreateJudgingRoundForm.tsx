import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import Button from "src/Components/Button/Button";
import InfoCard from "src/Components/InfoCard/InfoCard";
import DatePicker from "src/Components/Inputs/DatePicker/DatePicker";
import {
  Project,
  useCreateOrUpdateJudgingRoundMutation,
  User,
} from "src/graphql";
import { NotificationsService } from "src/services";
import { extractErrorMessage } from "src/utils/helperFunctions";
import { CreateJudgingRoundFormType } from "./CreateJudgingRoundPage";
import ScoresSchemaInput from "./ScoresSchemaInput";
import SelectJudgesInput from "./SelectJudgesInput";
import SelectProjectsInput from "./SelectProjectsInput";

interface Props {
  roundId?: string;
  onCreated?: () => void;
  projectsInTournament: Pick<
    Project,
    "id" | "title" | "hashtag" | "thumbnail_image"
  >[];
  initialJudges?: Pick<User, "id" | "name" | "avatar" | "jobTitle">[];
}

export default function CreateJudgingRoundForm({
  roundId,
  onCreated,
  projectsInTournament,
  initialJudges,
}: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useFormContext<CreateJudgingRoundFormType>();

  const [mutate, { loading }] = useCreateOrUpdateJudgingRoundMutation();

  const onSubmit: SubmitHandler<CreateJudgingRoundFormType> = async (data) => {
    if (loading) return console.log("loading");
    try {
      await mutate({
        variables: {
          input: {
            ...data,
            scores_schema: data.scores_schema!,
            id: roundId,
          },
        },
      });
      NotificationsService.success(
        roundId ? "Round updated successfully" : "Round created successfully"
      );
      if (!roundId) {
        onCreated?.();
      }
    } catch (error) {
      NotificationsService.error(
        extractErrorMessage(error) ?? "Something went wrong"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-16">
      <div>
        <label htmlFor="title-input" className="text-body5">
          Title<sup className="text-red-500">*</sup>
        </label>
        <div className="input-wrapper mt-8 relative">
          <input
            id="title-input"
            autoFocus
            type="text"
            className="input-text"
            placeholder="Semi-Final Round"
            {...register("title")}
          />
        </div>
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="description-input" className="text-body5">
          Description
        </label>
        <div className="input-wrapper mt-8 relative">
          <textarea
            id="description-input"
            rows={7}
            className="input-text font-mono"
            placeholder="Write some description for the judges (accepts markdown)"
            {...register("description")}
          />
        </div>
        {errors.description && (
          <p className="input-error">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="date-input" className="text-body5">
          End Date<sup className="text-red-500">*</sup>
        </label>
        <Controller
          name="end_date"
          control={control}
          render={({ field }) => (
            <DatePicker {...field} showTimeSelect className="mt-8" />
          )}
        />
        {errors.end_date && (
          <p className="input-error">{errors.end_date.message}</p>
        )}
      </div>
      <div>
        <label className="text-body5 mb-12 inline-block">
          Projects<sup className="text-red-500">*</sup>
        </label>
        <Controller
          name="projects_ids"
          control={control}
          render={({ field }) => (
            <SelectProjectsInput
              projects={projectsInTournament}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div>
        <label className="text-body5 mb-12 inline-block">
          Judges<sup className="text-red-500">*</sup>
        </label>
        <Controller
          name="judges_ids"
          control={control}
          render={({ field }) => (
            <SelectJudgesInput
              initialValue={initialJudges}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div>
        <label className="text-body5 inline-block">Judging Criterias</label>
        <p className="text-body5 text-gray-500  mb-12">
          Note that although you can edit the judging criterias at anytime, if
          you do so after judges submit their scores, any fields that are
          removed will be removed from the scores as well.
        </p>
        <ScoresSchemaInput />
      </div>

      <Button
        isLoading={loading}
        color="primary"
        type="submit"
        className="mt-24"
      >
        Save
      </Button>
    </form>
  );
}
