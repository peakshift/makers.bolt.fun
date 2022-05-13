import Header from "src/features/Posts/Components/PostCard/Header/Header"
import { Story } from "src/features/Posts/types"
import { marked } from 'marked';
import styles from './styles.module.css'
import Badge from "src/Components/Badge/Badge";
import { BiComment } from "react-icons/bi";
import { RiFlashlightLine } from "react-icons/ri";
import { CommentsSection } from "src/features/Posts/Components/Comments";


interface Props {
    story: Story
}

export default function StoryPageContent({ story }: Props) {
    return (
        <>
            <div id="content" className="bg-white p-32 border rounded-16">
                <div className="flex flex-col gap-24">
                    <Header size="lg" showTimeAgo={false} author={story.author} date={story.date} />
                    <h1 className="text-h2 font-bolder">{story.title}</h1>
                    <div className="flex gap-8">
                        {story.tags.map(tag => <Badge key={tag.id} size='sm'>
                            {tag.title}
                        </Badge>)}
                    </div>
                    <div className="flex gap-24">
                        <div className="text-black font-medium">
                            <RiFlashlightLine /> <span className="align-middle text-body5">{story.votes_count} votes</span>
                        </div>
                        <div className="text-black font-medium">
                            <BiComment /> <span className="align-middle text-body5">{story.comments_count} Comments</span>
                        </div>
                    </div>
                </div>

                <div className={`mt-42 ${styles.body}`} dangerouslySetInnerHTML={{ __html: marked.parse(story.body) }}>
                </div>
            </div>
            <div id="comments" className="mt-10 comments_col">
                <CommentsSection comments={story.comments} />
            </div>
        </>
    )
}
