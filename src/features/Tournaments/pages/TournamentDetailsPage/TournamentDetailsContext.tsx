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
import * as LOLTournamentData from "../OverviewPage/LegendsOfLightningOverviewPage/lol-tournament-data";
import * as NostrHackTournamentData from "../OverviewPage/NostrHackWeekOverviewPage/nostr-hack-tournament-data";

interface ITournamentDetails {
  makers: GetTournamentByIdQuery["getMakersInTournament"]["makers"];
  me: MeTournamentQuery["me"];
  tournamentDetails: GetTournamentByIdQuery["getTournamentById"];
  myParticipationInfo: MeTournamentQuery["tournamentParticipationInfo"];
  pubkeysOfMakersInTournament: string[];
  staticData: typeof LOLTournamentData | typeof NostrHackTournamentData;
}

const Ctx = createContext<ITournamentDetails>(null!);

export default function TournamentDetailsContext({
  children,
}: PropsWithChildren<{}>) {
  const { id } = useParams();

  const tournaemntQuery = useGetTournamentByIdQuery({
    variables: {
      id: Number(id)!,
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
    pubkeysOfMakersInTournament,
  } = tournaemntQuery.data;
  const { me = null, tournamentParticipationInfo: myParticipationInfo = null } =
    myParticipationInfoQuery.data ?? {};

  return (
    <Ctx.Provider
      value={{
        makers: makers.makers,
        me,
        tournamentDetails,
        myParticipationInfo,
        pubkeysOfMakersInTournament,
        staticData: getStaticData(tournamentDetails.title),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useTournament = () => {
  return useContext(Ctx);
};

function getStaticData(title: string) {
  if (title.search(/legends of lightning/i) !== -1) return LOLTournamentData;
  if (title.search(/nostr/i) !== -1) return NostrHackTournamentData;

  throw new Error("Unknown Tournament");
}
