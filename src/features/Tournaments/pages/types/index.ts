import { Filter } from "nostr-tools";
import { TrackAndPrizes } from "../OverviewPage/PrizesSection/PrizesSection";

interface Partner {
  link: string;
  image: string;
  isBigImage?: boolean;
}

export interface TournamentStaticData {
  chat: {
    type: string;
    link: string;
  };

  partnersList: Array<{
    title: string;
    items: Partner[];
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
      location: "BOLT.FUN" | "Youtube" | "Twitch" | null;
      url?: string;
      type: "Hangout" | "Presentation" | "Workshop" | null;
    }[];
  }[];

  makersDeals?: {
    title: string;
    text: string;
    link?: string;
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
