import { Post, isStory, isBounty, isQuestion } from "src/features/Posts/types"
import BountyCard from "./BountyCard"
import QuestionCard from "./QuestionCard"
import StoryCard from "./StoryCard"

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
