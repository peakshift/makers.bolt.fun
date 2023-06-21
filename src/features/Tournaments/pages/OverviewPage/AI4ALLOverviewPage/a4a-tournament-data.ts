import { TournamentStaticData } from "../../types";

export const AI4ALL_TOURNAMENT_STATIC_DATA: TournamentStaticData = {
  chat: {
    type: "discord",
    link: "https://discord.gg/AVgabQzCqJ", // general chat
  },

  schedule: [],

  partnersList: [
    {
      title: "Organizers",
      items: [
        {
          link: "https://fedi.xyz/",
          image:
            "https://mma.prnewswire.com/media/2068426/fedi_brandmark_dark_Logo.jpg?p=publish",
          isBigImage: true,
        },
        {
          link: "https://www.stakwork.com/",
          image:
            "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/15fae9f1-3f9d-4fa7-5992-0e052111fc00/original",
          isBigImage: true,
        },
      ],
    },
    {
      title: "Collaborators",
      items: [
        {
          link: "https://replit.com/",
          image:
            "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/f9fea1da-e968-420d-a274-52af966b2800/original",
          isBigImage: true,
        },
      ],
    },
  ],

  tracksAndPrizes: [
    {
      id: 1,
      title: "Overall",
      description:
        "The Paperclip Maximizer, the AGI-pocalypse bringer himself! Every project entered will be eligible for this award, no matter what track they choose.",
      image: "https://i.ibb.co/2gMLDmJ/grand-prize.png",
      prizes: [
        {
          id: 1,
          title: "Prize",
          amount: "$10,000",
        },
      ],
      sponsor: {
        logo: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/2cb3bc6d-65bc-42d5-b751-666d6cb56100/original",
      },
    },
    {
      id: 2,
      title: "Agents (Machine Payments)",
      description:
        "This track is for projects that use bitcoin to give agents and LLMs the ability to use bitcoin in interesting ways to perform economic actions.",
      image: "https://i.ibb.co/d4vxYXD/global-adoption-lg.png",
      prizes: [
        {
          id: 4,
          title: " Prize",
          amount: "$1000",
        },
      ],
      sponsor: {
        logo: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/2cb3bc6d-65bc-42d5-b751-666d6cb56100/original",
      },
    },
    {
      id: 3,
      title: "Privacy",
      description:
        "This track is for projects that explore the tradeoffs of the new wave of generative AI and privacy: how can we use these tools and 3rd parties without giving up our rights and freedoms?",
      image: "https://i.ibb.co/TW8FqRN/Africa-track-thin.png",
      prizes: [
        {
          id: 8,
          title: " Prize",
          amount: "$1000",
        },
      ],
      sponsor: {
        logo: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/2cb3bc6d-65bc-42d5-b751-666d6cb56100/original",
      },
    },
    {
      id: 4,
      title: "Training",
      description:
        "There's a ton of work required to build, train, clean data for, fine tune, and run RLHF on AI models. This track is about using Bitcoin to coordinate the economic incentives around building and running AI models at scale (large or small)",
      image: "https://i.ibb.co/TW8FqRN/Africa-track-thin.png",
      prizes: [
        {
          id: 12,
          title: " Prize",
          amount: "$1000",
        },
      ],
      sponsor: {
        logo: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/2cb3bc6d-65bc-42d5-b751-666d6cb56100/original",
      },
    },
    {
      id: 5,
      title: "Bitcoin Education",
      description:
        "Generative AI lets us build personalized educational tracks and materials to help onboard the rest of the world to using bitcoin. This track is about using AI to orange pill people in interesting ways.",
      image: "https://i.ibb.co/TW8FqRN/Africa-track-thin.png",
      prizes: [
        {
          id: 16,
          title: " Prize",
          amount: "$1000",
        },
      ],
      sponsor: {
        logo: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/2cb3bc6d-65bc-42d5-b751-666d6cb56100/original",
      },
    },
  ],

  config: {
    showFeed: false,
    registerationOpen: true,
    projectsSubmissionOpen: true,
  },
};

export default AI4ALL_TOURNAMENT_STATIC_DATA;
