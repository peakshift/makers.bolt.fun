import { useCallback } from "react";
import { useRelayPool } from "./use-relays-pool";

export const useNostrQueryItem = () => {
  const { relayPool } = useRelayPool();

  const getEventById = useCallback(
    (id: string, maxDelay: number = 100) => {
      if (!relayPool) throw new Error("Relays Pool not initialized yet");

      const relaysUrls = Array.from(relayPool.relayByUrl.keys());
      return relayPool.getEventById(id, relaysUrls, maxDelay);
    },
    [relayPool]
  );

  return {
    getEventById,
  };
};
