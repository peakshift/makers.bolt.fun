import { useState } from 'react'
import CommentRoot from '../Comment/Comment'
import AddComment from '../AddComment/AddComment'
import { useAppSelector } from "src/utils/hooks";

import { Post_Type } from 'src/graphql'
import useComments from './useComments'
import IconButton from 'src/Components/IconButton/IconButton'
import { AiOutlineClose } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'
import { createRoute, PAGES_ROUTES } from 'src/utils/routing'
import Preferences from 'src/services/preferences.service'

// const createWorker = createWorkerFactory(() => import('./comments.worker'));


interface Props {
  type: Post_Type,
  id: number | string
};


export default function CommentsSection({ type, id }: Props) {

  const user = useAppSelector(state => state.user.me);
  const [showTooltip, setShowTooltip] = useState(Preferences.get('showNostrCommentsTooltip'));
  const location = useLocation()

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
    <div className="md:border-2 border-gray-200 rounded-12 md:rounded-16 md:p-32 bg-white">

      <div className="flex flex-wrap justify-between">
        <h6 className="text-body2 font-bolder">Discussion</h6>
        {connectionStatus.status === 'Connected' && <div className="bg-green-50 text-green-500 text-body5 font-medium py-4 px-12 rounded-48"> &#8226; <span className="hidden md:inline">Connected to {connectionStatus.connectedRelaysCount} relays</span> 📡</div>}
        {connectionStatus.status === 'Connecting' && <div className="bg-amber-50 text-amber-500 text-body5 font-medium py-4 px-12 rounded-48"> &#8226; <span className="hidden md:inline">Connecting to relays</span> ⌛</div>}
        {connectionStatus.status === 'Not Connected' && <div className="bg-red-50 text-red-500 text-body5 font-medium py-4 px-12 rounded-48"> &#8226; <span className="hidden md:inline">Not connected</span> 📡</div>}
      </div>

      {showTooltip && <div className="bg-gray-900 text-white p-16 rounded-12 my-24 flex items-center justify-between gap-8 md:gap-12">
        <span>💬</span>
        <p className="text-body4 font-medium">Learn about <Link to={createRoute({ type: "story", title: "Comments Powered By Nostr", id: 54 })} className='underline'>how your data is stored</Link> with Nostr comments and relays</p>
        <IconButton className='shrink-0 self-start' onClick={closeTooltip}><AiOutlineClose className='text-gray-600' /></IconButton>
      </div>}

      {<div className="mt-24 relative">
        <div className={!user ? "blur-[2px]" : ""}>
          <AddComment
            placeholder='Leave a comment...'
            onSubmit={content => handleNewComment(content)}
            avatar={user?.avatar ?? 'https://avatars.dicebear.com/api/bottts/Default.svg'}
          />
        </div>
        {!user && <div className="absolute inset-0 bg-gray-400 bg-opacity-50 rounded-12 flex flex-col justify-center items-center">
          <Link
            className='bg-white rounded-12 px-24 py-12'
            to={PAGES_ROUTES.auth.login}
            state={{
              from: location.pathname
            }}
          >Connect with ⚡ to comment</Link>
        </div>}
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
