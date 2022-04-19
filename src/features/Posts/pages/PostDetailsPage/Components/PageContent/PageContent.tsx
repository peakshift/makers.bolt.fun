import Header from "src/features/Posts/Components/PostCard/Header/Header"
import { isBounty, isQuestion, isStory, Post } from "src/features/Posts/types"
import { marked } from 'marked';
import styles from './styles.module.css'
import Badge from "src/Components/Badge/Badge";
import { BiComment } from "react-icons/bi";
import { RiFlashlightLine } from "react-icons/ri";
import StoryPageContent from "./StoryPageContent";
import BountyPageContent from "./BountyPageContent";


interface Props {
    post: Post
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
