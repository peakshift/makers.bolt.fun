import { Filter, Kind } from "nostr-tools";
import { useMemo } from "react";
import { useNostrQuery } from "src/lib/nostr";
import { getProfileDataFromMetaData } from "src/lib/nostr/helpers";
import NostrPostCard from "../NostrPostCard/NostrPostCard";
import { PostCardSkeleton } from "../PostCard";

type Props = {
  topic: keyof typeof toipcsToFilters;
};

export const toipcsToFilters = {
  nostr: {
    hashtags: ["NostrDesign", "NostrHackWeek", "DesigningNostr"],
    pubkey: [
      "369061c9a1ee258d28d123f35f913968884d52c4928ab7bd5a4544fcfd48f3f3", // full-feed / nostr design
      "1021c8921548fa89abb4cc7e8668a3a8dcebae0a4c323ffeaf570438832d6993", // erik
      "32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245", // jb55
      "3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d", // fiatjaf
      "1bc70a0148b3f316da33fe3c89f23e3e71ac4ff998027ec712b905cd24f6a411", // karnage
      "17538dc2a62769d09443f18c37cbe358fab5bbf981173542aa7c5ff171ed77c4", // elsat
    ],
  },
  "bitcoin-design": {
    hashtags: ["BitcoinDesign", "BitcoinUX", "DesigningBitcoin"],
    pubkey: [
      "8c29b321d0f3c61343882ea49623e84771690cd0566e40b90f08e5d34336aaa0", // full-feed / bitcoin design
      "b731e7fbde5c192d793ff520a6ec91f6965f5d8fa1b64e12171089a65e540525", // gbks
      "11d7098d61d0925dd566ef4619f76a8a93658e4a25f52d3fd8c95ac87c3ea639", // DocSharp
    ],
  },
  "geyser": {
    hashtags: ["Geyser", "GeyserFunders", "GeyserDev", "GeyserDesign"],
    pubkey: [
      "b6dcdddf86675287d1a4e8620d92aa905c258d850bf8cc923d39df1edfee5ee7", // geyser
      "95a69326449931adda32e7e0f6275bec0e387abeee4bb56b3e94f46a6ac402e2", // stelios
      "8b0a2beaf6ebef925e8e78f8f0ada41f7898b8da72a8971b89988bf7857d369f", // mick
    ],
  },
  "meta": {
    hashtags: ["BOLTFUN"],
    pubkey: [
      "4f260791d78a93d13e09f1965f4ba1e1f96d1fcb812123a26d95737c9d54802b", // BOLTFUN
      "57f03c1604d109be088dbac71371b6939833dd24fdcf2886d3382a0479c0d4de", // MTG
      "85efb8a81515b93db9af829e2f6740fbad2e7bb6b73d912f254e7b2d92fcdc65", // Johns
    ],
  },
};
export function hasTagsList(
  topic: string
): topic is keyof typeof toipcsToFilters {
  return topic in toipcsToFilters;
}

export const topicToNpubs = {
  nostr: ["npub1x6gxrjdpacjc62x3y0e4lyfedzyy65kyj29t0026g4z0el2g70esc0rtxj"],
  "bitcoin-design": [
    "npub13s5mxgws70rpxsug96jfvglggackjrxs2ehypwg0prjaxsek42sqd9l03e",
  ],
};

export function getFilters(topic: keyof typeof toipcsToFilters): Filter[] {
  const baseFilter = { kinds: [1, 30023], limit: 100 };

  let filters: Filter[] = [];
  if (toipcsToFilters[topic].hashtags)
    filters.push({ ...baseFilter, "#t": toipcsToFilters[topic].hashtags });
  if (toipcsToFilters[topic].pubkey)
    filters.push({ ...baseFilter, authors: toipcsToFilters[topic].pubkey });

  return filters;
}

export default function NostrFeed(props: Props) {
  const filters = useMemo(() => getFilters(props.topic), [props.topic]);

  const { events, metadata, isEmpty } = useNostrQuery({ filters });

  const posts = events.filter(
    (event) => !event.tags.some(([tag]) => tag === "e")
  );

  if (isEmpty)
    return (
      <p className="flex py-48 flex-col text-body3 justify-center items-center text-gray-400 text-center col-[1/-1]">
        Nothing found here
      </p>
    );

  if (posts.length === 0)
    return (
      <div className="flex flex-col gap-24">
        {
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        }
      </div>
    );

  return (
    <div className="flex flex-col gap-24">
      {posts.map((post) => (
        <NostrPostCard
          key={post.id}
          post={post}
          author={getProfileDataFromMetaData(metadata, post.pubkey)}
        />
      ))}
    </div>
  );
}
