import { PostsToComments } from "src/features/Posts/pages/FeedPage/useFeedComments";
import { isStory, isBounty, isQuestion } from "src/features/Posts/types";
import { NostrProfile } from "src/lib/nostr";
import BountyCard, { BountyCardType } from "../BountyCard/BountyCard";
import QuestionCard, { QuestionCardType } from "../QuestionCard/QuestionCard";
import StoryCard, { StoryCardType } from "../StoryCard/StoryCard";

export type PostCardType = StoryCardType | QuestionCardType | BountyCardType;

type Props = {
  post: PostCardType;
  postsToComments: PostsToComments;
  commentsProfilesData: Record<string, NostrProfile>;
};

export default function PostCard({
  post,
  postsToComments,
  commentsProfilesData,
}: Props) {
  if (isStory(post))
    return (
      <StoryCard
        story={post}
        comments={
          post.nostr_event_id ? postsToComments[post.nostr_event_id] : undefined
        }
        commentsProfilesData={commentsProfilesData}
      />
    );

  if (isBounty(post)) return <BountyCard bounty={post} />;

  if (isQuestion(post)) return <QuestionCard question={post} />;

  return null;
}
