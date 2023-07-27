import { TournamentStaticData } from "../../types";

export const LOL_TOURNAMENT_STATIC_DATA: TournamentStaticData = {
  chat: {
    type: "discord",
    url: "https://discord.gg/HFqtxavb7x",
  },

  schedule: [],

  partnersList: [
    {
      title: "Organizers & Sponsors",
      items: [
        {
          url: "https://fulgur.ventures/",
          image: "https://i.ibb.co/7zhq234/fulgur.png",
          isBigImage: true,
        },
        {
          url: "https://peakshift.com/",
          image: "https://i.ibb.co/nPJVd7s/ps.png",
        },
        {
          url: "https://www.afrobitcoin.org/",
          image:
            "https://i.ibb.co/qDZYrGz/Screenshot-2022-09-14-at-17-03-47.jpg",
        },
        {
          url: "https://bitcoin.design/",
          image: "https://i.ibb.co/cgY6zy2/bitcoin-design.jpg",
        },
        {
          url: "https://voltage.cloud/",
          image: "https://i.ibb.co/vd6mQfg/voltage.png",
        },
        {
          url: "https://lightning.engineering/",
          image: "https://i.ibb.co/x34whhN/lightning.png",
        },
        {
          url: "https://galoy.io",
          image: "https://i.ibb.co/xCcT4Hw/galoy2.jpg",
        },
        {
          url: "https://breez.technology/",
          image: "https://i.ibb.co/6stx8tC/breez.webp",
        },
        {
          url: "https://www.getmash.com",
          image: "https://i.ibb.co/fxNh5v3/mash-logo.png",
        },
        {
          url: "https://2022.tabconf.com/",
          image: "https://i.ibb.co/zFGVqvV/tab-conf.jpg",
        },
        {
          url: "https://geyser.fund/",
          image: "https://i.ibb.co/tp6L5bt/geyser.jpg",
        },
        {
          url: "https://opensats.org/",
          image: "https://i.ibb.co/b5y29TL/open-sats.jpg",
        },
        {
          url: "https://adoptingbitcoin.org/2022/",
          image:
            "https://i.ibb.co/HdvRbxQ/Screenshot-2022-09-14-at-17-06-33.jpg",
        },
      ],
    },
  ],

  tracksAndPrizes: [
    {
      id: 1,
      title: "Grand Champion",
      description:
        "The Legend of Lightning will be the best in show, la créme de la créme. Every project entered will be eligible for this award, no matter what track they choose.",
      image: "https://i.ibb.co/2gMLDmJ/grand-prize.png",
      positions: [
        {
          position: "the legend",
          reward: "1 BTC",
          project: "Lightsats",
        },
        {
          position: "",
          reward: "0.5 BTC",
          project: "mutiny",
        },
        {
          position: "",
          reward: "0.5 BTC",
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
      positions: [
        {
          position: " 1st",
          reward: "$5k",
          project: "Lightsats",
        },
        {
          position: " 2nd",
          reward: "$2.5k",
          project: "mutiny",
        },
        {
          position: " 3rd",
          reward: "$1.5k",
          project: "nolooking",
        },
        {
          position: " Design",
          reward: "$1k",
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
      positions: [
        {
          position: " 1st",
          reward: "$5k",
          project: "agrimint",
        },
        {
          position: " 2nd",
          reward: "$2.5k",
          project: "lnvpn",
        },
        {
          position: " 3rd",
          reward: "$1.5k",
          project: "bitpayroll",
        },
        {
          position: " Design",
          reward: "$1k",
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
    registerationOpen: false,
    projectsSubmissionOpen: false,
  },
};

export default LOL_TOURNAMENT_STATIC_DATA;
