import { Filter } from "nostr-tools";
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

  schedule: {
    date: string;
    events: {
      event: string;
      time: string | null;
      timezone: "UTC" | null;
      location: "BOLT.FUN" | "Youtube" | null;
      url?: string;
      type: "Hangout" | "Presentation" | "Workshop" | null;
    }[];
  }[];

  config: {
    registerationOpen: boolean;
    projectsSubmissionOpen: boolean;
    ideasRootNostrEventId?: string;
  } & (
    | {
        showFeed: true;
        feedFilters: (data: {
          participantsKeys: string[];
          projectsKeys: string[];
        }) => Filter[];
      }
    | {
        showFeed: false;
      }
  );
}
