import { BillboardItem } from "src/Components/Ads/RotatingBillboardSmall/RotatingBillboardSmall";
import { shuffle } from "src/utils/helperFunctions";

export const SMALL_BILLBOARD_DATA_ITEMS = shuffle([
  {
    title: "Subscribe on YouTube",
    description: "We host free live streams, and workshop content!",
    bgImageUrl: "https://i.imgur.com/dcAmDNL.jpg",
    href: "https://www.youtube.com/@BOLTFUN",
    thumbnailImageUrl: "https://i.imgur.com/6gCn8gf.png",
  },
  {
    title: "BOLT🔩FUN Nostr",
    description:
      "Follow BOLT.FUN on Nostr for the latest 🔥noosts from the community!",
    bgImageUrl: "https://i.imgur.com/fV6YJg4.jpg",
    thumbnailImageUrl: "https://i.imgur.com/2iMdgdx.png",
    href: "nostr:npub1funq0ywh32faz0sf7xt97japu8uk687tsysj8gndj4ehe825sq4s70gs0p",
  },
  {
    title: "ATL BitLab",
    description: "Co-working for bitcoin startups on the Atlanta Beltline",
    bgImageUrl: "https://i.imgur.com/JuprxNC.jpg",
    thumbnailImageUrl: "https://i.imgur.com/J45NFja.png",
    href: "https://bolt.fun/t/atl-bitlab",
  },
] as BillboardItem[]);
