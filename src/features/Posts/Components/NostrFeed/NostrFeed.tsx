import { Filter } from "nostr-tools";
import { useMemo } from "react";
import { useNostrQuery } from "src/utils/nostr";
import { getProfileDataFromMetaData } from "src/utils/nostr/helpers";
import NostrPostCard from "../NostrPostCard/NostrPostCard";
import { PostCardSkeleton } from "../PostCard";

type Props = {
  topic: keyof typeof toipcsToFilters;
};

export const toipcsToFilters = {
  nostr: {
    hashtags: ["nostrdesign", "nostrhackweek"],
    pubkey: [
      "369061c9a1ee258d28d123f35f913968884d52c4928ab7bd5a4544fcfd48f3f3",
    ],
  },
  "bitcoin-design": {
    hashtags: ["bitcoin-design"],
    pubkey: [
      "8c29b321d0f3c61343882ea49623e84771690cd0566e40b90f08e5d34336aaa0",
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
  const baseFilter = { kinds: [1, 30023], limit: 40 };

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
