// @ts-nocheck

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { relayPool } from "nostr-tools";
import { Nullable } from "remirror";
import { CONSTS } from "src/utils";
import { Comment } from "../types";
import { useDebouncedState } from "@react-hookz/web";
import { Post_Type } from "src/graphql";

let pool = relayPool();

const useComments = (config: { type: Post_Type; id: string | number }) => {
  const commentsEventsTemp = useRef<Record<string, Required<NostrEvent>>>({});
  const [commentsEvents, setCommentsEvents] = useDebouncedState<
    Record<string, Required<NostrEvent>>
  >({}, 1000);
  const pendingResolvers = useRef<Record<string, () => void>>({});
  const subscription = useRef<{ unsub: Function } | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    status: "Connecting",
    connectedRelaysCount: 0,
  });
  const filter = useMemo(
    () =>
      `boltfun ${config.type}_comment ${config.id}` +
      (process.env.NODE_ENV === "development" ? " dev" : ""),
    [config.id, config.type]
  );
  const [commentsTree, setCommentsTree] = useState<Comment[]>([]);

  const connectToPool = useCallback(() => {
    if (subscription.current !== null) subscription.current.unsub();
    connect();
    let sub = pool.sub({
      filter: {
        "#r": [filter],
      },
      cb: async (event: Required<NostrEvent>) => {
        //Got a new event
        if (!event.id) return;

        if (event.id in commentsEventsTemp.current) return;

        commentsEventsTemp.current[event.id] = event;

        setCommentsEvents({ ...commentsEventsTemp.current });
      },
    });
    subscription.current = sub;
  }, [filter, setCommentsEvents]);

  useEffect(() => {
    connectToPool();

    return () => {
      subscription.current?.unsub();
    };
  }, [connectToPool]);

  useEffect(() => {
    (async () => {
      const newTree = await buildTree(commentsEvents);
      setCommentsTree(newTree);
      Object.entries(pendingResolvers.current).forEach(([id, resolve]) => {
        if (id in commentsEvents) {
          delete pendingResolvers.current[id];
          resolve();
        }
      });
    })();
  }, [commentsEvents]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newStatus = getConnectionStatus();
      if (
        newStatus.connectedRelaysCount !==
          connectionStatus.connectedRelaysCount ||
        newStatus.status !== connectionStatus.status
      )
        setConnectionStatus(newStatus);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [connectionStatus.connectedRelaysCount, connectionStatus.status]);

  const postComment = useCallback(
    async ({ content, parentId }: { content: string; parentId?: string }) => {
      const tags = [];
      tags.push(["r", filter]);
      if (parentId)
        tags.push(["e", `${parentId} ${CONSTS.DEFAULT_RELAYS[0]} reply`]);

      let event: NostrEvent;
      try {
        event = (await signEvent({
          kind: 1,
          tags,
          content,
        })) as NostrEvent;
      } catch (error) {
        alert("Couldn't sign the object successfully...");
        return;
      }

      return new Promise<void>((resolve, reject) => {
        let confirmationSent = false;

        pool.publish(event, (status: number, relay: string) => {
          switch (status) {
            case -1:
              console.log(
                `failed to send ${JSON.stringify(event)} to ${relay}`
              );
              break;
            case 1:
              clearTimeout(publishTimeout);
              console.log(
                `event ${event.id?.slice(0, 5)}… published to ${relay}.`
              );
              if (!confirmationSent) {
                confirmPublishingEvent(event);
                confirmationSent = true;
              }
              break;
          }
        });

        pendingResolvers.current[event.id!] = resolve;

        const publishTimeout = setTimeout(() => {
          delete pendingResolvers.current[event.id!];
          reject("Failed to publish to any relay...");
        }, 5000);
      });
    },
    [filter]
  );

  return {
    commentsTree,
    postComment,
    retryConnection: connectToPool,
    connectionStatus,
  };
};

export default useComments;

function connect() {
  pool = relayPool();
  CONSTS.DEFAULT_RELAYS.forEach((url) => {
    pool.addRelay(url, { read: true, write: true });
  });
  pool.onNotice((notice: string, relay: any) => {
    console.log(`${relay.url} says: ${notice}`);
  });
}

function extractParentId(event: NostrEvent): Nullable<string> {
  for (const [identifier, value] of event.tags) {
    if (identifier === "e") {
      const [eventId, , marker] = value.split(" ");
      if (marker === "reply") return eventId;
    }
  }
  return null;
}

async function signEvent(event: any) {
  const res = await fetch(CONSTS.apiEndpoint + "/nostr-sign-event", {
    method: "post",
    body: JSON.stringify({ event }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.event;
}

async function confirmPublishingEvent(event: any) {
  await fetch(CONSTS.apiEndpoint + "/nostr-confirm-event", {
    method: "post",
    body: JSON.stringify({ event }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getCommentsExtraData(ids: string[]) {
  const res = await fetch(CONSTS.apiEndpoint + "/nostr-events-extra-data", {
    method: "post",
    body: JSON.stringify({ ids }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  type EventExtraData = {
    id: number;
    nostr_id: string;
    votes_count: number;
    user: {
      id: number;
      avatar: string;
      name: string;
    };
  };

  const data = (await res.json()) as EventExtraData[];

  const map = new Map<string, EventExtraData>();
  data.forEach((item) => {
    map.set(item.nostr_id, item);
  });
  return map;
}

async function buildTree(events: Record<string, Required<NostrEvent>>) {
  // Sort them chronologically from oldest to newest
  let sortedEvenets = Object.values(events).sort(
    (a, b) => a.created_at - b.created_at
  );

  // Extract the pubkeys used
  const pubkeysSet = new Set<string>();
  sortedEvenets.forEach((e) => pubkeysSet.add(e.pubkey));

  // TODO: Make sure that confirmation to the backend has been finished before requesting new extra data, otherwise, the extra data for the new comment might not be available

  // Make a request to api to get comments extra data
  const commentsExtraData = await getCommentsExtraData(Object.keys(events));

  let eventsTree: Record<string, Comment> = {};
  // If event is a reply, connect it to parent
  sortedEvenets.forEach((e) => {
    const parentId = extractParentId(e);
    const extraData = commentsExtraData.get(e.id);

    // if no extra data is here then that means this event wasn't done from our platform
    if (!extraData) return;

    if (parentId) {
      eventsTree[parentId]?.replies.push({
        id: extraData.id,
        nostr_id: e.id,
        body: e.content,
        created_at: e.created_at * 1000,
        pubkey: e.pubkey,
        author: extraData.user,
        replies: [],
        votes_count: extraData.votes_count,
      });
    } else {
      eventsTree[e.id] = {
        id: extraData.id,
        nostr_id: e.id,
        body: e.content,
        created_at: e.created_at * 1000,
        pubkey: e.pubkey,
        author: extraData.user,
        replies: [],
        votes_count: extraData.votes_count,
      };
    }
  });

  // Run the censoring service
  // (nothing for now -:-)

  // Turn the top roots replies into a sorted array
  const sortedTree = Object.values(eventsTree).sort(
    (a, b) => b.created_at - a.created_at
  );

  return sortedTree;
}

type ConnectionStatus = {
  status: "Connected" | "Connecting" | "Not Connected";
  connectedRelaysCount: number;
};

function getConnectionStatus(): ConnectionStatus {
  let openedCnt = 0,
    reconnectingCnt = 0;

  for (const relayUrl in pool.relays) {
    const relayStatus = pool.relays[relayUrl].relay.status;
    if (relayStatus === 1) openedCnt += 1;
    if (relayStatus === 0) reconnectingCnt += 1;
  }

  const finalStatus =
    openedCnt > 0
      ? "Connected"
      : reconnectingCnt > 0
      ? "Connecting"
      : "Not Connected";

  return {
    status: finalStatus,
    connectedRelaysCount: openedCnt,
  };
}
