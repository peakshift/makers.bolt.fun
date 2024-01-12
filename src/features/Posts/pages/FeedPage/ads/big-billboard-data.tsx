import { BillboardItem } from "src/Components/Ads/RotatingBillboardBig/RotatingBillboardBig";
import { shuffle } from "src/utils/helperFunctions";

export const BIG_BILLBOARD_DATA_ITEMS = shuffle([
/*  {
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
*/
{
    campaign: "PeakShiftOfficeHours",
    bgImageUrl: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/9107a8b9-b5e8-42c1-bc4d-855c51537e00/original",
    logo:
      "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/aa2356c5-a64d-4955-7632-325a297d4400/original",
    bgColor: "bg-[#DD1E3E]",
    textColor: "text-white",
    title: "3 Hours Free Design",
    description: "This January & February PEAK SHIFT will be offering Top BOLT.FUN Makers help with communications and UX",
    cta: "📆 Book your session",
    href: "https://cal.com/peakshift",
  },
] as BillboardItem[]);
