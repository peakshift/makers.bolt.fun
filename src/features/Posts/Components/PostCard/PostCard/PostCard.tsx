import { isStory, isBounty, isQuestion } from "src/features/Posts/types"
import BountyCard, { BountyCardType } from "../BountyCard/BountyCard"
import QuestionCard, { QuestionCardType } from "../QuestionCard/QuestionCard"
import StoryCard, { StoryCardType } from "../StoryCard/StoryCard"

export type PostCardType = StoryCardType | QuestionCardType | BountyCardType;

type Props = {
  post: PostCardType
}

export default function PostCard({ post }: Props) {
  if (isStory(post))
    return <StoryCard story={post} />

  if (isBounty(post))
    return <BountyCard bounty={post} />

  if (isQuestion(post))
    return <QuestionCard question={post} />

  return null
}
