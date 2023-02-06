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
import { createRoute } from "src/utils/routing";
import dayjs from "dayjs";

interface HookProps {
  publicKey?: string;
  rootEventId?: string;
  onNotice?: (text: string, isErr?: boolean) => void;
  relays: string[];
  story: {
    id: number;
    nostr_event_id: string | null;
    createdAt: string;
  };
}

export type NostrProfile = {
  pubkey: string;
  name: string;
  image: string;
  link: string;
};

export const useNostrComments = (props: HookProps) => {
  const [eventsImmediate, setEvents] = useState<NostrToolsEvent[]>([]);
  const [metadata, setMetadata] = useState<Record<string, NostrToolsEvent>>({});
  const metadataFetching = useRef<Record<string, boolean>>({});
  const [events] = useDebounce(eventsImmediate, 1000);
  const threads = useMemo(() => computeThreads(events), [events]);
  const [myProfile, setMyProfile] = useState<NostrProfile | null>(null);

  const { relayPool, relaysStatus } = useRelayPool({ relays: props.relays });

  const threadRootObject = useGetThreadRootObject({
    relaysPool: relayPool,
    story: { ...props.story },
  });

  const loadingRootEvent = !threadRootObject;

  const fetchMetaDataRef = useRef<typeof fetchMetadata>(null!);
  fetchMetaDataRef.current = fetchMetadata;

  useEffect(() => {
    if (!threadRootObject) return;
    if (!relayPool) return;

    const relaysUrls = Array.from(relayPool.relayByUrl.keys());

    const filter =
      threadRootObject.type === "root-event"
        ? { "#e": [threadRootObject.event_id] }
        : { "#r": [threadRootObject.url] };

    let unsub = relayPool.subscribe(
      [
        {
          kinds: [1],
          ...(filter as any),
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

    relayPool.onerror((relayUrl, err) => {
      console.log("RelayPool error", err, " from relay ", relayUrl);
    });
    relayPool.onnotice((relayUrl, notice) => {
      console.log("RelayPool notice", notice, " from relay ", relayUrl);
    });

    return unsub;
  }, [relayPool, threadRootObject]);

  useEffect(() => {
    if (relayPool && events.length > 0)
      fetchMetaDataRef.current(events.map((e) => e.pubkey));
  }, [events, relayPool]);

  useEffect(() => {
    if (relayPool && props.publicKey)
      fetchMetaDataRef.current([props.publicKey]);
  }, [props.publicKey, relayPool]);

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

  async function fetchMetadata(pubkeys: readonly string[]) {
    if (!relayPool) throw new Error("Relays Pool not initialized yet");

    let pubkeysToFetch = Array.from(
      new Set(
        pubkeys.filter((k) => !(k in metadata || k in metadataFetching.current))
      )
    );

    pubkeysToFetch.forEach((k) => (metadataFetching.current[k] = true));

    const relaysUrls = Array.from(relayPool.relayByUrl.keys());

    const unsub = relayPool.subscribe(
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
      if (!threadRootObject)
        throw new Error("No Root Event Found for this post");
      if (!relayPool) throw new Error("No relays pool");

      const relaysUrls = Array.from(relayPool.relayByUrl.keys());

      let tags: string[][] = [];

      threadRootObject.type === "root-event"
        ? tags.push(["e", threadRootObject.event_id, "", "root"])
        : tags.push(["r", threadRootObject.url]);

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

        relayPool.publish(event, relaysUrls);
        relayPool.subscribe(
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
    [props.publicKey, relayPool, threadRootObject]
  );

  const getRelayUrls = useCallback(
    () => Array.from(relayPool?.relayByUrl.keys() ?? []),
    [relayPool?.relayByUrl]
  );

  return {
    publishEvent,
    metadata,
    threads,
    relaysStatus,
    relaysUrls: getRelayUrls(),
    myProfile,
    loadingRootEvent,
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

const useGetThreadRootObject = (props: {
  relaysPool: RelayPool | null;
  story: HookProps["story"];
}) => {
  type Result =
    | {
        type: "root-event";
        event_id: string;
      }
    | {
        type: "url-fallback";
        url: string;
      };

  const [threadRootObject, setThreadRootObject] = useState<Result | null>(null);

  const [baseEventImmediate, setBaseEvent] =
    useState<NostrToolsEventWithId | null>(null);
  const [baseEvent] = useDebounce(baseEventImmediate, 1000);

  useEffect(() => {
    if (props.story.nostr_event_id) {
      setThreadRootObject({
        type: "root-event",
        event_id: props.story.nostr_event_id,
      });
      return;
    }
  }, [props.story.nostr_event_id]);

  useEffect(() => {
    if (!props.relaysPool) return;

    const relaysUrls = Array.from(props.relaysPool.relayByUrl.keys());
    if (props.story.nostr_event_id) return;

    const isStoryOlderThanOneDay =
      dayjs(Date.now()).diff(props.story.createdAt, "hours") >= 24;

    const fallbackObject = {
      type: "url-fallback",
      url: normalizeURL(
        window.location.origin +
          createRoute({ type: "story", id: props.story.id })
      ),
    } as const;

    if (isStoryOlderThanOneDay) {
      return setThreadRootObject(fallbackObject);
    }

    const unsub = props.relaysPool.subscribe(
      [
        {
          kinds: [1],
          "#r": [
            normalizeURL(
              window.location.origin +
                createRoute({ type: "story", id: props.story.id })
            ),
          ],
        },
      ],
      relaysUrls,
      (event, afterEose, url) => {
        setBaseEvent((curr) => {
          if (!curr || curr.created_at < event.created_at) return event;
          return curr;
        });
      }
    );

    const timeout = setTimeout(() => {
      unsub();
      // If the root object wasn't set yet, then use the fallback
      setThreadRootObject((rootObj) => (!!rootObj ? rootObj : fallbackObject));
    }, 0);

    return () => {
      clearTimeout(timeout);
      unsub();
    };
  }, [
    props.relaysPool,
    props.story.createdAt,
    props.story.id,
    props.story.nostr_event_id,
  ]);

  useEffect(() => {
    if (baseEvent)
      setThreadRootObject({ type: "root-event", event_id: baseEvent.id });
  }, [baseEvent]);

  return threadRootObject;
};

const useRelayPool = ({ relays }: { relays: string[] }) => {
  const [relayPool, setRelayPool] = useState<RelayPool | null>(null);
  const [relaysStatus, setRelaysStatus] = useState<[string, number][]>([]);

  useEffect(() => {
    const pool = new RelayPool(relays);
    setRelayPool(pool);
    return () => {
      pool.close();
    };
  }, [relays]);

  useEffect(() => {
    if (relayPool)
      relays.forEach((relayUrl) => {
        relayPool.addOrGetRelay(relayUrl);
      });
  }, [relayPool, relays]);

  useEffect(() => {
    if (!relayPool) return;
    // First, close all the relays that are in the pool but not in the props anymore
    const allCurrentRelays = Array.from(relayPool.relayByUrl.keys());
    for (const relay of allCurrentRelays) {
      if (!relays.includes(relay)) {
        relayPool.relayByUrl.get(relay)?.close().catch();
      }
    }

    relays.forEach((relayUrl) => {
      relayPool.addOrGetRelay(relayUrl).connect();
    });
  }, [relayPool, relays]);

  useEffect(() => {
    if (!relayPool) return;

    const updateStatus = () => {
      setRelaysStatus(relayPool.getRelayStatuses());
    };

    const interval = setInterval(updateStatus, 5000);
    updateStatus();

    return () => clearInterval(interval);
  }, [relayPool]);

  return {
    relayPool,
    relaysStatus,
  };
};
