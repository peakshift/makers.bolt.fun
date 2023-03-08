import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import CommentCard from "../CommentCard/CommentCard";
import { useToggle } from "@react-hookz/web";
import AddComment from "../AddComment/AddComment";
import { useNostrComments } from "./useNostrComments";
import {
  getProfileDataFromMetaData,
  ThreadedEvent,
} from "src/lib/nostr/helpers";
import { NostrProfile } from "src/lib/nostr";
import { useMediaQuery } from "src/utils/hooks";
import { MEDIA_QUERIES } from "src/utils/theme";

dayjs.extend(relativeTime);

interface Props {
  thread: ThreadedEvent;
  replyTo?: string;
  onClickedReply?: () => void;
  publishEvent?: ReturnType<typeof useNostrComments>["publishEvent"];
  relays: string[];
  profilesData: Record<string, NostrProfile>;
  myProfile: NostrProfile | null;
  currentDepth?: number;
}

const MAX_REPLIES_DEPTH = 3;

export default function Thread({
  thread,
  profilesData,
  relays,
  onClickedReply,
  publishEvent,
  replyTo,
  myProfile,
  currentDepth = 0,
}: Props) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [repliesCollapsed, toggleRepliesCollapsed] = useToggle(false);
  const [scrollToLatestReply, setScrollToLatestReply] = useState(false);
  const repliesContainer = useRef<HTMLDivElement>(null!);

  const isSmallScreen = useMediaQuery(MEDIA_QUERIES.isMaxSmall);

  useEffect(() => {
    if (repliesCollapsed) setReplyOpen(false);
  }, [repliesCollapsed]);

  useEffect(() => {
    if (scrollToLatestReply) {
      repliesContainer.current
        ?.querySelector(`:scope > div:nth-child(${thread.replies.length})`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      setScrollToLatestReply(false);
    }
  }, [thread.replies.length, scrollToLatestReply]);

  const isRoot = !replyTo;
  // const canReply = !!isRoot;
  const canReply = !!myProfile;

  const clickReply = () => {
    if (isRoot) setReplyOpen(true);
    else onClickedReply?.();
  };

  const handleReply = async (text: string) => {
    try {
      await publishEvent?.(text, { replyTo: thread.id });
      toggleRepliesCollapsed(false);
      setReplyOpen(false);
      setScrollToLatestReply(true);
      return true;
    } catch (error) {
      return false;
    }
  };

  const repliesSorted = [...thread.replies].reverse();

  return (
    <div>
      <CommentCard
        canReply={canReply}
        comment={thread}
        onReply={clickReply}
        author={profilesData[thread.pubkey]}
      />
      {(thread.replies.length > 0 || replyOpen) && (
        <div className="flex mt-16 gap-8 ">
          {(!isSmallScreen || currentDepth < MAX_REPLIES_DEPTH) && (
            <div className="ml-8 border-l-2 border-b-2 border-gray-200 w-16 md:w-24 h-40 rounded-bl-8 flex-shrink-0"></div>
          )}
          <div className="flex flex-col w-full gap-16">
            {/* {thread.replies.length > 0 && (
              <Button
                color="none"
                className="self-start mt-12 !px-0"
                onClick={() => toggleRepliesCollapsed()}
              >
                {repliesCollapsed ? (
                  <span className="text-gray-600">
                    <span className="align-middle">
                      Show {thread.replies.length} replies
                    </span>{" "}
                    <FaChevronDown className="ml-12" />
                  </span>
                ) : (
                  <span className="text-gray-600">
                    <span className="align-middle">Hide replies</span>{" "}
                    <FaChevronUp className="ml-12" />{" "}
                  </span>
                )}
              </Button>
            )} */}
            <div className="flex flex-col gap-16 w-full" ref={repliesContainer}>
              {!repliesCollapsed &&
                repliesSorted.map((subthread) => (
                  <Thread
                    currentDepth={currentDepth + 1}
                    key={subthread.id}
                    thread={subthread}
                    profilesData={profilesData}
                    relays={relays}
                    onClickedReply={clickReply}
                    replyTo={thread.id}
                    publishEvent={publishEvent}
                    myProfile={myProfile}
                  />
                ))}
              {replyOpen && (
                <AddComment
                  avatar={myProfile?.image}
                  autoFocus
                  placeholder="Leave a reply..."
                  onSubmit={handleReply}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
