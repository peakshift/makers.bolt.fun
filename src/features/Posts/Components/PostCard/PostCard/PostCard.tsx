import { Post, isStory, isBounty, isQuestion } from "src/features/Posts/types"
import BountyCard from "../BountyCard/BountyCard"
import QuestionCard from "../QuestionCard/QuestionCard"
import StoryCard from "../StoryCard/StoryCard"

type Props = {
  post: Post
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
