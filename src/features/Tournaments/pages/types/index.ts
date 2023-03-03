import { TrackAndPrizes } from "../OverviewPage/PrizesSection/PrizesSection";

export interface TournamentStaticData {
  chat: {
    type: string;
    link: string;
  };

  partners: Array<{
    link: string;
    image: string;
    isPrimary?: boolean;
  }>;

  tracksAndPrizes: Array<TrackAndPrizes>;

  communityPartners?: Array<{
    link: string;
    image: string;
    isPrimary: boolean;
  }>;

  config: {
    tournamentHashtags: string[];
    showFeed: boolean;
    registerationOpen: boolean;
    projectsSubmissionOpen: boolean;
  };
}
