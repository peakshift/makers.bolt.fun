
import CommentCard from "../CommentCard/CommentCard";
import { CommentWithReplies } from "../types";


interface Props {
    comment: CommentWithReplies
}

export default function Comment({ comment }: Props) {
    return (
        <div >
            <CommentCard comment={comment} />
            {comment.replies.length > 0 && <div className="flex mt-16 gap-20">
                <div className="border-l border-b border-gray-200 w-24 h-40 rounded-bl-8 flex-shrink-0 ml-8"></div>
                <div className="flex flex-col gap-16">
                    {comment.replies.map(reply => <Comment key={reply.id} comment={reply} />)}
                </div>
            </div>}
        </div>
    )
}
