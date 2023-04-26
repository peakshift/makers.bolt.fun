import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NostrEvent, useRelayPool } from "src/lib/nostr";
import { insertEventIntoDescendingList } from "src/lib/nostr/helpers";
import { useDebounce } from "use-debounce";

interface Props {
  events_ids?: string[];
}

const TIME_TO_CONSIDER_EMPTY = 10 * 1000;

export type PostsToComments = {
  [nostr_id: string]: {
    state: "fetching" | "fetched";
    data: NostrEvent[];
  };
};

export const useFeedComments = ({ events_ids }: Props) => {
  const { relayPool } = useRelayPool();

  const [postsToCommentsImmediate, setPostsToComments] =
    useState<PostsToComments>({});
  const [postsToComments] = useDebounce(postsToCommentsImmediate, 1000, {
    maxWait: 3000,
  });

  const postsToCommentsRef = useRef<PostsToComments>({});

  useLayoutEffect(() => {
    postsToCommentsRef.current = postsToCommentsImmediate;
  }, [postsToCommentsImmediate]);

  useEffect(
    function subscribeToEvents() {
      if (!relayPool) return;
      if (!events_ids) return;

      const relaysUrls = Array.from(relayPool.relayByUrl.keys());

      const postsToInclude = events_ids.filter(
        (id) => !postsToCommentsRef.current[id]
      );

      if (!postsToInclude.length) return;

      setPostsToComments((curr) => {
        const newPostsToComments = { ...curr };
        postsToInclude.forEach((id) => {
          newPostsToComments[id!] = {
            state: "fetching",
            data: [],
          };
        });
        return newPostsToComments;
      });

      const filter = { "#e": postsToInclude };

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
          const rootTag = event.tags.find(
            (t) => t[0] === "e" && t[3] === "root"
          );
          if (rootTag) {
            setPostsToComments((curr) => ({
              ...curr,
              [rootTag[1]]: {
                state: "fetched",
                data: insertEventIntoDescendingList(
                  curr[rootTag[1]]?.data || [],
                  event
                ),
              },
            }));
          }
        },
        undefined, // maxDelayMs
        // onEose:
        (events, relayURL) => {
          // console.log("EOSE");
        }
      );

      setTimeout(() => {
        setPostsToComments((curr) => {
          const newPostsToComments = { ...curr };
          postsToInclude.forEach((id) => {
            if (newPostsToComments[id!].state === "fetching") {
              newPostsToComments[id!] = {
                state: "fetched",
                data: [],
              };
            }
          });
          return newPostsToComments;
        });
        unsub();
      }, TIME_TO_CONSIDER_EMPTY);

      relayPool.onerror((relayUrl, err) => {
        console.log("RelayPool error", err, " from relay ", relayUrl);
      });
      relayPool.onnotice((relayUrl, notice) => {
        console.log("RelayPool notice", notice, " from relay ", relayUrl);
      });

      return () => {
        // unsub();
      };
    },
    [events_ids, relayPool]
  );

  return { postsToComments };
};
