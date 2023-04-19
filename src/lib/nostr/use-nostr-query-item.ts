import { NostrToolsEventWithId } from "nostr-relaypool/event";
import { Filter } from "nostr-tools";
import { useCallback, useRef } from "react";
import { useRelayPool } from "./use-relays-pool";

export const useNostrQueryItem = () => {
  const { relayPool } = useRelayPool();

  const eventsMap = useRef<
    Record<string, Promise<NostrToolsEventWithId | null>>
  >({});

  const getEventById = useCallback(
    (eventId: string) => {
      if (!relayPool) throw new Error("Relays Pool not initialized yet");

      const relaysUrls = Array.from(relayPool.relayByUrl.keys());

      if (eventId in eventsMap.current) return eventsMap.current[eventId];

      return (eventsMap.current[eventId] = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          resolve(null);
        }, 10000);

        let unsub = relayPool.subscribe(
          [
            {
              ids: [eventId],
            },
          ],
          relaysUrls,
          // onEvent:
          (event, isAfterEose, relayURL) => {
            resolve(event);
            clearTimeout(timeout);
            unsub();
          }
        );

        relayPool.onerror((relayUrl, err) => {
          console.log("RelayPool error", err, " from relay ", relayUrl);
        });
        relayPool.onnotice((relayUrl, notice) => {
          console.log("RelayPool notice", notice, " from relay ", relayUrl);
        });
      }));
    },
    [relayPool]
  );

  return {
    getEventById,
  };
};
