import React, { useMemo } from 'react'
import Comment from '../Comment/Comment'
import AddComment from '../AddComment/AddComment'
import { convertCommentsToTree } from '../helpers'
import { Comment as IComment } from '../types'

interface Props {
  comments: IComment[]
}

export default function CommentsSection({ comments }: Props) {
  const commentsTree = useMemo(() => convertCommentsToTree(comments), [comments])

  return (
    <div className="border border-gray-200 rounded-10 p-32 bg-white">
      <h6 className="text-body2 font-bolder">Discussion ({comments.length})</h6>
      <div className="mt-24">
        <AddComment />
      </div>
      <div className="border border-gray-200 rounded-10 p-24 mt-32">
        <div className='flex flex-col gap-16'>
          {commentsTree.map(comment => <Comment key={comment.id} comment={comment} />)}
        </div>
      </div>
    </div>
  )
}
