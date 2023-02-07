import { NostrToolsEvent } from "nostr-relaypool/event";
import { nip19 } from "nostr-tools";
import { NostrProfile } from "./useNostrComments";

export function normalizeURL(raw: string) {
  let url = new URL(raw);
  return (
    url.origin
      .replace("://m.", "://") // remove known 'mobile' subdomains
      .replace("://mobile.", "://")
      .replace(
        /:\d+/,
        // remove 443 and 80 ports
        (port) => (port === ":443" || port === ":80" ? "" : port)
      ) +
    url.pathname
      .replace(/\/+/g, "/") // remove duplicated slashes in the middle of the path
      .replace(/\/*$/, "") // remove slashes from the end of path
  );
}

export function getName(metadata: Record<string, any>, pubkey: string): string {
  let meta = metadata[pubkey];
  if (meta) {
    if (meta.nip05 && meta.nip05verified) {
      if (meta.nip05.startsWith("_@")) return meta.nip05.slice(2);
      return meta.nip05;
    }
    if (meta.name && meta.name.length) return meta.name;
  } else if (pubkey) {
    let npub = nip19.npubEncode(pubkey);
    return npub;
  }

  return "_";
}

export function getProfileDataFromMetaData(
  metadata: Record<string, any>,
  pubkey: string
): NostrProfile {
  let meta = metadata[pubkey];
  if (!meta)
    return {
      pubkey,
      name: nip19.npubEncode(pubkey),
      about: null,
      image: `https://avatars.dicebear.com/api/identicon/${pubkey}.svg`,
      lightning_address: null,
      nip05: null,
      link: "nostr:" + nip19.npubEncode(pubkey),
    };

  const name = getName(metadata, pubkey);
  const image =
    meta.picture && meta.picture.length ? (meta.picture as string) : null;
  const about = meta.about && meta.about.length ? (meta.about as string) : null;
  const nip05 = meta.nip05 && meta.nip05.length ? (meta.nip05 as string) : null;
  const lud06 = meta.lud06 && meta.lud06.length ? (meta.lud06 as string) : null;

  return {
    name,
    image,
    about,
    pubkey,
    lightning_address: lud06,
    nip05,
    link: "nostr:" + nip19.npubEncode(pubkey),
  } as NostrProfile;
}

export function insertEventIntoDescendingList(
  sortedArray: NostrToolsEvent[],
  event: NostrToolsEvent
) {
  let start = 0;
  let end = sortedArray.length - 1;
  let midPoint;
  let position = start;

  if (end < 0) {
    position = 0;
  } else if (event.created_at < sortedArray[end].created_at) {
    position = end + 1;
  } else if (event.created_at >= sortedArray[start].created_at) {
    position = start;
  } else
    while (true) {
      if (end <= start + 1) {
        position = end;
        break;
      }
      midPoint = Math.floor(start + (end - start) / 2);
      if (sortedArray[midPoint].created_at > event.created_at) {
        start = midPoint;
      } else if (sortedArray[midPoint].created_at < event.created_at) {
        end = midPoint;
      } else {
        // aMidPoint === num
        position = midPoint;
        break;
      }
    }

  // insert when num is NOT already in (no duplicates)
  if (sortedArray[position]?.id !== event.id) {
    return [
      ...sortedArray.slice(0, position),
      event,
      ...sortedArray.slice(position),
    ];
  }

  return sortedArray;
}

export type ThreadedEvent = NostrToolsEvent & { replies: ThreadedEvent[] };

export function computeThreads(events: readonly NostrToolsEvent[]) {
  let threadableEvents = events.map((event) => ({
    ...event,
    replies: [],
  })) as ThreadedEvent[];

  let threads = [];
  for (let i = threadableEvents.length - 1; i >= 0; i--) {
    let event = threadableEvents[i];
    let reply = getImmediateReply(event.tags);

    if (!reply) {
      threads.unshift(event);
      continue;
    }

    let parent = getEvent(reply);
    parent.replies.unshift(event);
  }

  return threads;

  function getImmediateReply(tags: string[][]) {
    let curr = null;
    for (let t = tags.length - 1; t >= 0; t--) {
      let tag = tags[t];
      if (
        tag[0] === "e" &&
        typeof tag[1] === "string" &&
        // can't be root in this context because the root is always the original website event
        tag[3] !== "root"
      ) {
        if (tag[3] === "reply") {
          return tag[1];
        }

        if (curr === null) curr = tag[1];
      }
    }
    return curr;
  }

  function getEvent(id: string) {
    for (let j = 0; j < threadableEvents.length; j++) {
      if (threadableEvents[j].id === id) return threadableEvents[j];
    }

    // couldn't find this event, so manufacture one
    let fake = {
      id,
      replies: [] as NostrToolsEvent[],
    } as unknown as ThreadedEvent;
    threadableEvents.push(fake);

    return fake;
  }
}
