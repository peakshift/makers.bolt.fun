import { isBounty, isQuestion, isStory, Post } from "src/features/Posts/types"
import StoryPageContent from "./StoryPageContent";
import BountyPageContent from "./BountyPageContent";
import { PostDetailsQuery } from "src/graphql";


interface Props {
    post: PostDetailsQuery['getPostById']
}

export default function PageContent({ post }: Props) {
    if (isStory(post))
        return <StoryPageContent story={post} />

    if (isBounty(post))
        return <BountyPageContent bounty={post} />

    // if (isQuestion(post))
    //     return <QuestionCard question={post} />

    return null

}
