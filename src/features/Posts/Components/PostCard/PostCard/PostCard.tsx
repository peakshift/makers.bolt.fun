import { PostsToComments } from "src/features/Posts/pages/FeedPage/useFeedComments";
import { isStory, isBounty, isQuestion } from "src/features/Posts/types";
import BountyCard, { BountyCardType } from "../BountyCard/BountyCard";
import QuestionCard, { QuestionCardType } from "../QuestionCard/QuestionCard";
import StoryCard, { StoryCardType } from "../StoryCard/StoryCard";

export type PostCardType = StoryCardType | QuestionCardType | BountyCardType;

type Props = {
  post: PostCardType;
  postsToComments: PostsToComments;
};

export default function PostCard({ post, postsToComments }: Props) {
  if (isStory(post))
    return (
      <StoryCard
        story={post}
        comments={
          post.nostr_event_id ? postsToComments[post.nostr_event_id] : undefined
        }
      />
    );

  if (isBounty(post)) return <BountyCard bounty={post} />;

  if (isQuestion(post)) return <QuestionCard question={post} />;

  return null;
}
