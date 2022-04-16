import { Post } from "src/features/Posts/types"
import BountyCard from "./BountyCard"
import QuestionCard from "./QuestionCard"
import StoryCard from "./StoryCard"

type Props = {
  post: Post
}

export default function PostCard({ post }: Props) {
  if (post.type === 'story')
    return <StoryCard story={post} />

  if (post.type === 'bounty')
    return <BountyCard bounty={post} />

  if (post.type === 'question')
    return <QuestionCard question={post} />

  return null
}
