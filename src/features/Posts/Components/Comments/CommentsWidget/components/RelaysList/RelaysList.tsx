import { useUpdateEffect } from "@react-hookz/web";
import { useLayoutEffect, useRef, useState } from "react";
import { FaPlus, FaUndo } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import Button from "src/Components/Button/Button";
import Preferences from "src/services/preferences.service";
import { CONSTS } from "src/utils";

interface Props {
  relaysConnectionStatus?: Map<string, number>;
  onRelaysChange?: (relays: string[]) => void;
}

export default function RelaysList(props: Props) {
  const [newRelayInput, setNewRelayInput] = useState("");
  const [myRelays, setMyRelays] = useState(() =>
    Preferences.get("nostr_relays_to_connect_to")
  );
  const [refreshSpinnerSpinning, setRefreshSpinnerSpinning] = useState(false);

  const stopRefreshSpinnerTimeoutRef = useRef<NodeJS.Timeout>();

  const onRelaysChangeRef = useRef<Props["onRelaysChange"]>();

  useLayoutEffect(() => {
    onRelaysChangeRef.current = props.onRelaysChange;
  });

  useUpdateEffect(() => {
    Preferences.update("nostr_relays_to_connect_to", myRelays);
    onRelaysChangeRef.current?.(myRelays);
  }, [myRelays]);

  const removeRelay = (urlToRemove: string) => {
    setMyRelays((cur) => cur.filter((url) => url !== urlToRemove));
  };

  const addRelay = (newUrl: string) => {
    if (!myRelays.includes(newUrl)) setMyRelays([...myRelays, newUrl]);
  };

  const restoreDefaultRelays = () => {
    setMyRelays([
      ...myRelays,
      ...CONSTS.DEFAULT_RELAYS.filter((relay) => !myRelays.includes(relay)),
    ]);
  };

  const refreshConnection = () => {
    setMyRelays([...myRelays]);

    if (stopRefreshSpinnerTimeoutRef.current) {
      clearTimeout(stopRefreshSpinnerTimeoutRef.current);
    }

    setRefreshSpinnerSpinning(true);
    const stopRefreshSpinnerTimeout = setTimeout(() => {
      setRefreshSpinnerSpinning(false);
    }, 5000);
    stopRefreshSpinnerTimeoutRef.current = stopRefreshSpinnerTimeout;
  };

  return (
    <div className="bg-gray-100 p-16 rounded">
      <ul className="flex flex-col gap-8 ">
        {myRelays
          .map((url) => {
            const status = props.relaysConnectionStatus?.get(url);
            return {
              url,
              hasStatus: status !== undefined,
              isOpen: status === WebSocket.OPEN,
              isClosed:
                status === WebSocket.CLOSED || status === WebSocket.CLOSING,
              isConnecting: status === WebSocket.CONNECTING,
            };
          })
          .map(({ url, hasStatus, isConnecting, isClosed, isOpen }) => (
            <li
              key={url}
              className="md:flex gap-8 flex-wrap items-center py-8 rounded-4"
            >
              {hasStatus && (
                <span
                  className={`text-body3 ${isConnecting && "animate-spin"}`}
                >
                  {isOpen && "✅"} {isConnecting && "⏳"} {isClosed && "⛔"}{" "}
                </span>
              )}
              {url}
              <br />
              {myRelays.length > 1 && !url.startsWith("wss://nostr.bolt.fun") && (
                <Button
                  variant="text"
                  size="sm"
                  color="red"
                  onClick={() => removeRelay(url)}
                >
                  Remove
                </Button>
              )}
            </li>
          ))}
        <li className="">
          <p className="text-body5 font-bold mb-8">Enter a New Relay URL</p>
          <div className="flex flex-col md:flex-row gap-y-8 gap-16">
            <div className="input-wrapper relative">
              <input
                type={"text"}
                className="input-text"
                placeholder="wss://new-relay-url.here"
                value={newRelayInput}
                onChange={(e) => setNewRelayInput(e.target.value)}
              />
            </div>
            <Button
              onClick={() => {
                addRelay(newRelayInput);
                setNewRelayInput("");
              }}
              color="gray"
              size="sm"
              className="shrink-0"
            >
              <FaPlus className="text-gray-700" />{" "}
              <span className="align-middle">Add Relay</span>
            </Button>
          </div>
        </li>
      </ul>
      <hr className="my-16" />
      <div className="flex gap-16 justify-between">
        <Button color="gray" size="sm" onClick={() => restoreDefaultRelays()}>
          Restore Default Relays
        </Button>
        <Button color="gray" size="sm" onClick={() => refreshConnection()}>
          <FiRefreshCcw
            className={refreshSpinnerSpinning ? "animate-spin" : ""}
          />{" "}
          Reconnect
        </Button>
      </div>
    </div>
  );
}
