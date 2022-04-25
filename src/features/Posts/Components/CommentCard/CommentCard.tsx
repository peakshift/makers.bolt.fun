import { BiComment } from "react-icons/bi";
import Button from "src/Components/Button/Button";
import VotesCount from "src/Components/VotesCount/VotesCount";
import { Author } from "../../types"
import Header from "../PostCard/Header/Header";

interface Comment {
    author: Author
    created_at: string
    body: string;
    votes_count: number
}
interface Props {
    comment: Comment
}

export default function CommentCard({ comment }: Props) {
    return (
        <div className="border rounded-12 p-24">
            <Header author={comment.author} date={comment.created_at} />
            <p className="text-body4 mt-16">
                {comment.body}
            </p>
            <div className="flex gap-24 mt-16 items-center">
                <VotesCount count={comment.votes_count} />
                <button className="text-gray-600 font-medium hover:bg-gray-100 py-8 px-12 rounded-8">
                    <BiComment /> <span className="align-middle text-body5">Reply</span>
                </button>
            </div>
        </div>
    )
}
