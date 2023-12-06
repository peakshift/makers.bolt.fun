import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import * as yup from "yup";
import { CreateOrUpdateJudgingRoundInput } from "src/graphql";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoaderData } from "./updateJudgingPageData.loader";
import CreateJudgingRoundForm from "./CreateJudgingRoundForm";

const schema: yup.SchemaOf<CreateOrUpdateJudgingRoundInput> = yup
  .object({
    id: yup.string().required(),
    title: yup.string().required().min(3),
    description: yup.string().required().min(10),
    end_date: yup.date().required(),
    tournament_id: yup.number().required(),
    judges_ids: yup.array(yup.number().required()).required(),
    projects_ids: yup.array(yup.number().required()).required(),
  })
  .required();

export type UpdateJudgingRoundFormType = yup.InferType<typeof schema>;

export default function UpdateJudgingRoundPage() {
  const loaderData = useLoaderData() as LoaderData;

  const roundData = loaderData.getJudgingRoundById;
  const { roundId: id } = useParams<{ roundId: string }>();

  if (!id) throw new Error("No judging round id provided");

  const formMethods = useForm<UpdateJudgingRoundFormType>({
    resolver: yupResolver(schema) as Resolver<UpdateJudgingRoundFormType>,
    defaultValues: {
      id: roundData.id,
      title: roundData.title,
      description: roundData.description,
      end_date: new Date(roundData.end_date),
      tournament_id: roundData.tournament.id,
      judges_ids: roundData.judges.map((judge) => judge.id),
      projects_ids: roundData.projects.map((project) => project.id),
    },
  });

  return (
    <FormProvider {...formMethods}>
      <div>Update Judging Round</div>
      <CreateJudgingRoundForm roundId={roundData.id} />
    </FormProvider>
    // Check the badges form
  );
}
