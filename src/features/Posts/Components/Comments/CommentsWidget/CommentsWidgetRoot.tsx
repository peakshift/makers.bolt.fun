import { getProfileDataFromMetaData } from "./utils";
import Thread from "./Thread";
import AddComment from "../AddComment/AddComment";
import { NostrProfile, useNostrComments } from "./useNostrComments";
import ConnectButton from "./components/ConnectButton/ConnectButton";
import { useCallback, useEffect, useState } from "react";
import { NostrAccountConnection } from "./components/ConnectNostrAccountModal/ConnectNostrAccountModal";
import { getMyNostrConnection } from "./nostr-account";
import { CONSTS } from "src/utils";
import RelaysList from "./components/RelaysList/RelaysList";
import { Puff } from "react-loader-spinner";
import { useAppDispatch } from "src/utils/hooks";
import { openModal } from "src/redux/features/modals.slice";
import { useReduxEffect } from "src/utils/hooks/useReduxEffect";
import { createAction } from "@reduxjs/toolkit";
import { FaCog } from "react-icons/fa";
import Preferences from "src/services/preferences.service";
import { Link } from "react-router-dom";
import { createRoute } from "src/utils/routing";
import IconButton from "src/Components/IconButton/IconButton";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  rootEventId?: string;
  story: {
    id: number;
    nostr_event_id: string | null;
    createdAt: string;
  };
}
const UPDATE_PROFILE_ACTION = createAction<{ profile_data: NostrProfile }>(
  "NOSTR_PROFILE_UPDATED"
)({} as any);
const DISCONNECT_PROFILE_ACTION = createAction<{}>(
  "NOSTR_PROFILE_DISCONNECTED"
)({});

export function CommentsWidgetRoot({ story }: Props) {
  const dispatch = useAppDispatch();
  const [myRelays, setMyRelays] = useState(() => getMyRelays());
  const [showRelays, setShowRelays] = useState(false);
  const [myProfile, setMyProfile] = useState<NostrProfile | null>(null);
  const [showLearnAboutNostrTooltip, setShowLearnAboutNostrTooltip] = useState(
    false // Preferences.get("showNostrCommentsTooltip")
  );

  const [publicKey, setPublicKey] = useState(
    () => getMyNostrConnection()?.pubkey
  );

  const {
    threads,
    metadata,
    publishEvent,
    publishMetadata,
    relaysUrls,
    relaysStatus,
    loadingRootEvent,
  } = useNostrComments({
    story,
    publicKey,
    relays: myRelays,
  });

  useEffect(() => {
    localStorage.setItem(
      "nostr-comments-pref-relays",
      JSON.stringify(myRelays)
    );
  }, [myRelays]);

  useEffect(() => {
    if (publicKey)
      setMyProfile(getProfileDataFromMetaData(metadata, publicKey));
  }, [metadata, publicKey]);

  const onUpdateProfile = useCallback(
    ({ payload: { profile_data } }: typeof UPDATE_PROFILE_ACTION) => {
      publishMetadata(profile_data);
    },
    [publishMetadata]
  );

  useReduxEffect(onUpdateProfile, UPDATE_PROFILE_ACTION.type);

  const onDisconnectProfile = useCallback(() => {
    setMyProfile(null);
    setPublicKey(undefined);
    localStorage.removeItem("nostr-connection");
  }, []);

  useReduxEffect(onDisconnectProfile, DISCONNECT_PROFILE_ACTION.type);

  const removeRelay = (urlToRemove: string) => {
    setMyRelays((cur) => cur.filter((url) => url !== urlToRemove));
  };

  const addRelay = (newUrl: string) => {
    if (!myRelays.includes(newUrl)) setMyRelays([...myRelays, newUrl]);
  };

  const closeTooltip = () => {
    Preferences.update("showNostrCommentsTooltip", false);
    setShowLearnAboutNostrTooltip(false);
  };

  const onAccountConnected = useCallback(() => {
    const connection = localStorage.getItem("nostr-connection");
    if (connection) {
      const connectionObj = JSON.parse(connection) as NostrAccountConnection;
      setPublicKey(connectionObj.pubkey);
    }
  }, []);

  const openUpdateProfile = () => {
    dispatch(
      openModal({
        Modal: "UpdateNostrProfileModal",
        props: {
          profile: {
            ...myProfile!,
          },
          updateInfoCallback: {
            type: UPDATE_PROFILE_ACTION.type,
            payload: {} as any,
          },
          disconnectProfileCallback: {
            type: DISCONNECT_PROFILE_ACTION.type,
            payload: {},
          },
        },
      })
    );
  };

  const connectedRelaysCount = relaysStatus.reduce(
    (acc, cur) => (acc += cur[1] === WebSocket.OPEN ? 1 : 0),
    0
  );

  if (loadingRootEvent)
    return (
      <div className="flex flex-col gap-16 items-center justify-center">
        <Puff
          height="80"
          width="80"
          radius={1}
          color="var(--primary)"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <p className="text-gray-600 font-bold text-center">
          Searching for a Nostr Thread for this Story...
          <br />
          This may take a minute
        </p>
      </div>
    );

  return (
    <>
      <div>
        <div className="flex gap-12 flex-wrap justify-between">
          <h6 className="text-body2 font-bolder">Discussion</h6>
          <div className="flex gap-12">
            <button
              className={`bg-gray-200 hover:bg-gray-300 active:bg-gray-300 text-gray-600 text-body5 font-bold py-8 px-12 rounded-12 ${
                !myProfile && "pointer-events-none opacity-60"
              }`}
              onClick={openUpdateProfile}
            >
              <span className="text-gray-400">
                <FaCog />
              </span>{" "}
              <span className="align-middle">Update My Profile</span>
            </button>
            <button
              onClick={() => setShowRelays((v) => !v)}
              className="bg-gray-200 hover:bg-gray-300 active:bg-gray-300 text-gray-600 text-body5 font-bold py-8 px-12 rounded-12"
            >
              📡 {showRelays ? "Hide" : "Show"} Relays ({connectedRelaysCount}/
              {myRelays.length})
            </button>
          </div>
          {/* {connectionStatus.status === 'Connected' && <div className="bg-green-50 text-green-500 text-body5 font-medium py-4 px-12 rounded-48"> &#8226; <span className="hidden md:inline">Connected to {connectionStatus.connectedRelaysCount} relays</span> 📡</div>}
      {connectionStatus.status === 'Connecting' && <div className="bg-amber-50 text-amber-500 text-body5 font-medium py-4 px-12 rounded-48"> &#8226; <span className="hidden md:inline">Connecting to relays</span> ⌛</div>}
      {connectionStatus.status === 'Not Connected' && <div className="bg-red-50 text-red-500 text-body5 font-medium py-4 px-12 rounded-48"> &#8226; <span className="hidden md:inline">Disconnected...</span> <button className='underline font-bold' onClick={() => retryConnection()}>reconnect</button></div>} */}
        </div>

        {showLearnAboutNostrTooltip && (
          <div className="bg-gray-900 text-white p-16 rounded-12 my-24 flex items-center justify-between gap-8 md:gap-12">
            <span>💬</span>
            <p className="text-body4 font-medium">
              Learn about{" "}
              <Link
                to={createRoute({
                  type: "story",
                  title: "Comments Powered By Nostr",
                  id: 54,
                })}
                className="underline"
              >
                how your data is stored
              </Link>{" "}
              with Nostr comments and relays
            </p>
            <IconButton className="shrink-0 self-start" onClick={closeTooltip}>
              <AiOutlineClose className="text-gray-600" />
            </IconButton>
          </div>
        )}

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
