import dayjs from "dayjs";
import { RelayPool } from "nostr-relaypool";
import { NostrToolsEventWithId } from "nostr-relaypool/event";
import { useEffect, useState } from "react";
import { normalizeURL } from "src/lib/nostr/helpers";
import { createRoute } from "src/utils/routing";
import { useDebounce } from "use-debounce";
import { Props } from "../useNostrComments";

export const useGetThreadRootObject = (props: {
  relaysPool: RelayPool | null;
  story: Props["story"];
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
        clearTimeout(timeout);
      }
    );

    const timeout = setTimeout(() => {
      unsub();
      // If the root object wasn't set yet, then use the fallback
      setThreadRootObject((rootObj) => (!!rootObj ? rootObj : fallbackObject));
    }, 10000);

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
