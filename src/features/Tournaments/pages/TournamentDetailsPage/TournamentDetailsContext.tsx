import React, { createContext, PropsWithChildren, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import {
  GetTournamentByIdQuery,
  MeTournamentQuery,
  useGetTournamentByIdQuery,
  useMeTournamentQuery,
} from "src/graphql";
import { getWinnersIds } from "../OverviewPage/PrizesSection/PrizesSection";

interface ITournamentDetails {
  makers: GetTournamentByIdQuery["getMakersInTournament"]["makers"];
  me: MeTournamentQuery["me"];
  tournamentDetails: GetTournamentByIdQuery["getTournamentById"];
  myParticipationInfo: MeTournamentQuery["tournamentParticipationInfo"];
  winningProjects: GetTournamentByIdQuery["getProjectsById"];
}

const Ctx = createContext<ITournamentDetails>(null!);

export default function TournamentDetailsContext({
  children,
}: PropsWithChildren<{}>) {
  const { id } = useParams();

  const tournaemntQuery = useGetTournamentByIdQuery({
    variables: {
      id: Number(id)!,
      winning_projects: getWinnersIds(),
    },
    skip: !id,
  });
  const myParticipationInfoQuery = useMeTournamentQuery({
    variables: {
      id: Number(id)!,
    },
    skip: !id,
  });

  if (tournaemntQuery.loading || myParticipationInfoQuery.loading)
    return <LoadingPage />;

  if (!tournaemntQuery.data?.getTournamentById) return <NotFoundPage />;

  const {
    getMakersInTournament: makers,
    getTournamentById: tournamentDetails,
    getProjectsById: winningProjects,
  } = tournaemntQuery.data;
  const { me = null, tournamentParticipationInfo: myParticipationInfo = null } =
    myParticipationInfoQuery.data ?? {};

  return (
    <Ctx.Provider
      value={{
        makers: makers.makers,
        me,
        tournamentDetails,
        winningProjects,
        myParticipationInfo,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useTournament = () => {
  return useContext(Ctx);
};
