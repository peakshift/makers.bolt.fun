import VotesCount from "src/Components/VotesCount/VotesCount"
import { Question } from "src/features/Posts/types"
import Header from "../Header/Header"
import { FiUsers } from "react-icons/fi"
import Badge from "src/Components/Badge/Badge"
import { Link } from "react-router-dom"

type QuestionCardType = Pick<Question,
    | 'title'
    | 'date'
    | 'author'
    | 'excerpt'
    | 'votes_count'
    | "tags"
    | "answers_count"
    | "comments"
>;
interface Props {
    question: QuestionCardType
}
export default function QuestionCard({ question }: Props) {
    return (
        <div className="bg-white rounded-12 overflow-hidden border">
            {/* <img src={question.cover_image} className='h-[200px] w-full object-cover' alt="" /> */}
            <div className="p-24">
                <Header author={question.author} date={question.date} />
                <div className="flex justify-between">
                    <Link to={'#'}>
                        <h2 className="text-h5 font-bolder mt-16">{question.title}</h2>
                    </Link>
                </div>
                <p className="text-body4 text-gray-600 mt-8">{question.excerpt}</p>

                <div className="flex gap-8 mt-8">
                    <Badge key={'991199'} size='sm' color="none" className="bg-red-200 text-red-600">
                        Help
                    </Badge>
                    {question.tags.map(tag => <Badge key={tag.id} size='sm'>
                        {tag.title}
                    </Badge>)}
                </div>

                <hr className="my-16 bg-gray-200" />
                <div className="flex gap-24">
                    <VotesCount count={question.votes_count} />
                    <div className="text-gray-600">
                        <FiUsers /> <span className="align-middle text-body5">{question.answers_count} Answers</span>
                    </div>
                </div>

                <div className="flex p-16 mt-16 flex-col gap-10 bg-gray-50">
                    <div className="flex flex-col gap-10">
                        {question.comments.map(comment => <div key={comment.id} className="border-b last-of-type:border-b-0 pb-8 " >
                            <Header author={comment.author} size='sm' date={comment.date} />
                            <p className="text-body5 text-gray-600 mt-8">{comment.body}</p>
                        </div>)}
                    </div>

                    <div className="flex">
                        <Link to='#' className="text-black font-medium p-8 hover:bg-gray-100 rounded">
                            See all {question.answers_count} comments
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
