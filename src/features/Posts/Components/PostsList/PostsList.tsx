import { useReachedBottom } from "src/utils/hooks/useReachedBottom";
import { ListComponentProps } from "src/utils/interfaces";
import { PostsToComments } from "../../pages/FeedPage/useFeedComments";
import PostCard, { PostCardSkeleton } from "../PostCard";
import { PostCardType } from "../PostCard/PostCard/PostCard";

type Props = ListComponentProps<PostCardType> & {
  postsToComments: PostsToComments;
};

export default function PostsList(props: Props) {
  const { ref } = useReachedBottom<HTMLDivElement>(props.onReachedBottom);

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

  return (
    <div ref={ref} className="flex flex-col gap-24">
      {props.items?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          postsToComments={props.postsToComments}
        />
      ))}
      {props.isFetching && <PostCardSkeleton />}
    </div>
  );
}
