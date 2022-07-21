
import { useState } from "react";
import { useAppSelector } from "src/utils/hooks";
import AddComment from "../AddComment/AddComment";
import CommentCard from "../CommentCard/CommentCard";
import { CommentWithReplies } from "../types";


interface Props {
    comment: CommentWithReplies
    isRoot?: boolean;
    canReply: boolean;
    onClickedReply?: () => void;
    onReply?: (text: string) => void
}

export default function Comment({ comment, canReply, isRoot, onClickedReply, onReply }: Props) {

    const [replyOpen, setReplyOpen] = useState(false)
    const user = useAppSelector(s => s.user.me)

    const clickReply = () => {
        if (isRoot)
            setReplyOpen(true);
        else
            onClickedReply?.()
    }

    return (
        <div >
            <CommentCard canReply={canReply} comment={comment} onReply={clickReply} />
            {(comment.replies.length > 0 || replyOpen) && <div className="flex mt-16 gap-8 md:gap-20 pl-8">
                <div className="border-l border-b border-gray-200 w-16 md:w-24 h-40 rounded-bl-8 flex-shrink-0"></div>
                <div className="flex flex-col w-full gap-16">
                    {comment.replies.map(reply => <Comment
                        key={reply.id}
                        comment={reply}
                        onClickedReply={clickReply}
                        canReply={false}
                    />)}
                    {replyOpen && <AddComment
                        avatar={user?.avatar!}
                        autoFocus
                        placeholder="Leave a reply..."
                        onSubmit={(text) => onReply?.(text)}
                    />}
                </div>
            </div>}
        </div>
    )
}
