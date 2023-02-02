import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useDebounce } from "use-debounce";
import {
  getEventHash,
  signEvent as nostrToolsSignEvent,
  nip05,
  nip19,
} from "nostr-tools";
import { RelayPool } from "nostr-relaypool";

import {
  normalizeURL,
  insertEventIntoDescendingList,
  computeThreads,
  getName,
  getImage,
} from "./utils";
import { CONSTS } from "src/utils";
import { NostrToolsEvent, NostrToolsEventWithId } from "nostr-relaypool/event";
import { NostrAccountConnection } from "./components/ConnectNostrAccountModal/ConnectNostrAccountModal";

interface HookProps {
  publicKey?: string;
  rootEventId?: string;
  onNotice?: (text: string, isErr?: boolean) => void;
  pageUrl?: string;
}

export type NostrProfile = {
  pubkey: string;
  name: string;
  image: string;
  link: string;
};

export const useNostrComments = (props: HookProps) => {
  const relayPoolRef = useRef<RelayPool>(null!);
  const [rootEventId, setRootEventId] = useState<string | undefined>(() =>
    getRootEventId()
  );
  const [baseEventImmediate, setBaseEvent] = useState(null);
  const [eventsImmediate, setEvents] = useState<NostrToolsEvent[]>([]);
  const [metadata, setMetadata] = useState<Record<string, NostrToolsEvent>>({});
  const baseEventRelay = useRef("");
  const metadataFetching = useRef<Record<string, boolean>>({});
  const [baseEvent] = useDebounce(baseEventImmediate, 1000);
  const [events] = useDebounce(eventsImmediate, 1000);
  const threads = useMemo(() => computeThreads(events), [events]);

  const [myProfile, setMyProfile] = useState<NostrProfile | null>(null);

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

  useEffect(() => {
    if (props.publicKey) fetchMetaDataRef.current([props.publicKey]);
  }, [props.publicKey]);

  useEffect(() => {
    if (props.publicKey)
      setMyProfile({
        pubkey: props.publicKey,
        name: getName(metadata, props.publicKey),
        image:
          getImage(metadata, props.publicKey) ??
          `https://avatars.dicebear.com/api/identicon/${props.publicKey}.svg`,
        link: "nostr:" + nip19.npubEncode(props.publicKey),
      });
  }, [metadata, props.publicKey]);

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

  async function fetchMetadata(pubkeys: readonly string[]) {
    let pubkeysToFetch = Array.from(
      new Set(
        pubkeys.filter((k) => !(k in metadata || k in metadataFetching.current))
      )
    );

    pubkeysToFetch.forEach((k) => (metadataFetching.current[k] = true));

    const relaysUrls = Array.from(relayPoolRef.current.relayByUrl.keys());

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

  const publishEvent = useCallback(
    async function publishEventAsync(
      content: string,
      options?: Partial<{ replyTo?: string }>
    ) {
      let tags: string[][] = [];

      tags.push(["e", rootEventId!, "", "root"]);
      if (options?.replyTo) tags.push(["e", options.replyTo!, "", "reply"]);

      let baseEvent: NostrToolsEvent = {
        pubkey: props.publicKey!,
        created_at: Math.round(Date.now() / 1000),
        kind: 1,
        tags,
        content,
      };

      let event: NostrToolsEventWithId = {
        ...baseEvent,
        id: getEventHash(baseEvent),
      };

      console.log("event: ", event);

      event = await signEvent(event);

      return new Promise(async (resolve, reject) => {
        const publishTimeout = setTimeout(() => {
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
            setEvents((events) => insertEventIntoDescendingList(events, event));
            return resolve(
              `event ${event.id.slice(0, 5)}… published to ${url}.`
            );
          }
        );
      });
    },
    [props.publicKey, relaysUrls, rootEventId]
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
    metadata,
    threads,
    relaysUrls,
    myProfile,
  };
};

async function signEvent(
  event: NostrToolsEventWithId
): Promise<NostrToolsEventWithId> {
  const nostrConnectionStr = localStorage.getItem("nostr-connection");
  if (!nostrConnectionStr)
    throw new Error("You need to connect your nostr account first");

  const nostrConnection = JSON.parse(
    nostrConnectionStr
  ) as NostrAccountConnection;
  if (nostrConnection.type === "nostr-ext")
    return window.nostr.signEvent(event);
  else if (nostrConnection.type === "inputted-keys")
    return {
      ...event,
      sig: nostrToolsSignEvent(event, nostrConnection.prvkey),
    };
  else if (nostrConnection.type === "generated-keys")
    return fetch(CONSTS.apiEndpoint + "/nostr-sign-event", {
      method: "post",
      body: JSON.stringify({ event }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data.event);
  else throw new Error("unknown connection type");
}
