import Header from "src/features/Posts/Components/PostCard/Header/Header"
import { Question } from "src/features/Posts/types"
import { marked } from 'marked';
import styles from '../PageContent/styles.module.css'
import Badge from "src/Components/Badge/Badge";
import { BiComment } from "react-icons/bi";
import { RiFlashlightLine } from "react-icons/ri";
import { CommentsSection } from "src/features/Posts/Components/Comments";
import { numberFormatter } from "src/utils/helperFunctions";


interface Props {
    question: Question
}

export default function QuestionPageContent({ question }: Props) {
    return (
        <>
            <div id="content" className="bg-white p-32 border rounded-16">
                <div className="flex flex-col gap-24">
                    <Header size="lg" showTimeAgo={false} author={question.author} date={question.createdAt} />
                    <h1 className="text-h2 font-bolder">{question.title}</h1>
                    <div className="flex gap-8">
                        {question.tags.map(tag => <Badge key={tag.id} size='sm'>
                            {tag.title}
                        </Badge>)}
                    </div>
                    <div className="flex gap-24">
                        <div className="text-black font-medium">
                            <RiFlashlightLine /> <span className="align-middle text-body5">{numberFormatter(question.votes_count)} votes</span>
                        </div>
                        <div className="text-black font-medium">
                            <BiComment /> <span className="align-middle text-body5">32 Comments</span>
                        </div>
                    </div>
                </div>

                <div className={`mt-42 ${styles.body}`} dangerouslySetInnerHTML={{ __html: marked.parse(question.body) }}>
                </div>
            </div>

            {/* <div id="comments" className="mt-10">
                <CommentsSection comments={question.comments} />
            </div> */}
        </>
    )
}
