import { NostrToolsEventWithId } from "nostr-relaypool/event";
import { Event, Filter } from "nostr-tools";
import { useEffect, useMemo, useState } from "react";
import { useNostrQueryItem, useNostrQueryList } from "src/lib/nostr";
import { insertItemIntoDescendingList } from "src/lib/nostr/helpers";

interface Props {
  pubkey?: string | null;
}

export type Notification = {
  id: string;
  created_at: number;
  url: string;
  postTitle?: string;
} & (
  | {
      type: "mention-in-post";
    }
  | {
      type: "mention-in-comment";
      commentText: string;
    }
  | {
      type: "comment-on-post";
      commentText: string;
    }
  | {
      type: "reply-on-comment";
      replyText: string;
    }
);

export const useNotifications = ({ pubkey }: Props) => {
  // construct filters array
  const filters: Filter[] = useMemo(
    () =>
      pubkey
        ? [
            {
              kinds: [1],
              "#p": [pubkey],
              // "#c": ["bolt.fun"],
            },
          ]
        : [],
    [pubkey]
  );

  const [notifications, setNotifications] = useState<Notification[]>([]);

  // query events
  const { events } = useNostrQueryList({ filters, sortEvents: true });
  const { getEventById } = useNostrQueryItem();

  // filter and parse events individually
  useEffect(() => {
    async function convertToNotification(
      event: NostrToolsEventWithId
    ): Promise<Notification | undefined> {
      function getEventCategory(event: Event) {
        if (
          event.tags.some((t) => t[0] === "e" && t[3] === "root") &&
          event.tags.some((t) => t[0] === "e" && t[3] === "reply")
        )
          return "reply";
        else if (event.tags.some((t) => t[0] === "e" && t[3] === "root"))
          return "comment";
        else return "post";
      }

      const eventType = getEventCategory(event);

      const postEventId =
        eventType === "post"
          ? event.id
          : event.tags.find((t) => t[0] === "e" && t[3] === "root")?.[1]!;

      const myPTagIndex = event.tags.findIndex(
        (t) => t[0] === "p" && t[1] === pubkey
      );
      const url = event.tags.find((t) => t[0] === "r")?.[1];

      if (!url) return undefined;

      const hasMentionedMe = event.content.search(`#[${myPTagIndex}]`) !== -1;

      let postEvent: NostrToolsEventWithId | null = event;
      if (eventType !== "post") postEvent = await getEventById(postEventId);

      const postTitleRgx = /^(?<postTitle>.*?)\s*$/m;
      const match = postTitleRgx.exec(postEvent?.content ?? "");

      let postTitle: string | undefined;

      if (match) {
        postTitle = match.groups?.postTitle;
      }

      if (hasMentionedMe) {
        if (eventType === "post") {
          return {
            type: "mention-in-post",
            postTitle,
            id: event.id,
            url,
            created_at: event.created_at,
          };
        }
        return {
          type: "mention-in-comment",
          id: event.id,
          commentText: event.content,
          postTitle,
          url,
          created_at: event.created_at,
        };
      }

      if (eventType === "comment")
        return {
          type: "comment-on-post",
          id: event.id,
          commentText: event.content,
          postTitle,
          url,
          created_at: event.created_at,
        };

      if (eventType === "reply")
        return {
          type: "reply-on-comment",
          id: event.id,
          replyText: event.content,
          postTitle,
          url,
          created_at: event.created_at,
        };

      return undefined;
    }

    events
      .filter((e) => e.pubkey !== pubkey)
      .forEach((event) => {
        convertToNotification(event).then((notification) => {
          if (!notification) return;
          setNotifications((curr) =>
            insertItemIntoDescendingList(curr, notification, "created_at", "id")
          );
        });
      });
  }, [events, getEventById, pubkey]);

  return { notifications };
};

const BF_STORY_URL_REGEX =
  /(?:http|https):\/\/(makers.bolt.fun|deploy-preview-[\d]+--makers-bolt-fun.netlify.app|makers-bolt-fun-preview.netlify.app|localhost:3000)\/story\/([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/m;

function extractStoryUrl(text: string) {
  return BF_STORY_URL_REGEX.exec(text)?.[0];
}

function extractStoryIdFromUrl(url: string) {
  const matches = BF_STORY_URL_REGEX.exec(url);
  if (!matches) throw new Error("Invalid Url");

  const slugSegment = matches[2];

  const EXTRACT_STORY_ID_FROM_SLUG_REGEX = /(?:(?:[\w-]+)?(?:--))?([\d]+)/m;

  return EXTRACT_STORY_ID_FROM_SLUG_REGEX.exec(slugSegment)?.[0];
}
