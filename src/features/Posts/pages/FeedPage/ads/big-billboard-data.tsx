import { BillboardItem } from "src/Components/Ads/RotatingBillboardBig/RotatingBillboardBig";
import { shuffle } from "src/utils/helperFunctions";

export const BIG_BILLBOARD_DATA_ITEMS = shuffle([
  {
    campaign: "LegendsOfLightning",
    bgImageUrl:
      "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/c1ab5b6c-b93f-4d28-895d-3255f9102900/original",
    bgColor: "bg-[#0A0E1F]",
    textColor: "text-white",
    logo: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/527eb000-0477-4eb6-e8bd-be7ffb044c00/original",
    title: "2.5 BTC in prizes to build on Lightning",
    description: "Second edition of the most legendary bitcoin hackathon!",
    cta: "🏆 View Tournament",
    href: "/tournaments/legends-of-lightning-vol2",
  },
] as BillboardItem[]);
