import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import {
  GetTournamentByIdQuery,
  MeTournamentQuery,
  useGetTournamentByIdQuery,
  useMeTournamentQuery,
} from "src/graphql";
import { TournamentStaticData } from "../types";

interface ITournamentDetails {
  makers: GetTournamentByIdQuery["getMakersInTournament"]["makers"];
  me: MeTournamentQuery["me"];
  tournamentDetails: GetTournamentByIdQuery["getTournamentById"];
  myParticipationInfo: MeTournamentQuery["tournamentParticipationInfo"];
  pubkeysOfMakersInTournament: string[];
  pubkeysOfProjectsInTournament: string[];
  staticData: TournamentStaticData;
}

const Ctx = createContext<ITournamentDetails>(null!);

export default function TournamentDetailsContext({
  children,
}: PropsWithChildren<{}>) {
  const { id: idOrSlug } = useParams();
  const [staticData, setStaticData] = useState<TournamentStaticData>();

  const tournaemntQuery = useGetTournamentByIdQuery({
    variables: {
      idOrSlug: idOrSlug!,
    },
    skip: !idOrSlug,
  });

  const tournamentId = tournaemntQuery.data?.getTournamentById?.id;

  const myParticipationInfoQuery = useMeTournamentQuery({
    variables: {
      id: Number(tournamentId)!,
    },
    skip: !tournamentId,
  });

  const tournametTitle = tournaemntQuery.data?.getTournamentById?.title;

  useEffect(() => {
    if (!tournametTitle) return;

    (async () => {
      const data = await getStaticData(tournametTitle);
      setStaticData(data);
    })();
  }, [tournametTitle]);

  if (
    tournaemntQuery.loading ||
    myParticipationInfoQuery.loading ||
    !staticData
  )
    return <LoadingPage />;

  if (!tournaemntQuery.data?.getTournamentById) return <NotFoundPage />;

  const {
    getMakersInTournament: makers,
    getTournamentById: tournamentDetails,
    pubkeysOfMakersInTournament,
    pubkeysOfProjectsInTournament,
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
        pubkeysOfProjectsInTournament,
        staticData,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useTournament = () => {
  return useContext(Ctx);
};

async function getStaticData(title: string) {
  let dataPromise;

  if (title.search(/legends of lightning/i) !== -1)
    dataPromise = import(
      "../OverviewPage/LegendsOfLightningOverviewPage/lol-tournament-data"
    );
  else if (title.search(/nostr/i) !== -1)
    dataPromise = import(
      "../OverviewPage/NostrHackWeekOverviewPage/nostr-hack-tournament-data"
    );
  else if (title.search(/ai4all/i) !== -1)
    dataPromise = import(
      "../OverviewPage/AI4ALLOverviewPage/a4a-tournament-data"
    );
  else throw new Error("Unknown Tournament");

  const { default: data } = await dataPromise;

  return data as TournamentStaticData;
}
