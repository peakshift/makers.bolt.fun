import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import * as yup from "yup";
import {
  CreateOrUpdateJudgingRoundInput,
  useGetJudgingRoundDetailsQuery,
} from "src/graphql";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoaderData } from "./updateJudgingPageData.loader";
import { Override } from "src/utils/interfaces";
import CreateJudgingRoundForm from "./CreateJudgingRoundForm";
import { useTournament } from "src/features/AdminDashboard/Tournaments/pages/ManageTournamentPage/TournamentDetailsContext";

const schema: yup.SchemaOf<Omit<CreateOrUpdateJudgingRoundInput, "id">> = yup
  .object({
    title: yup.string().required().min(3),
    description: yup.string().required().min(10),
    end_date: yup.date().required(),
    tournament_id: yup.number().required(),
    judges_ids: yup.array().of(yup.number().required()).required(),
    projects_ids: yup.array().of(yup.number().required()).required(),
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
  const { tournamentDetails } = useTournament();

  const formMethods = useForm<CreateJudgingRoundFormType>({
    resolver: yupResolver(schema) as Resolver<CreateJudgingRoundFormType>,
    defaultValues: {
      title: "",
      description: "",
      end_date: new Date(),
      tournament_id: tournamentDetails.id,
      judges_ids: [],
      projects_ids: [],
    },
  });

  return (
    <FormProvider {...formMethods}>
      <div>Update Judging Round</div>
      <CreateJudgingRoundForm />
    </FormProvider>
    // Check the badges form
  );
}
