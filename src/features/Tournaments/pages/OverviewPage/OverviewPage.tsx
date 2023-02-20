import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import { useTournament } from "../TournamentDetailsPage/TournamentDetailsContext";
import LegendsOfLightningOverviewPage from "./LegendsOfLightningOverviewPage/LegendsOfLightningOverviewPage";
import NostrHackWeekOverviewPage from "./NostrHackWeekOverviewPage/NostrHackWeekOverviewPage";

export default function OverviewPage() {
  const { tournamentDetails } = useTournament();

  if (tournamentDetails.title.search(/legends of lightning/i) !== -1)
    return <LegendsOfLightningOverviewPage />;
  if (tournamentDetails.title.search(/nostr/i) !== -1)
    return <NostrHackWeekOverviewPage />;

  return <NotFoundPage />;
}
