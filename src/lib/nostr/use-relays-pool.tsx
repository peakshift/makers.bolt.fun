import { RelayPool } from "nostr-relaypool";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Preferences from "src/services/preferences.service";
import { CONSTS } from "src/utils";
import { GlobalRelayPool } from "./GlobalRelayPool";

interface State {
  relayPool: RelayPool | null;
  updateRelays: (relays: string[]) => void;
}

const RelayPoolContext = createContext<State | null>(null);

export const RelayPoolProvider = (props: PropsWithChildren<{}>) => {
  const [relayPool, setRelayPool] = useState<RelayPool | null>(null);

  useEffect(() => {
    const pool = GlobalRelayPool.initPool(
      Preferences.get("nostr_relays_to_connect_to") ?? CONSTS.DEFAULT_RELAYS
    );
    setRelayPool(pool);
    return () => {
      GlobalRelayPool.closeAfterDelay();
    };
  }, []);

  const updateRelays = useCallback(
    (relays: string[]) => {
      if (!relayPool) return;

      // close removed relays
      const allCurrentRelays = Array.from(relayPool.relayByUrl.keys());
      for (const relay of allCurrentRelays) {
        if (!relays.includes(relay)) {
          relayPool.relayByUrl.get(relay)?.close().catch();
        }
      }

      relays.forEach((relayUrl) => {
        relayPool.addOrGetRelay(relayUrl).connect();
      });
    },
    [relayPool]
  );

  return (
    <RelayPoolContext.Provider
      value={{
        relayPool,
        updateRelays,
      }}
    >
      {props.children}
    </RelayPoolContext.Provider>
  );
};

export const useRelayPool = () => {
  const result = useContext(RelayPoolContext);

  if (!result) throw new Error("No Relay Pool Provider was found");

  return result;
};

export const useRelayPoolStatus = (relayPool: RelayPool | null) => {
  const [relaysStatus, setRelaysStatus] = useState<Map<string, number>>(
    new Map()
  );

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
    relaysStatus,
  };
};
