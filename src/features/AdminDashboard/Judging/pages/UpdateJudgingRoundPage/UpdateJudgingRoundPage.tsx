import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import * as yup from "yup";
import {
  CreateOrUpdateJudgingRoundInput,
  useGetProjectsInTournamentQuery,
} from "src/graphql";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoaderData } from "./updateJudgingPageData.loader";
import CreateJudgingRoundForm from "./CreateJudgingRoundForm";
import { useTournament } from "src/features/AdminDashboard/Tournaments/pages/ManageTournamentPage/TournamentDetailsContext";
import BackButton from "src/Components/BackButton/BackButton";
import { createRoute } from "src/utils/routing";
import OgTags from "src/Components/OgTags/OgTags";
import { Override } from "src/utils/interfaces";
import { toSlug } from "src/utils/helperFunctions";

export const updateRoundSchema: yup.SchemaOf<CreateOrUpdateJudgingRoundInput> =
  yup
    .object({
      id: yup.string().required(),
      title: yup.string().required().min(3),
      description: yup.string().required().min(10),
      end_date: yup.date().required(),
      tournament_id: yup.number().required(),
      judges_ids: yup.array(yup.number().required()).required(),
      projects_ids: yup.array(yup.number().required()).required(),
      scores_schema: yup
        .array(
          yup
            .object({
              key: yup.string().required(),
              label: yup.string().min(3).required("Score label is required"),
              type: yup.string().required(),
              required: yup.boolean().nullable(),
            })
            .noUnknown()
            .required()
        )
        .min(1, "At least one score attribute is required")
        .required()
        .test({
          name: "unique-labels",
          message: "Labels must be unique",
          test: (value) => {
            if (!value) return false;
            const keys = value.map((item) => toSlug(item.label!));
            return new Set(keys).size === keys.length;
          },
        })
        .default([]),
    })
    .required();

export type UpdateJudgingRoundFormType = Override<
  yup.InferType<typeof updateRoundSchema>,
  {
    projects_ids: number[];
    judges_ids: number[];
  }
>;

export default function UpdateJudgingRoundPage() {
  const loaderData = useLoaderData() as LoaderData;

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

  const roundData = loaderData.getJudgingRoundById;
  const { roundId: id } = useParams<{ roundId: string }>();

  if (!id) throw new Error("No judging round id provided");

  const formMethods = useForm<UpdateJudgingRoundFormType>({
    resolver: yupResolver(
      updateRoundSchema
    ) as Resolver<UpdateJudgingRoundFormType>,
    defaultValues: {
      id: roundData.id,
      title: roundData.title,
      description: roundData.description,
      end_date: new Date(roundData.end_date),
      tournament_id: roundData.tournament.id,
      judges_ids: roundData.judges.map((judge) => judge.id),
      projects_ids: roundData.projects.map((project) => project.id),
      scores_schema: roundData.scores_schema,
    },
  });

  const projectsInTournament =
    projectsInTournamentQuery.data?.getProjectsInTournament.projects;

  return (
    <FormProvider {...formMethods}>
      <OgTags title={`Update Judging Round`} />
      <div className="flex flex-wrap items-center gap-16 mb-24">
        <BackButton
          defaultBackRoute={createRoute({
            type: "judging-rounds",
            page: "details",
            tournamentIdOrSlug: tournamentDetails.slug,
            roundId: roundData.id,
          })}
        />
        <h2 className="text-h2 font-bolder text-gray-900">
          Update Judging Round
        </h2>
      </div>
      <CreateJudgingRoundForm
        roundId={roundData.id}
        projectsInTournament={projectsInTournament ?? []}
        initialJudges={roundData.judges}
      />
    </FormProvider>
  );
}
