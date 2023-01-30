import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useDebounce } from "use-debounce";
import {
  generatePrivateKey,
  getPublicKey,
  relayInit,
  getEventHash,
  signEvent,
  nip05,
} from "nostr-tools";
import { RelayPool } from "nostr-relaypool";

import {
  normalizeURL,
  insertEventIntoDescendingList,
  getName,
  computeThreads,
} from "./utils";
// import {
//   Container,
//   InputSection,
//   InputSectionRow2,
//   InfoButton,
//   PostButton,
//   Notice,
//   SvgInfo,
//   Textarea,
//   Info,
// } from "./components";
import Thread from "./Thread";
import { CONSTS } from "src/utils";
import { NostrToolsEvent } from "nostr-relaypool/event";
import AddComment from "../AddComment/AddComment";
import Card from "src/Components/Card/Card";
import InfoCard from "src/Components/InfoCard/InfoCard";
import { NotificationsService } from "src/services";

interface Props {
  rootEventId?: string;
  url?: string;
}

function getPool() {
  alert("NEW POOL");
  return new RelayPool(CONSTS.DEFAULT_RELAYS);
}

export function CommentsWidgetRoot({
  rootEventId: rootEventIdProp,
  url = normalizeURL(window.location.href),
}: Props) {
  const relayPoolRef = useRef<RelayPool>(null!);
  const [rootEventId, setRootEventId] =
    useState<string | undefined>(rootEventIdProp);
  const [baseEventImmediate, setBaseEvent] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState<string>();
  const [publicKey, setPublicKey] = useState<string>();
  const [eventsImmediate, setEvents] = useState<NostrToolsEvent[]>([]);
  const [publishingEvent, setPublishingEvent] = useState(false);
  const [metadata, setMetadata] = useState<Record<string, NostrToolsEvent>>({});
  const baseEventRelay = useRef("");
  const metadataFetching = useRef<Record<string, boolean>>({});
  const [baseEvent] = useDebounce(baseEventImmediate, 1000);
  const [events] = useDebounce(eventsImmediate, 1000);
  const threads = useMemo(() => computeThreads(events), [events]);

  if (!relayPoolRef.current)
    relayPoolRef.current = new RelayPool(CONSTS.DEFAULT_RELAYS);

  const relaysUrls = Array.from(relayPoolRef.current.relayByUrl.keys());

  const fetchMetaDataRef = useRef<typeof fetchMetadata>(null!);
  fetchMetaDataRef.current = fetchMetadata;

  useEffect(() => {
    const relayPool = relayPoolRef.current;
    const relaysUrls = Array.from(relayPool.relayByUrl.keys());

    if (!rootEventId) return;

    let unsub = relayPool.subscribe(
      [
        {
          kinds: [1],
          "#e": [rootEventId],
        },
      ],
      relaysUrls,
      // onEvent:
      (event, isAfterEose, relayURL) => {
        setEvents((events) => insertEventIntoDescendingList(events, event));
        // fetchMetaDataRef.current(event.pubkey);
        // console.log(event, isAfterEose, relayURL);
      },
      undefined, // maxDelayMs
      // onEose:
      (events, relayURL) => {
        // console.log("EOSE");
        // console.log(events, relayURL);
      }
    );

    relayPool.onerror((err, relayUrl) => {
      console.log("RelayPool error", err, " from relay ", relayUrl);
    });
    relayPool.onnotice((relayUrl, notice) => {
      console.log("RelayPool notice", notice, " from relay ", relayUrl);
    });

    return unsub;
  }, [rootEventId]);

  useEffect(() => {
    fetchMetaDataRef.current(events.map((e) => e.pubkey));
  }, [events]);

  // Try to fetch root-event id if not provided

  //   useEffect(() => {
  //     connections.current.forEach(async (conn) => {
  //       await conn.connect();

  //       const sub = conn.sub([
  //         {
  //           "#r": [url],
  //           kinds: [1],
  //         },
  //       ]);
  //       sub.on("event", (event) => {
  //         if (
  //           !baseEventImmediate ||
  //           baseEventImmediate.created_at < event.created_at
  //         ) {
  //           setBaseEvent(event);
  //           baseEventRelay.current = conn.url;
  //         }
  //       });
  //       sub.on("eose", () => {
  //         sub.unsub();
  //       });
  //     });
  //   }, []);

  let selfName = publicKey && getName(metadata, publicKey);

  return (
    <>
      <Card onlyMd>
        <div className="flex flex-wrap justify-between">
          <h6 className="text-body2 font-bolder">Discussion</h6>
          {/* {connectionStatus.status === 'Connected' && <div className="bg-green-50 text-green-500 text-body5 font-medium py-4 px-12 rounded-48"> &#8226; <span className="hidden md:inline">Connected to {connectionStatus.connectedRelaysCount} relays</span> 📡</div>}
      {connectionStatus.status === 'Connecting' && <div className="bg-amber-50 text-amber-500 text-body5 font-medium py-4 px-12 rounded-48"> &#8226; <span className="hidden md:inline">Connecting to relays</span> ⌛</div>}
      {connectionStatus.status === 'Not Connected' && <div className="bg-red-50 text-red-500 text-body5 font-medium py-4 px-12 rounded-48"> &#8226; <span className="hidden md:inline">Disconnected...</span> <button className='underline font-bold' onClick={() => retryConnection()}>reconnect</button></div>} */}
        </div>

        {/* {showTooltip && <div className="bg-gray-900 text-white p-16 rounded-12 my-24 flex items-center justify-between gap-8 md:gap-12">
      <span>💬</span>
      <p className="text-body4 font-medium">Learn about <Link to={createRoute({ type: "story", title: "Comments Powered By Nostr", id: 54 })} className='underline'>how your data is stored</Link> with Nostr comments and relays</p>
      <IconButton className='shrink-0 self-start' onClick={closeTooltip}><AiOutlineClose className='text-gray-600' /></IconButton>
    </div>} */}

        {
          <div className="mt-24 relative">
            <div className={!true ? "blur-[2px]" : ""}>
              <AddComment
                isPublishing={publishingEvent}
                //   isDisconnected={connectionStatus.status !== 'Connected'}
                placeholder="Leave a comment..."
                onSubmit={publishEvent}
                avatar={"https://avatars.dicebear.com/api/bottts/Default.svg"}
              />
            </div>
            {/* {!user && <div className="absolute inset-0 bg-gray-400 bg-opacity-50 rounded-12 flex flex-col justify-center items-center">
        <Link
          className='bg-white rounded-12 px-24 py-12'
          to={PAGES_ROUTES.auth.login}
          state={{
            from: location.pathname
          }}
        >Connect with ⚡ to comment</Link>
      </div>} */}
          </div>
        }

        <div className="flex flex-col gap-16 mt-32">
          {threads.map((thread) => (
            <Thread
              key={thread.id}
              thread={thread}
              metadata={metadata}
              relays={relaysUrls}
              canReply
              isRoot
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
      </Card>
    </>
  );

  async function establishNostrKey() {
    // check if they have a nip07 nostr extension
    if (window.nostr) {
      try {
        // and if it has a key stored on it
        setPublicKey(await window.nostr.getPublicKey());
      } catch (err) {}
    } else {
      // otherwise use a key from localStorage or generate a new one
      let privateKey = localStorage.getItem("nostrkey");
      if (!privateKey || privateKey.match(/^[a-f0-9]{64}$/)) {
        privateKey = generatePrivateKey();
        localStorage.setItem("nostrkey", privateKey);
      }
      setPrivateKey(privateKey);
      setPublicKey(getPublicKey(privateKey));
    }
  }

  async function fetchMetadata(pubkeys: readonly string[]) {
    let pubkeysToFetch = Array.from(
      new Set(
        pubkeys.filter((k) => !(k in metadata || k in metadataFetching.current))
      )
    );

    pubkeysToFetch.forEach((k) => (metadataFetching.current[k] = true));

    const relaysUrls = Array.from(relayPoolRef.current.relayByUrl.keys());

    relayPoolRef.current.getRelayStatuses();

    const unsub = relayPoolRef.current.subscribe(
      [{ kinds: [0], authors: pubkeysToFetch }],
      relaysUrls,
      (event) => {
        try {
          if (
            !metadata[event.pubkey] ||
            metadata[event.pubkey].created_at < event.created_at
          ) {
            const metaData = {
              ...JSON.parse(event.content),
              created_at: event.created_at,
            };
            setMetadata((curr) => ({
              ...curr,
              [event.pubkey]: metaData,
            }));
            fetchNIP05(event.pubkey, metaData);
          }
        } catch (err) {
          /***/
        }
      }
    );

    setTimeout(() => unsub(), 20000);
  }

  async function fetchNIP05(pubkey: string, meta: any) {
    if (meta && meta.nip05)
      nip05
        .queryProfile(meta.nip05)
        .then((name) => {
          if (name === meta.nip05) {
            setMetadata((curr) => ({
              ...curr,
              [pubkey]: { ...meta, nip05verified: true },
            }));
          }
        })
        .catch((err) => {
          console.log("Error while quering nip5 profile");
          console.log(err);
        });
  }

  async function handleSettingsClick() {
    setIsInfoOpen(!isInfoOpen);
  }

  async function publishEvent(
    content: string,
    onSetteledCb?: (success: boolean) => void
  ) {
    setPublishingEvent(true);

    let event: NostrToolsEvent = {
      pubkey: publicKey!,
      created_at: Math.round(Date.now() / 1000),
      kind: 1,
      tags: [["e", rootEventId!, "", "root"]],
      content,
    };

    console.log("event: ", event);

    // if we have a private key that means it was generated locally and we don't have a nip07 extension
    if (privateKey) {
      event.id = getEventHash(event);
      event.sig = signEvent(event, privateKey);
    } else {
      try {
        event = await window.nostr.signEvent(event);
      } catch (err) {
        if (err !== null && typeof err === "object" && "message" in err)
          showNotice(
            `window.nostr.signEvent() has returned an error: ${err.message}`
          );
        else {
          console.log(err);
          showNotice(
            `window.nostr.signEvent() has returned an unexpected error`
          );
        }
        setPublishingEvent(false);
        onSetteledCb?.(false);
        return;
      }
    }

    const publishTimeout = setTimeout(() => {
      showNotice(
        `failed to publish event ${event.id!.slice(0, 5)}… to any relay.`
      );
      setPublishingEvent(false);
      onSetteledCb?.(false);
    }, 8000);

    console.log("publishing...");

    relayPoolRef.current.publish(event, relaysUrls);
    relayPoolRef.current.subscribe(
      [
        {
          ids: [event.id!],
        },
      ],
      relaysUrls,
      (event, afterEose, url) => {
        clearTimeout(publishTimeout);
        showNotice(`event ${event.id.slice(0, 5)}… published to ${url}.`);
        setPublishingEvent(false);
        onSetteledCb?.(true);
        setEvents((events) => insertEventIntoDescendingList(events, event));
      }
    );
  }

  function showNotice(text: string) {
    NotificationsService.info(text);
  }
}
