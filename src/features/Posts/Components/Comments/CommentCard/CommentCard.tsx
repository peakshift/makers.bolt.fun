import { BiComment } from "react-icons/bi";
import VotesCount from "src/Components/VotesCount/VotesCount";
import Header from "src/features/Posts/Components/PostCard/Header/Header";
import { Comment } from "../types";


interface Props {
    comment: Comment
    onReply?: () => void
}

export default function CommentCard({ comment, onReply }: Props) {
    return (
        <div className="border rounded-12 p-24">
            <Header author={comment.author} date={comment.createdAt} />
            <p className="text-body4 mt-16">
                {comment.body}
            </p>
            <div className="flex gap-24 mt-16 items-center">
                <VotesCount count={comment.votes_count} />
                <button
                    className="text-gray-600 font-medium hover:bg-gray-100 py-8 px-12 rounded-8"
                    onClick={onReply}
                >
                    <BiComment /> <span className="align-middle text-body5">Reply</span>
                </button>
            </div>
        </div>
    )
}
