import { marked } from "marked";
import { BiComment } from "react-icons/bi";
import VoteButton from "src/Components/VoteButton/VoteButton";
import Header from "src/features/Posts/Components/PostCard/Header/Header";
import { Comment } from "../types";
import DOMPurify from 'dompurify';


interface Props {
    comment: Comment
    canReply?: boolean;
    onReply?: () => void
}

export default function CommentCard({ comment, canReply, onReply }: Props) {
    return (
        <div className="border rounded-12 p-24">
            <Header author={comment.author} date={new Date(comment.created_at).toISOString()} />
            <div
                className="text-body4 mt-16 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(comment.body)) }}
            >

            </div>
            <div className="flex gap-24 mt-16 items-center">
                <VoteButton votes={0} hideVotesCoun onVote={(value, config) => console.log('Voting amount ' + value)} />
                {canReply && <button
                    className="text-gray-600 font-medium hover:bg-gray-100 py-8 px-12 rounded-8"
                    onClick={onReply}
                >
                    <BiComment /> <span className="align-middle text-body5">Reply</span>
                </button>}
            </div>
        </div>
    )
}
