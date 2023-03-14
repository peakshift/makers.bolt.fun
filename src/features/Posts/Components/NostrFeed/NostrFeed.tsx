import { Filter, Kind } from "nostr-tools";
import React, { useMemo } from "react";
import { RelayPoolProvider, useNostrQuery } from "src/lib/nostr";
import { getProfileDataFromMetaData } from "src/lib/nostr/helpers";
import { withProviders } from "src/utils/hoc";
import NostrPostCard from "../NostrPostCard/NostrPostCard";
import { PostCardSkeleton } from "../PostCard";
import { toipcsToFilters } from "./topics-to-nostr-filters";
import { ListProps, Virtuoso } from "react-virtuoso";

type Props = {
  topic: keyof typeof toipcsToFilters;
};

export function hasTagsList(
  topic: string
): topic is keyof typeof toipcsToFilters {
  return topic in toipcsToFilters;
}

export function getFilters(topic: keyof typeof toipcsToFilters): Filter[] {
  const baseFilter = { kinds: [1, 30023], limit: 100 };

  let filters: Filter[] = [];
  if (toipcsToFilters[topic].hashtags)
    filters.push({
      ...baseFilter,
      "#t": toipcsToFilters[topic].hashtags.map((tag) =>
        tag.toLocaleLowerCase()
      ),
    });
  if (toipcsToFilters[topic].pubkey)
    filters.push({ ...baseFilter, authors: toipcsToFilters[topic].pubkey });

  return filters;
}

function NostrFeed(props: Props) {
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
    <Virtuoso
      useWindowScroll
      data={posts}
      components={{
        List,
      }}
      itemContent={(idx, post) => (
        <NostrPostCard
          key={post.id}
          post={post}
          author={getProfileDataFromMetaData(metadata, post.pubkey)}
        />
      )}
    />
  );
}

const List = React.forwardRef<any, any>((props, ref) => {
  return <div {...props} ref={ref} className={`flex flex-col gap-24`} />;
});

export default withProviders(RelayPoolProvider)(NostrFeed);
