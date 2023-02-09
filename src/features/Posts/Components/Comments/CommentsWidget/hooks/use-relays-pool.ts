import { RelayPool } from "nostr-relaypool";
import { useEffect, useState } from "react";

export const useRelayPool = ({ relays }: { relays: string[] }) => {
  const [relayPool, setRelayPool] = useState<RelayPool | null>(null);
  const [relaysStatus, setRelaysStatus] = useState<Map<string, number>>(
    new Map()
  );

  useEffect(() => {
    const pool = new RelayPool();
    setRelayPool(pool);
    return () => {
      pool.close();
    };
  }, []);

  useEffect(() => {
    if (relayPool)
      relays.forEach((relayUrl) => {
        relayPool.addOrGetRelay(relayUrl);
      });
  }, [relayPool, relays]);

  useEffect(() => {
    if (!relayPool) return;
    // First, close all the relays that are in the pool but not in the props anymore
    const allCurrentRelays = Array.from(relayPool.relayByUrl.keys());
    for (const relay of allCurrentRelays) {
      if (!relays.includes(relay)) {
        relayPool.relayByUrl.get(relay)?.close().catch();
      }
    }

    relays.forEach((relayUrl) => {
      relayPool.addOrGetRelay(relayUrl).connect();
    });
  }, [relayPool, relays]);

  useEffect(() => {
    if (!relayPool) return;

    const updateStatus = () => {
      setRelaysStatus(new Map(relayPool.getRelayStatuses()));
    };

    const interval = setInterval(updateStatus, 5000);
    updateStatus();

    return () => clearInterval(interval);
  }, [relayPool]);

  return {
    relayPool,
    relaysStatus,
  };
};
