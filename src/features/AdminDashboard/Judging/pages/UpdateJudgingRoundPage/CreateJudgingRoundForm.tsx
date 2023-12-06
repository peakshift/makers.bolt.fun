import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import Button from "src/Components/Button/Button";
import DatePicker from "src/Components/Inputs/DatePicker/DatePicker";
import AvatarInput from "src/Components/Inputs/FilesInputs/AvatarInput/AvatarInput";
import {
  Badge,
  TournamentJudgingRound,
  useCreateOrUpdateBadgeMutation,
  useCreateOrUpdateJudgingRoundMutation,
} from "src/graphql";
import { NotificationsService } from "src/services";
import { extractErrorMessage } from "src/utils/helperFunctions";
import { CreateJudgingRoundFormType } from "./CreateJudgingRoundPage";

interface Props {
  roundId?: string;
  onCreated?: (round: Partial<TournamentJudgingRound>) => void;
}

export default function CreateJudgingRoundForm({ roundId, onCreated }: Props) {
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
      const res = await mutate({
        variables: {
          input: {
            ...data,
            id: roundId,
          },
        },
      });
      const roundData = res.data?.createOrUpdateJudgingRound;
      NotificationsService.success(
        roundId ? "Round updated successfully" : "Round created successfully"
      );
      if (roundId && roundData) {
        onCreated?.(roundData as any);
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
            placeholder="Badge Title 🎖️"
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
          render={({ field }) => <DatePicker {...field} className="mt-8" />}
        />
        {errors.end_date && (
          <p className="input-error">{errors.end_date.message}</p>
        )}
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
