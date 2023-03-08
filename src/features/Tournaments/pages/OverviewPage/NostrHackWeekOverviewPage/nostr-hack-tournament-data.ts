import { CONSTS } from "src/utils";
import { TournamentStaticData } from "../../types";

export const NOSTR_HACK_WEEK_STATIC_DATA: TournamentStaticData = {
  chat: {
    type: "telegram",
    link: "https://t.me/nostrdesign",
  },

  partners: [
    {
      link: "https://wolfnyc.com",
      image:
        "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/64bd8c50-35fd-4e16-ffbe-3a22adaf7600/public",
      isPrimary: true,
    },
    {
      link: "https://spiral.xyz/",
      image:
        "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/be64459d-7ead-4094-19f1-9ebd1a003200/public",
      isPrimary: true,
    },
    {
      link: "https://getalby.com/",
      image:
        "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/19ad3cc8-5d88-403e-bd3c-7c38cea2b000/public",
      isPrimary: true,
    },
    {
      link: "https://twitter.com/peakshift/",
      image:
        "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/2e55f932-c9a6-4c9f-adce-83c0eca2a100/public",
      isPrimary: true,
    },
    {
      link: "https://www.bradmills.ca/",
      image:
        "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/bf4a4ead-7fd5-4414-8348-d286c2340000/public",
      isPrimary: true,
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
          amount: "6,125,431 Sats ",
        },
        {
          id: 2,
          title: " 2nd",
          amount: "4,079,537 Sats ",
        },
        {
          id: 3,
          title: " 3rd",
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
          amount: "6,125,431 Sats ",
        },
        {
          id: 5,
          title: " 2nd",
          amount: "4,079,537 Sats ",
        },
        {
          id: 6,
          title: " 3rd",
          amount: "2,045,894 Sats",
        },
      ],
    },
  ],

  config: {
    feedFilters: ({ participantsKeys }) => [
      {
        kinds: [1, 30023],
        limit: 100,
        authors: [
          "369061c9a1ee258d28d123f35f913968884d52c4928ab7bd5a4544fcfd48f3f3", // nostr-design
          CONSTS.BF_NOSTR_PUBKEY,
          ...participantsKeys,
        ],
        "#t": ["nostr"],
      },
    ],
    showFeed: true,
    registerationOpen: true,
    projectsSubmissionOpen: true,
    ideasRootNostrEventId:
      "4cc8cb708b575c465962cb099bf8b1b2705edfc303613bc30e06c0dd47d08d2f",
  },
};
