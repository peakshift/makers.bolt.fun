import { useLayoutEffect, useRef, useState } from "react";
import { BillboardItem } from "src/Components/Ads/BillboardTemplate/BillboardTemplate";
import { shuffle } from "src/utils/helperFunctions";

export const useGetRandomBillboardItem = () => {
  const [billboard, setBillboard] = useState<BillboardItem>(billboards[0]);

  const currentIdx = useRef(0);

  useLayoutEffect(() => {
    const intervalId = setInterval(() => {
      setBillboard(billboards[++currentIdx.current % billboards.length]);
    }, 90000); // 180000 ms = 3 mins

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return billboard;
};

const billboards = shuffle([
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
  {
    campaign: "NostrasiaHackathon",
    bgImageUrl:
      "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/833eb817-cfb1-4759-7468-b1c58e59ad00/original",
    bgColor: "bg-[#5B0A8E]",
    textColor: "text-white",
    logo: "https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/671ae048-d426-4697-c680-6c270f106600/original",
    title: "$4000 in prizes to build on Nostr",
    description:
      "Build tools, marketplaces, or bring your community to Nostr from 3rd Oct - 3rd Nov",
    cta: "🏆 View Tournament",
    href: "/tournaments/nostrasia",
  },
]);
