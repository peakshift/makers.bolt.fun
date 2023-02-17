import { isBounty, isQuestion, isStory } from "src/features/Posts/types";
import BountyPageContent from "../BountyPageContent/BountyPageContent";
import QuestionPageContent from "../QuestionPageContent/QuestionPageContent";
import { PostDetailsQuery } from "src/graphql";
import StoryPageContent from "../StoryPageContent/StoryPageContent";

interface Props {
  post: PostDetailsQuery["getPostById"];
}

export default function PageContent({ post }: Props) {
  if (isStory(post)) return <StoryPageContent story={post} />;

  if (isBounty(post)) return <BountyPageContent bounty={post} />;

  if (isQuestion(post)) return <QuestionPageContent question={post} />;

  return null;
}
