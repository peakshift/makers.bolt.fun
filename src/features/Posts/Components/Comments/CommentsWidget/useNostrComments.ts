import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useDebounce } from "use-debounce";
import {
  getEventHash,
  signEvent as nostrToolsSignEvent,
  nip05,
} from "nostr-tools";
import { CONSTS } from "src/utils";
import { NostrToolsEvent, NostrToolsEventWithId } from "nostr-relaypool/event";
import { NostrAccountConnection } from "./components/ConnectNostrAccountModal/ConnectNostrAccountModal";
import { useRelayPool } from "src/lib/nostr";
import { useGetThreadRootObject } from "./hooks/use-get-thread-root";
import {
  insertEventIntoDescendingList,
  computeThreads,
} from "src/lib/nostr/helpers";
import { NostrProfile } from "src/lib/nostr";

export interface Props {
  publicKey?: string;
  rootEventId?: string;
  onNotice?: (text: string, isErr?: boolean) => void;
  story: {
    id: number;
    nostr_event_id: string | null;
    createdAt: string;
  };
}

export const useNostrComments = (props: Props) => {
  const { relayPool } = useRelayPool();

  const [eventsImmediate, setEvents] = useState<NostrToolsEvent[]>([]);
  const [events] = useDebounce(eventsImmediate, 1000);

  const [metadata, setMetadata] = useState<Record<string, NostrToolsEvent>>({});
  const metadataFetching = useRef<Record<string, boolean>>({});

  const fetchMetaDataRef = useRef<typeof fetchMetadata>(null!);
  fetchMetaDataRef.current = fetchMetadata;

  const threads = useMemo(() => computeThreads(events), [events]);

  const threadRootObject = useGetThreadRootObject({
    relaysPool: relayPool,
    story: { ...props.story },
  });

  const loadingRootEvent = !threadRootObject;

  useEffect(
    function subscribeToEvents() {
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
        },
        undefined, // maxDelayMs
        // onEose:
        (events, relayURL) => {
          // console.log("EOSE");
        }
      );

      relayPool.onerror((relayUrl, err) => {
        console.log("RelayPool error", err, " from relay ", relayUrl);
      });
      relayPool.onnotice((relayUrl, notice) => {
        console.log("RelayPool notice", notice, " from relay ", relayUrl);
      });

      return () => {
        unsub();
      };
    },
    [relayPool, threadRootObject]
  );

  useEffect(() => {
    if (relayPool && events.length > 0)
      fetchMetaDataRef.current(events.map((e) => e.pubkey));
  }, [events, relayPool]);

  useEffect(() => {
    if (relayPool && props.publicKey)
      fetchMetaDataRef.current([props.publicKey]);
  }, [props.publicKey, relayPool]);

  async function fetchMetadata(
    pubkeys: string[],
    options?: { skip_existing_keys?: boolean }
  ) {
    if (!relayPool) throw new Error("Relays Pool not initialized yet");

    const { skip_existing_keys = true } = options ?? {};

    let pubkeysToFetch = skip_existing_keys
      ? Array.from(
          new Set(
            pubkeys.filter(
              (k) => !(k in metadata || k in metadataFetching.current)
            )
          )
        )
      : pubkeys;

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
    async (content: string, options?: Partial<{ replyTo?: string }>) => {
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

      const signedEvent = await signEvent(baseEvent);

      const event = {
        ...signedEvent,
        id: getEventHash(signedEvent),
      } as NostrToolsEventWithId;

      return new Promise(async (resolve, reject) => {
        console.log("publishing...");

        const publishTimeout = setTimeout(() => {
          return reject(
            `failed to publish event ${event.id!.slice(0, 5)}… to any relay.`
          );
        }, 8000);

        relayPool.publish(event, relaysUrls);

        const unsub = relayPool.subscribe(
          [
            {
              ids: [event.id!],
            },
          ],
          relaysUrls,
          (event, afterEose, url) => {
            clearTimeout(publishTimeout);
            setEvents((events) => insertEventIntoDescendingList(events, event));
            unsub();
            return resolve(
              `event ${event.id.slice(0, 5)}… published to ${url}.`
            );
          }
        );
      });
    },
    [props.publicKey, relayPool, threadRootObject]
  );

  const publishMetadata = useCallback(
    async function (profile: NostrProfile, options?: Partial<{}>) {
      if (!relayPool) throw new Error("No relays pool");

      const relaysUrls = Array.from(relayPool.relayByUrl.keys());

      let baseEvent: NostrToolsEvent = {
        pubkey: props.publicKey!,
        created_at: Math.round(Date.now() / 1000),
        kind: 0,
        tags: [],
        content: JSON.stringify({
          name: profile.name,
          picture: profile.image,
          ...(profile.about && { about: profile.about }),
          ...(profile.nip05 && { nip05: profile.nip05 }),
          ...(profile.lightning_address && {
            lud06: profile.lightning_address,
          }),
        }),
      };

      const signedEvent = await signEvent(baseEvent);

      const event = {
        ...signedEvent,
        id: getEventHash(signedEvent),
      } as NostrToolsEventWithId;

      let called_refetch_metadata = false;

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
            if (!called_refetch_metadata) {
              fetchMetaDataRef.current([profile.pubkey], {
                skip_existing_keys: false,
              });
              called_refetch_metadata = true;
            }
            return resolve(
              `event ${event.id.slice(0, 5)}… published to ${url}.`
            );
          }
        );
      });
    },
    [props.publicKey, relayPool]
  );

  const getRelayUrls = useCallback(
    () => Array.from(relayPool?.relayByUrl.keys() ?? []),
    [relayPool?.relayByUrl]
  );

  return {
    publishEvent,
    publishMetadata,
    metadata,
    threads,
    relaysUrls: getRelayUrls(),
    loadingRootEvent,
  };
};

async function signEvent(event: NostrToolsEvent): Promise<NostrToolsEvent> {
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
