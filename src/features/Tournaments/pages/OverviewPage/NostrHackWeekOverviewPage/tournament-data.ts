import { TrackAndPrizes } from "../PrizesSection/PrizesSection";

export const chat = {
  type: "telegram",
  link: "https://t.me/nostrdesign"
}

export const partners = [
  {
    link: "https://twitter.com/peakshift/",
    image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/4b9b49b6-efe7-4004-06f4-67d6efad8d00/public",
    isPrimary: true,
  },
];

export const tracksAndPrizes = [
  {
    id: 1,
    title: "Building Nostr applications, and tools",
    description:
      "Found a problem that needs solving and want to build it? This track focuses on functional applications of Nostr, new global or community clients, developer tools or services. Extra points for good UX/DevEx !",
    image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/4596d328-310c-41a6-068c-37de4784d900/public",
    prizes: [
      {
        id: 1,
        title: " 1st",
        amount: "???",
      },
      {
        id: 2,
        title: " 2nd",
        amount: "???",
      },
      {
        id: 3,
        title: " 3rd",
        amount: "???",
      },
    ],
  },
  {
    id: 2,
    title: "Designing for the uncensored social web",
    description:
      "In collaboration with the Nostr Design Community, this track is 100% for the pixel warriors and UX practitioners! Submit mockups, wireframes, prototypes, case studies, experiences, or just out-of-this-world explorations. This is your chance to be bold... or italic.",
    image: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/6f13ffa2-a3f4-404c-f75b-77411b9e1400/public",
    prizes: [
      {
        id: 5,
        title: " 1st",
        amount: "???",
      },
      {
        id: 6,
        title: " 2nd",
        amount: "???",
      },
      {
        id: 7,
        title: " 3rd",
        amount: "???",
      },
    ],
  },
] as TrackAndPrizes[];
