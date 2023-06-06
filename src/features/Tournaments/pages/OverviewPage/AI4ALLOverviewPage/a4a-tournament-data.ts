import { TournamentStaticData } from "../../types";

export const AI4ALL_TOURNAMENT_STATIC_DATA: TournamentStaticData = {
  chat: {
    type: "discord",
    link: "https://discord.gg/wZKUjf4NRa",
  },

  schedule: [],

  partners: [
    {
      link: "https://peakshift.com/",
      image: "https://i.ibb.co/nPJVd7s/ps.png",
      isPrimary: true,
    },
  ],

  tracksAndPrizes: [
    {
      id: 1,
      title: "Grand Champion",
      description:
        "The Legend of Lightning will be the best in show, la créme de la créme. Every project entered will be eligible for this award, no matter what track they choose.",
      image: "https://i.ibb.co/2gMLDmJ/grand-prize.png",
      prizes: [
        {
          id: 1,
          title: "the legend",
          amount: "1 BTC",
          project: "Lightsats",
        },
        {
          id: 2,
          title: "",
          amount: "0.5 BTC",
          project: "mutiny",
        },
        {
          id: 3,
          title: "",
          amount: "0.5 BTC",
          project: "agrimint",
        },
      ],
      sponsor: {
        logo: "https://i.ibb.co/gTX30Rq/fulgur.png",
      },
    },
    {
      id: 2,
      title: "Global Adoption Track",
      description:
        "Focusing on scalability and product market fit, this track allows makers to let their imaginations run wild with either lightning or on-chain technology.",
      image: "https://i.ibb.co/d4vxYXD/global-adoption-lg.png",
      prizes: [
        {
          id: 2,
          title: " 1st",
          amount: "$5k",
          project: "Lightsats",
        },
        {
          id: 3,
          title: " 2nd",
          amount: "$2.5k",
          project: "mutiny",
        },
        {
          id: 4,
          title: " 3rd",
          amount: "$1.5k",
          project: "nolooking",
        },
        {
          id: 5,
          title: " Design",
          amount: "$1k",
          project: "saving-satoshi",
        },
      ],
      sponsor: {
        logo: "https://i.ibb.co/gTX30Rq/fulgur.png",
      },
    },
    {
      id: 3,
      title: "Building for Africa",
      description:
        "In partnership with ABC 22, this track seeks to encourage makers to build solutions that solve African challenges & increase bitcoin adoption by Africans.",
      image: "https://i.ibb.co/TW8FqRN/Africa-track-thin.png",
      prizes: [
        {
          id: 6,
          title: " 1st",
          amount: "$5k",
          project: "agrimint",
        },
        {
          id: 7,
          title: " 2nd",
          amount: "$2.5k",
          project: "lnvpn",
        },
        {
          id: 8,
          title: " 3rd",
          amount: "$1.5k",
          project: "bitpayroll",
        },
        {
          id: 9,
          title: " Design",
          amount: "$1k",
          project: "agrimint",
        },
      ],
      sponsor: {
        logo: "https://i.ibb.co/wRvRQ0h/Frame-251.png",
      },
    },
  ],

  config: {
    showFeed: false,
    registerationOpen: true,
    projectsSubmissionOpen: true,
  },
};
