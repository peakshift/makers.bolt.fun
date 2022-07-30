import React, { useEffect, useMemo, useState } from 'react'
import CommentRoot from '../Comment/Comment'
import AddComment from '../AddComment/AddComment'
import { Comment, } from '../types'
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker'
import { useAppSelector } from "src/utils/hooks";

import * as CommentsWorker from './comments.worker'
import { Post_Type } from 'src/graphql'
import useComments from './useComments'
import IconButton from 'src/Components/IconButton/IconButton'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { createRoute } from 'src/utils/routing'
import Preferences from 'src/services/preferences.service'

// const createWorker = createWorkerFactory(() => import('./comments.worker'));


interface Props {
  type: Post_Type,
  id: number | string
};


export default function CommentsSection({ type, id }: Props) {
  // const worker = useWorker(createWorker);
  // const commentsTree = useMemo(() => convertCommentsToTree(comments), [comments])

  // const [commentsTree, setCommentsTree] = useState<Comment[]>([])
  const user = useAppSelector(state => state.user.me);
  const [showTooltip, setShowTooltip] = useState(Preferences.get('showNostrCommentsTooltip'))
  // const filter = useMemo(() => `boltfun ${type}_comment ${id}` + (process.env.NODE_ENV === 'development' ? ' dev' : ""), [id, type])

  // useEffect(() => {
  //   CommentsWorker.connect();
  //   const unsub = CommentsWorker.sub(filter, (newComments) => {
  //     setCommentsTree(newComments)
  //   })

  //   return () => {
  //     unsub();
  //   }
  // }, [filter]);
  const { commentsTree, postComment, connectionStatus } = useComments({ type, id })

  const handleNewComment = async (content: string, parentId?: string) => {
    try {
      await postComment({ content, parentId });
      return true;
    } catch (error) {
      return false
    }
  }

  const closeTooltip = () => {
    Preferences.update('showNostrCommentsTooltip', false);
    setShowTooltip(false);
  }


  return (
    <div className="border-2 border-gray-200 rounded-12 md:rounded-16 p-32 bg-white">
      <div className="flex flex-wrap justify-between">
        <h6 className="text-body2 font-bolder">Discussion</h6>
        {connectionStatus.status === 'Connected' && <div className="bg-green-50 text-green-500 text-body5 font-medium py-4 px-12 rounded-48"> &#8226; Connected to {connectionStatus.connectedRelaysCount} relays 📡</div>}
        {connectionStatus.status === 'Connecting' && <div className="bg-amber-50 text-amber-500 text-body5 font-medium py-4 px-12 rounded-48"> &#8226; Connecting to relays ⌛</div>}
        {connectionStatus.status === 'Not Connected' && <div className="bg-red-50 text-red-500 text-body5 font-medium py-4 px-12 rounded-48"> &#8226; Not connected 📡</div>}
      </div>
      {showTooltip && <div className="bg-gray-900 text-white p-16 rounded-12 my-24 flex items-center justify-between gap-12">
        <span>💬</span>
        <p className="text-body4 font-medium">Learn about <Link to={createRoute({ type: "story", title: "What is Nostr", id: 999 })} className='underline'>how your data is stored</Link> with Nostr comments and relays</p>
        <IconButton className='shrink-0 self-start' onClick={closeTooltip}><AiOutlineClose className='text-gray-600' /></IconButton>
      </div>}
      {!!user && <div className="mt-24">
        <AddComment
          placeholder='Leave a comment...'
          onSubmit={content => handleNewComment(content)}
          avatar={user.avatar}
        />
      </div>}
      <div className='flex flex-col gap-16 mt-32'>
        {commentsTree.map(comment =>
          <CommentRoot
            key={comment.id}
            comment={comment}
            isRoot
            canReply={!!user}
            onReply={content => handleNewComment(content, comment.nostr_id.toString())}
          />)}
      </div>
    </div>
  )
}
