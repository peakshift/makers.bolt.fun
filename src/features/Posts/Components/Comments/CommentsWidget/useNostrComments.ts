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
import { getMyNostrConnection } from "./nostr-account";

interface HookProps {
  rootEventId?: string;
  onNotice?: (text: string, isErr?: boolean) => void;
  pageUrl?: string;
}

export const useNostrComments = (props: HookProps) => {
  const relayPoolRef = useRef<RelayPool>(null!);
  const [rootEventId, setRootEventId] = useState<string | undefined>(() =>
    getRootEventId()
  );
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
  const [myNostrAccount, setMyNostrAccount] = useState(() =>
    getMyNostrConnection()
  );

  if (!relayPoolRef.current)
    relayPoolRef.current = new RelayPool(CONSTS.DEFAULT_RELAYS);

  const relaysUrls = useMemo(
    () => Array.from(relayPoolRef.current.relayByUrl.keys()),
    []
  );

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

  const publishEvent = useCallback(
    async function publishEventAsync(
      content: string,
      options?: Partial<{ replyTo?: string }>
    ) {
      let tags: string[][] = [];

      tags.push(["e", rootEventId!, "", "root"]);
      if (options?.replyTo) tags.push(["e", options.replyTo!, "", "reply"]);

      let event: NostrToolsEvent = {
        pubkey: publicKey!,
        created_at: Math.round(Date.now() / 1000),
        kind: 1,
        tags,
        content,
      };

      console.log("event: ", event);

      return new Promise(async (resolve, reject) => {
        // if we have a private key that means it was generated locally and we don't have a nip07 extension
        if (privateKey) {
          event.id = getEventHash(event);
          event.sig = signEvent(event, privateKey);
        } else {
          try {
            event = await window.nostr.signEvent(event);
          } catch (err) {
            let reason;
            if (err !== null && typeof err === "object" && "message" in err)
              reason = `window.nostr.signEvent() has returned an error: ${err.message}`;
            else
              reason = `window.nostr.signEvent() has returned an unexpected error`;
            console.log(err);
            reject(reason);
          }
        }

        const publishTimeout = setTimeout(() => {
          setPublishingEvent(false);
          return reject(
            `failed to publish event ${event.id!.slice(0, 5)}… to any relay.`
          );
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
            setPublishingEvent(false);
            setEvents((events) => insertEventIntoDescendingList(events, event));
            return resolve(
              `event ${event.id.slice(0, 5)}… published to ${url}.`
            );
          }
        );
      });
    },
    [privateKey, publicKey, relaysUrls, rootEventId]
  );

  function getRootEventId() {
    return (
      props.rootEventId ??
      (props.pageUrl && normalizeURL(props.pageUrl)) ??
      document.querySelector<HTMLMetaElement>(
        'meta[property="nostr-root-event-id"]'
      )?.content ??
      normalizeURL(window.location.href)
    );
  }

  return {
    publishEvent,
    publicKey,
    metadata,
    threads,
    relaysUrls,
    myNostrAccount,
  };
};
