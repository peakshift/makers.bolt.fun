import { useMemo } from "react";
import Button from "src/Components/Button/Button";
import { nonNullable } from "src/utils/helperFunctions";
import { useReachedBottom } from "src/utils/hooks/useReachedBottom";
import { ListComponentProps } from "src/utils/interfaces";
import { useFeedComments } from "../../pages/FeedPage/useFeedComments";
import PostCard, { PostCardSkeleton } from "../PostCard";
import { PostCardType } from "../PostCard/PostCard/PostCard";

type Props = ListComponentProps<PostCardType> & {
  renderEmptyState?: () => JSX.Element;
};

export default function PostsList(props: Props) {
  const { ref } = useReachedBottom<HTMLDivElement>(props.onReachedBottom);

  const postsIds = useMemo(
    () =>
      props.items
        ?.map((s) => {
          if ("nostr_event_id" in s) {
            return s.nostr_event_id;
          }
          return null;
        })
        .filter(nonNullable),
    [props.items]
  );

  const { postsToComments } = useFeedComments({
    events_ids: postsIds,
  });

  if (props.isLoading)
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

  if (props.items?.length === 0)
    return (
      props.renderEmptyState?.() ?? (
        <div className="text-center text-gray-500">No posts found</div>
      )
    );

  return (
    <div ref={ref} className="flex flex-col gap-24">
      {props.items?.map((post) => (
        <PostCard key={post.id} post={post} postsToComments={postsToComments} />
      ))}
      {props.isFetching && <PostCardSkeleton />}
    </div>
  );
}
