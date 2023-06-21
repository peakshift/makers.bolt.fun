import { Filter } from "nostr-tools";
import { CONSTS } from "src/utils";
import { TournamentStaticData } from "../../types";

export const NOSTR_HACK_WEEK_STATIC_DATA: TournamentStaticData = {
  chat: {
    type: "telegram",
    link: "https://t.me/nostrdesign",
  },

  partnersList: [
    {
      title: "Organizers & Sponsors",
      items: [
        {
          link: "https://wolfnyc.com",
          image:
            "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/64bd8c50-35fd-4e16-ffbe-3a22adaf7600/public",
          isBigImage: true,
        },
        {
          link: "https://spiral.xyz/",
          image:
            "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/be64459d-7ead-4094-19f1-9ebd1a003200/public",
          isBigImage: true,
        },
        {
          link: "https://getalby.com/",
          image:
            "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/19ad3cc8-5d88-403e-bd3c-7c38cea2b000/public",
          isBigImage: true,
        },
        {
          link: "https://twitter.com/peakshift/",
          image:
            "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/2e55f932-c9a6-4c9f-adce-83c0eca2a100/public",
          isBigImage: true,
        },
        {
          link: "https://www.bradmills.ca/",
          image:
            "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/bf4a4ead-7fd5-4414-8348-d286c2340000/public",
          isBigImage: true,
        },
      ],
    },
  ],

  communityPartners: [
    {
      link: "https://www.satsx.dev/",
      image:
        "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/4b9b49b6-efe7-4004-06f4-67d6efad8d00/public",
      isPrimary: true,
    },
  ],

  tracksAndPrizes: [
    {
      id: 1,
      title: "Building Nostr applications, and tools",
      description:
        "Found a problem that needs solving and want to build it? This track focuses on functional applications of Nostr, new global or community clients, developer tools or services. Extra points for good UX/DevEx and bitcoin integration!",
      image:
        "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/4596d328-310c-41a6-068c-37de4784d900/public",
      prizes: [
        {
          id: 1,
          title: " 1st",
          project: "nosta",
          amount: "6,125,431 Sats ",
        },
        {
          id: 2,
          title: " 2nd",
          project: "colighter",
          amount: "4,079,537 Sats ",
        },
        {
          id: 3,
          title: " 3rd",
          project: "nygma",
          amount: "2,045,894 Sats",
        },
      ],
    },
    {
      id: 2,
      title: "Designing for the uncensored social web",
      description:
        "In collaboration with the Nostr Design Community, this track is 100% for the pixel warriors and UX practitioners! Submit mockups, wireframes, prototypes, case studies, experiences, or just out-of-this-world explorations. This is your chance to be bold... or italic.",
      image:
        "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/6f13ffa2-a3f4-404c-f75b-77411b9e1400/public",
      prizes: [
        {
          id: 4,
          title: " 1st",
          project: "goodstr",
          amount: "6,125,431 Sats ",
        },
        {
          id: 5,
          title: " 2nd",
          project: "Nostr_UI_Design",
          amount: "4,079,537 Sats ",
        },
        {
          id: 6,
          title: " 3rd",
          project: "zapstr",
          amount: "2,045,894 Sats",
        },
      ],
    },
  ],

  schedule: [
    {
      date: "Friday March 10",
      events: [
        {
          event: "Hacking begins",
          time: "00:00",
          timezone: "UTC",
          location: null,
          type: null,
        },
      ],
    },
    {
      date: "Sunday March 12",
      events: [
        {
          event: "Maker Mixer: Introductions & team formations (Eastern)",
          time: "12:00 - 13:00",
          timezone: "UTC",
          location: "BOLT.FUN",
          type: "Hangout",
        },
        {
          event: "Maker Mixer: Introductions & team formations (Western)",
          time: "19:00 - 20:00",
          timezone: "UTC",
          location: "BOLT.FUN",
          type: "Hangout",
        },
      ],
    },
    {
      date: "Monday March 13",
      events: [
        {
          event: "Nostr 101: What the F#&* is Nostr?",
          time: "18:00 - 19:00",
          timezone: "UTC",
          location: "Youtube",
          url: "https://www.youtube.com/@BOLTFUN/featured",
          type: "Presentation",
        },
      ],
    },
    {
      date: "Tuesday March 14",
      events: [
        {
          event: "The future is Nostr",
          time: "18:30 - 19:30",
          timezone: "UTC",
          location: "Youtube",
          url: "https://www.youtube.com/@BOLTFUN/featured",
          type: "Presentation",
        },
        {
          event: "Nostr Quickstart using React.js",
          time: "12:00 - 13:30",
          timezone: "UTC",
          location: "Youtube",
          url: "https://www.youtube.com/@BOLTFUN/featured",
          type: "Presentation",
        },
      ],
    },
    {
      date: "Wednesday March 15",
      events: [
        {
          event: "Unveiling 3 Nostr extensions in LNbits",
          time: "12:00 - 13:00",
          timezone: "UTC",
          location: "Youtube",
          url: "https://www.youtube.com/@BOLTFUN/featured",
          type: "Presentation",
        },
      ],
    },
    {
      date: "Thursday March 16",
      events: [
        {
          event: "Nostr Connect Workshop",
          time: "10:00 - 11:30",
          timezone: "UTC",
          location: "Youtube",
          url: "https://www.youtube.com/@BOLTFUN/featured",
          type: "Workshop",
        },
      ],
    },
    {
      date: "Friday March 17",
      events: [
        {
          event: "Check in: Eastern",
          time: "10:00 - 11:30",
          timezone: "UTC",
          location: "BOLT.FUN",
          type: "Hangout",
        },
        {
          event: "Check in: Western",
          time: "19:00 - 20:00",
          timezone: "UTC",
          location: "BOLT.FUN",
          type: "Hangout",
        },
      ],
    },
    {
      date: "Sunday March 19",
      events: [
        {
          event: "Nostrica Day #1",
          time: "15:00 - 23:30",
          timezone: "UTC",
          location: "Youtube",
          url: "https://www.youtube.com/@BOLTFUN/featured",
          type: null,
        },
      ],
    },
    {
      date: "Monday March 20",
      events: [
        {
          event: "Nostrica Day #2",
          time: "15:00 - 23:30",
          timezone: "UTC",
          location: "Youtube",
          url: "https://www.youtube.com/@BOLTFUN/featured",
          type: null,
        },
      ],
    },
    {
      date: "Tuesday March 21",
      events: [
        {
          event: "Nostrica Day #3",
          time: "15:00 - 23:30",
          timezone: "UTC",
          location: "Youtube",
          url: "https://www.youtube.com/@BOLTFUN/featured",
          type: null,
        },
      ],
    },
    {
      date: "Wednesday March 22",
      events: [
        {
          event: "Check in: Eastern",
          time: "10:00 - 11:30",
          timezone: "UTC",
          location: "BOLT.FUN",
          type: "Hangout",
        },
        {
          event: "Check in: Western",
          time: "19:00 - 20:00",
          timezone: "UTC",
          location: "BOLT.FUN",
          type: "Hangout",
        },
      ],
    },
    {
      date: "Thursday March 23",
      events: [
        {
          event: "Get your pitches ready!",
          time: null,
          timezone: null,
          location: null,
          type: null,
        },
      ],
    },
    {
      date: "Friday March 24",
      events: [
        {
          event: "Pitches: Eastern",
          time: "10:00 - 11:30",
          timezone: "UTC",
          location: "Youtube",
          url: "https://www.youtube.com/@BOLTFUN/featured",
          type: "Presentation",
        },
        {
          event: "Pitches: Western",
          time: "19:00 - 20:00",
          timezone: "UTC",
          location: "Youtube",
          url: "https://www.youtube.com/@BOLTFUN/featured",
          type: "Presentation",
        },
        {
          event: "Deadline to post remaining pitches",
          time: "23:59",
          timezone: "UTC",
          location: null,
          type: null,
        },
      ],
    },
  ],

  config: {
    mainFeedHashtag: "NostrHack",
    feedFilters: ({ participantsKeys, projectsKeys }) =>
      [
        {
          kinds: [1, 30023],
          limit: 100,
          authors: [
            "369061c9a1ee258d28d123f35f913968884d52c4928ab7bd5a4544fcfd48f3f3", // nostr-design
            CONSTS.BF_NOSTR_PUBKEY,
            ...participantsKeys,
            ...projectsKeys,
          ],
          "#t": ["nostrhack"],
        },
      ] as Filter[],
    showFeed: true,
    registerationOpen: false,
    projectsSubmissionOpen: false,
    ideasRootNostrEventId:
      "4cc8cb708b575c465962cb099bf8b1b2705edfc303613bc30e06c0dd47d08d2f",
  },
};

export default NOSTR_HACK_WEEK_STATIC_DATA;
