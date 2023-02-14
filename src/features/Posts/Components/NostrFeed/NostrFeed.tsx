import { Filter } from "nostr-tools";
import { useMemo } from "react";
import { useNostrQuery } from "src/utils/nostr";
import { getProfileDataFromMetaData } from "src/utils/nostr/helpers";
import NostrPostCard from "../NostrPostCard/NostrPostCard";
import { PostCardSkeleton } from "../PostCard";

type Props = {
  topic: keyof typeof topicToTagsList;
};

export const topicToTagsList = {
  nostr: ["nostrdesign", "nostrhackweek"],
  "bitcoin-design": ["bitcoin-design", "bitcoin"],
};

export function hasTagsList(
  topic: string
): topic is keyof typeof topicToTagsList {
  return topic in topicToTagsList;
}

export default function NostrFeed(props: Props) {
  const filters = useMemo(
    () =>
      [
        { kinds: [1, 30023], "#t": topicToTagsList[props.topic], limit: 40 },
      ] as Filter[],
    [props.topic]
  );

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
