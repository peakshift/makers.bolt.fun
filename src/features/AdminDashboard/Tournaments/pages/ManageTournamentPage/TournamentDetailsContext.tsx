import React, { createContext, PropsWithChildren, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import { ManageTournamentQuery, useManageTournamentQuery } from "src/graphql";

interface ITournamentDetails {
  makers: ManageTournamentQuery["getMakersInTournament"]["makers"];
  tournamentDetails: ManageTournamentQuery["getTournamentById"];
  pubkeysOfMakersInTournament: string[];
  pubkeysOfProjectsInTournament: string[];
}

const Ctx = createContext<ITournamentDetails>(null!);

export default function TournamentDetailsContext({
  children,
}: PropsWithChildren<{}>) {
  const { tournamentIdOrSlug: idOrSlug } = useParams();

  const tournaemntQuery = useManageTournamentQuery({
    variables: {
      idOrSlug: idOrSlug!,
    },
    skip: !idOrSlug,
  });

  const tournamentId = tournaemntQuery.data?.getTournamentById?.id;

  if (tournaemntQuery.loading) return <LoadingPage />;

  if (!tournaemntQuery.data?.getTournamentById) return <NotFoundPage />;

  const {
    getMakersInTournament: makers,
    getTournamentById: tournamentDetails,
    pubkeysOfMakersInTournament,
    pubkeysOfProjectsInTournament,
  } = tournaemntQuery.data;

  return (
    <Ctx.Provider
      value={{
        makers: makers.makers,
        tournamentDetails,
        pubkeysOfMakersInTournament,
        pubkeysOfProjectsInTournament,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useTournament = () => {
  return useContext(Ctx);
};
