
import { useState } from "react";
import AddComment from "../AddComment/AddComment";
import CommentCard from "../CommentCard/CommentCard";
import { CommentWithReplies } from "../types";


interface Props {
    comment: CommentWithReplies
    isRoot?: boolean;
    onClickedReply?: () => void
}

export default function Comment({ comment, isRoot, onClickedReply }: Props) {

    const [replyOpen, setReplyOpen] = useState(false)


    const clickReply = () => {
        if (isRoot)
            setReplyOpen(true);
        else
            onClickedReply?.()
    }

    return (
        <div >
            <CommentCard comment={comment} onReply={clickReply} />
            {(comment.replies.length > 0 || replyOpen) && <div className="flex mt-16 gap-8 md:gap-20 pl-8">
                <div className="border-l border-b border-gray-200 w-16 md:w-24 h-40 rounded-bl-8 flex-shrink-0"></div>
                <div className="flex flex-col w-full gap-16">
                    {comment.replies.map(reply => <Comment
                        key={reply.id}
                        comment={reply}
                        onClickedReply={clickReply}
                    />)}
                    {replyOpen && <AddComment autoFocus placeholder="Leave a reply..." />}
                </div>
            </div>}
        </div>
    )
}
