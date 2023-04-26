import { useState, useEffect, useMemo, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { getEventHash, signEvent as nostrToolsSignEvent } from "nostr-tools";
import { CONSTS } from "src/utils";
import { NostrAccountConnection } from "./components/ConnectNostrAccountModal/ConnectNostrAccountModal";
import { NostrEvent, UnsignedNostrEvent, useRelayPool } from "src/lib/nostr";
import { useGetThreadRootObject } from "./hooks/use-get-thread-root";
import {
  insertEventIntoDescendingList,
  computeThreads,
  normalizeURL,
  ThreadedEvent,
} from "src/lib/nostr/helpers";
import { NostrProfile } from "src/lib/nostr";
import { createRoute } from "src/utils/routing";

export interface Props {
  publicKey?: string;
  rootEventId?: string;
  onNotice?: (text: string, isErr?: boolean) => void;
  story: {
    id?: number;
    nostr_event_id: string | null;
    createdAt: string;
    author_pubkey?: string | null;
  };
}

export const useNostrComments = (props: Props) => {
  const { relayPool } = useRelayPool();

  const [eventsImmediate, setEvents] = useState<NostrEvent[]>([]);
  const [events] = useDebounce(eventsImmediate, 1000);

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

  const publishEvent = useCallback(
    async (
      content: string,
      options?: Partial<{ replyToEvent?: ThreadedEvent }>
    ) => {
      if (!threadRootObject)
        throw new Error("No Root Event Found for this post");
      if (!relayPool) throw new Error("No relays pool");

      const relaysUrls = Array.from(relayPool.relayByUrl.keys());

      let tags: string[][] = [
        ["client", "bolt.fun"],
        ["c", "bolt.fun"],
      ];

      if (threadRootObject.type === "root-event") {
        tags.push(["e", threadRootObject.event_id, "", "root"]);
        if (props.story.id)
          tags.push([
            "r",
            normalizeURL(
              window.location.origin +
                createRoute({ type: "story", id: props.story.id })
            ),
          ]);
      } else tags.push(["r", threadRootObject.url]);

      let pubkeysToInclude = new Set<string>();
      if (props.story.author_pubkey)
        pubkeysToInclude.add(props.story.author_pubkey);

      if (options?.replyToEvent) {
        tags.push(["e", options.replyToEvent.id!, "", "reply"]);

        extractThreadPubkeys(options.replyToEvent).forEach((pubkey) =>
          pubkeysToInclude.add(pubkey)
        );
      }

      // I don't want to include my own pubkey in the p tag list
      pubkeysToInclude.delete(props.publicKey!);

      pubkeysToInclude.forEach((pubkey) => {
        tags.push(["p", pubkey]);
      });

      let baseEvent: UnsignedNostrEvent = {
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
      } as NostrEvent;

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
    [
      props.publicKey,
      props.story.author_pubkey,
      props.story.id,
      relayPool,
      threadRootObject,
    ]
  );

  const publishMetadata = useCallback(
    async function (profile: NostrProfile, options?: Partial<{}>) {
      if (!relayPool) throw new Error("No relays pool");

      const relaysUrls = Array.from(relayPool.relayByUrl.keys());

      let baseEvent: UnsignedNostrEvent = {
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

      const event = await signEvent(baseEvent);

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
    events,
    publishEvent,
    publishMetadata,
    threads,
    relaysUrls: getRelayUrls(),
    loadingRootEvent,
  };
};

async function signEvent(event: UnsignedNostrEvent): Promise<NostrEvent> {
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
      id: getEventHash(event),
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

function extractThreadPubkeys(thread: ThreadedEvent) {
  const pubkeys = [thread.pubkey];
  thread.replies.forEach((reply) => {
    pubkeys.push(...extractThreadPubkeys(reply));
  });
  return pubkeys;
}
