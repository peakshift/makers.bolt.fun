import { NostrToolsEventWithId } from "nostr-relaypool/event";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRelayPool } from "src/lib/nostr";
import { insertEventIntoDescendingList } from "src/lib/nostr/helpers";
import { useDebounce } from "use-debounce";

interface Props {
  posts: { nostr_event_id?: string | null }[];
}

const TIME_TO_CONSIDER_EMPTY = 10 * 1000;

export type PostsToComments = {
  [nostr_id: string]: {
    state: "fetching" | "fetched";
    data: NostrToolsEventWithId[];
  };
};

export const useFeedComments = ({ posts }: Props) => {
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

      const relaysUrls = Array.from(relayPool.relayByUrl.keys());

      const postsToInclude = posts.filter(
        (p) => p.nostr_event_id && !postsToCommentsRef.current[p.nostr_event_id]
      );

      setPostsToComments((curr) => {
        const newPostsToComments = { ...curr };
        postsToInclude.forEach((p) => {
          newPostsToComments[p.nostr_event_id!] = {
            state: "fetching",
            data: [],
          };
        });
        return newPostsToComments;
      });

      const filter = { "#e": postsToInclude.map((p) => p.nostr_event_id) };

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
          postsToInclude.forEach((p) => {
            if (newPostsToComments[p.nostr_event_id!].state === "fetching") {
              newPostsToComments[p.nostr_event_id!] = {
                state: "fetched",
                data: [],
              };
            }
          });
          return newPostsToComments;
        });
      }, TIME_TO_CONSIDER_EMPTY);

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
    [relayPool, posts]
  );

  return { postsToComments };
};
