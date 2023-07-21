import { Filter } from "nostr-tools";
import { TrackAndPrizes } from "../OverviewPage/PrizesSection/PrizesSection";

interface Partner {
  url: string;
  image: string;
  isBigImage?: boolean;
}

export interface TournamentStaticData {
  chat: {
    type: string;
    url: string;
  };

  partnersList: Array<{
    title: string;
    items: Partner[];
  }>;

  tracksAndPrizes: Array<TrackAndPrizes>;

  schedule: {
    date: string;
    events: {
      title: string;
      time: string | null;
      timezone: "UTC" | "PST" | null;
      location: "BOLT.FUN" | "Youtube" | "Twitch" | null;
      url?: string;
      type: "Hangout" | "Presentation" | "Workshop" | null;
    }[];
  }[];

  makersDeals?: {
    title: string;
    description: string;
    url?: string;
  }[];

  config: {
    registerationOpen: boolean;
    projectsSubmissionOpen: boolean;
    ideasRootNostrEventId?: string;
  } & (
    | {
        showFeed: true;
        mainFeedHashtag: string;
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
