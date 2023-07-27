import { Event, Filter } from "nostr-tools";
import { useEffect, useMemo, useState } from "react";
import {
  NostrEvent,
  useMetaData,
  useNostrQueryItem,
  useNostrQueryList,
} from "src/lib/nostr";
import {
  getProfileDataFromMetaData,
  insertItemIntoDescendingList,
} from "src/lib/nostr/helpers";
import { useAppSelector } from "src/utils/hooks";

interface Props {
  pubkey?: string | null;
}

type NotificationBase = {
  id: string;
  created_at: number;
  url: string;
  pubkey: string;
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

export type Notification = ReturnType<
  typeof useNotifications
>["notifications"][number];

export const useNotifications = ({ pubkey }: Props) => {
  // construct filters array

  const filters: Filter[] = useMemo(
    () =>
      pubkey
        ? [
            {
              kinds: [1],
              // since: Math.floor(Date.parse(last_seen_notification_time) / 1000),
              "#p": [pubkey],
              // "#c": ["bolt.fun"],
            },
          ]
        : [],
    [pubkey]
  );

  const [notifications, setNotifications] = useState<NotificationBase[]>([]);

  // query events
  const { events, isEmpty } = useNostrQueryList({ filters, sortEvents: true });
  const { getEventById } = useNostrQueryItem();

  const { metadata } = useMetaData({
    pubkeys: notifications.map((n) => n.pubkey),
  });

  const notificationsWithMetadata = useMemo(
    () =>
      notifications.map((n) => ({
        ...n,
        user: getProfileDataFromMetaData(metadata, n.pubkey),
      })),
    [notifications, metadata]
  );

  // filter and parse events individually
  useEffect(() => {
    async function convertToNotification(
      event: NostrEvent
    ): Promise<NotificationBase | undefined> {
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
      const hasMentionedMe = event.content.indexOf(`#[${myPTagIndex}]`) !== -1;

      let postEvent: NostrEvent | null = event;
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
            pubkey: event.pubkey,
          };
        }
        return {
          type: "mention-in-comment",
          id: event.id,
          commentText: event.content,
          postTitle,
          url,
          created_at: event.created_at,
          pubkey: event.pubkey,
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
          pubkey: event.pubkey,
        };

      if (eventType === "reply")
        return {
          type: "reply-on-comment",
          id: event.id,
          replyText: event.content,
          postTitle,
          url,
          created_at: event.created_at,
          pubkey: event.pubkey,
        };

      return undefined;
    }
    events
      .filter(
        (e) =>
          e.pubkey !== pubkey &&
          (e.tags.some((t) => t[0] === "c" && t[1] === "bolt.fun") ||
            e.tags.some(
              (t) =>
                t[0] === "r" &&
                (t[1].startsWith("https://makers.bolt.fun") ||
                  t[1].startsWith("https://bolt.fun"))
            ))
      )
      .forEach((event) => {
        convertToNotification(event).then((notification) => {
          if (!notification) return;
          setNotifications((curr) =>
            insertItemIntoDescendingList(curr, notification, "created_at", "id")
          );
        });
      });
  }, [events, getEventById, pubkey]);

  return { notifications: notificationsWithMetadata, isEmpty };
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
