import { normalizeURL } from "./utils";
import Thread from "./Thread";
import AddComment from "../AddComment/AddComment";
import { useNostrComments } from "./useNostrComments";
import ConnectButton from "./components/ConnectButton/ConnectButton";
import { useCallback, useEffect, useState } from "react";
import { NostrAccountConnection } from "./components/ConnectNostrAccountModal/ConnectNostrAccountModal";
import { getMyNostrConnection } from "./nostr-account";
import { CONSTS } from "src/utils";
import RelaysList from "./components/RelaysList/RelaysList";

interface Props {
  rootEventId?: string;
  url?: string;
}

export function CommentsWidgetRoot({
  rootEventId,
  url = normalizeURL(window.location.href),
}: Props) {
  const [myRelays, setMyRelays] = useState(() => getMyRelays());
  const [showRelays, setShowRelays] = useState(false);

  const [publicKey, setPublicKey] = useState(
    () => getMyNostrConnection()?.pubkey
  );

  const {
    threads,
    metadata,
    publishEvent,
    relaysUrls,
    myProfile,
    relaysStatus,
  } = useNostrComments({
    rootEventId,
    pageUrl: url,
    publicKey,
    relays: myRelays,
  });

  const removeRelay = (urlToRemove: string) => {
    setMyRelays((cur) => cur.filter((url) => url !== urlToRemove));
  };

  const addRelay = (newUrl: string) => {
    if (!myRelays.includes(newUrl)) setMyRelays([...myRelays, newUrl]);
  };

  useEffect(() => {
    console.log("SAVING TO LOCALSTORAGE");

    localStorage.setItem(
      "nostr-comments-pref-relays",
      JSON.stringify(myRelays)
    );
  }, [myRelays]);

  const onAccountConnected = useCallback(() => {
    const connection = localStorage.getItem("nostr-connection");
    if (connection) {
      const connectionObj = JSON.parse(connection) as NostrAccountConnection;
      setPublicKey(connectionObj.pubkey);
    }
  }, []);

  const connectedRelaysCount = relaysStatus.reduce(
    (acc, cur) => (acc += cur[1] === WebSocket.OPEN ? 1 : 0),
    0
  );

  return (
    <>
      <div>
        <div className="flex flex-wrap justify-between">
          <h6 className="text-body2 font-bolder">Discussion</h6>
          <button
            onClick={() => setShowRelays((v) => !v)}
            className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-600 text-body5 font-medium py-8 px-12 rounded-48"
          >
            📡 {showRelays ? "Hide" : "Show"} Relays ({connectedRelaysCount}/
            {myRelays.length})
          </button>
          {/* {connectionStatus.status === 'Connected' && <div className="bg-green-50 text-green-500 text-body5 font-medium py-4 px-12 rounded-48"> &#8226; <span className="hidden md:inline">Connected to {connectionStatus.connectedRelaysCount} relays</span> 📡</div>}
      {connectionStatus.status === 'Connecting' && <div className="bg-amber-50 text-amber-500 text-body5 font-medium py-4 px-12 rounded-48"> &#8226; <span className="hidden md:inline">Connecting to relays</span> ⌛</div>}
      {connectionStatus.status === 'Not Connected' && <div className="bg-red-50 text-red-500 text-body5 font-medium py-4 px-12 rounded-48"> &#8226; <span className="hidden md:inline">Disconnected...</span> <button className='underline font-bold' onClick={() => retryConnection()}>reconnect</button></div>} */}
        </div>

        {/* {showTooltip && <div className="bg-gray-900 text-white p-16 rounded-12 my-24 flex items-center justify-between gap-8 md:gap-12">
      <span>💬</span>
      <p className="text-body4 font-medium">Learn about <Link to={createRoute({ type: "story", title: "Comments Powered By Nostr", id: 54 })} className='underline'>how your data is stored</Link> with Nostr comments and relays</p>
      <IconButton className='shrink-0 self-start' onClick={closeTooltip}><AiOutlineClose className='text-gray-600' /></IconButton>
    </div>} */}

        {showRelays && (
          <div className="mt-16">
            <RelaysList
              onAddNewRelay={addRelay}
              onRemoveRelay={removeRelay}
              relays={relaysStatus.filter((relay) =>
                myRelays.includes(relay[0])
              )}
            />
          </div>
        )}
        {
          <div className="mt-24 relative">
            <div className={!true ? "blur-[2px]" : ""}>
              <AddComment
                //   isDisconnected={connectionStatus.status !== 'Connected'}
                placeholder="Leave a comment..."
                onSubmit={publishEvent}
                avatar={myProfile?.image}
                userUrl={myProfile?.link}
              />
            </div>
            {!publicKey && (
              <div className="absolute inset-0 bg-gray-400 bg-opacity-50 rounded-12 flex flex-col justify-center items-center">
                <ConnectButton onAccountConnected={onAccountConnected} />
              </div>
            )}
          </div>
        }
        <div className="flex flex-col gap-16 mt-32">
          {threads.map((thread) => (
            <Thread
              myProfile={myProfile}
              key={thread.id}
              thread={thread}
              metadata={metadata}
              relays={relaysUrls}
              publishEvent={publishEvent}
            />
          ))}
          {/* {commentsTree.map((comment) => (
            <CommentRoot
              key={comment.id}
              comment={comment}
              isRoot
              canReply={!!user}
              onReply={(content) =>
                handleNewComment(content, comment.nostr_id.toString())
              }
            />
          ))} */}
        </div>
      </div>
    </>
  );
}

function getMyRelays() {
  const preferedRelays = localStorage.getItem("nostr-comments-pref-relays");
  if (preferedRelays) return JSON.parse(preferedRelays) as string[];
  return CONSTS.DEFAULT_RELAYS;
}
