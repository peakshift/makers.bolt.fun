import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  CreateOrUpdateJudgingRoundInput,
  useGetProjectsInTournamentQuery,
} from "src/graphql";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Override } from "src/utils/interfaces";
import CreateJudgingRoundForm from "./CreateJudgingRoundForm";
import { useTournament } from "src/features/AdminDashboard/Tournaments/pages/ManageTournamentPage/TournamentDetailsContext";
import BackButton from "src/Components/BackButton/BackButton";
import { createRoute } from "src/utils/routing";
import OgTags from "src/Components/OgTags/OgTags";

const schema: yup.SchemaOf<Omit<CreateOrUpdateJudgingRoundInput, "id">> = yup
  .object({
    title: yup.string().required().min(3),
    description: yup.string().required().min(10),
    end_date: yup.date().required(),
    tournament_id: yup.number().required(),
    judges_ids: yup.array().of(yup.number().required()).required(),
    projects_ids: yup.array().of(yup.number().required()).required(),
    scores_schema: yup
      .array(
        yup
          .object({
            key: yup.string().required(),
            label: yup.string().required("Score label is required"),
            type: yup.string().required(),
            required: yup.boolean().nullable(),
          })
          .required()
      )
      .required(),
  })
  .required();

export type CreateJudgingRoundFormType = Override<
  yup.InferType<typeof schema>,
  {
    judges_ids: number[];
    projects_ids: number[];
  }
>;

export default function CreateJudgingRoundPage() {
  const navigate = useNavigate();
  const { tournamentDetails } = useTournament();

  const projectsInTournamentQuery = useGetProjectsInTournamentQuery({
    variables: {
      tournamentId: tournamentDetails.id,
      skip: 0,
      take: 999,
      trackId: null,
      roleId: null,
      search: null,
    },
  });

  const formMethods = useForm<CreateJudgingRoundFormType>({
    resolver: yupResolver(schema) as Resolver<CreateJudgingRoundFormType>,
    defaultValues: {
      title: "",
      description: "",
      end_date: new Date(),
      tournament_id: tournamentDetails.id,
      judges_ids: [],
      projects_ids: [],
      scores_schema: [],
    },
  });

  const scores = formMethods.getValues("scores_schema");

  const projectsInTournament =
    projectsInTournamentQuery.data?.getProjectsInTournament.projects;

  const onRoundCreated = () => {
    navigate(
      createRoute({
        type: "judging-rounds",
        page: "list",
        tournamentIdOrSlug: tournamentDetails.slug,
      })
    );
  };

  return (
    <FormProvider {...formMethods}>
      <OgTags title={`Create New Judging Round`} />
      <div className="flex flex-wrap items-center gap-16 mb-24">
        <BackButton
          defaultBackRoute={createRoute({
            type: "judging-rounds",
            page: "list",
            tournamentIdOrSlug: tournamentDetails.slug,
          })}
        />
        <h2 className="text-h2 font-bolder text-gray-900">
          Create New Judging Round
        </h2>
      </div>
      <CreateJudgingRoundForm
        projectsInTournament={projectsInTournament ?? []}
        onCreated={onRoundCreated}
      />
    </FormProvider>
  );
}
