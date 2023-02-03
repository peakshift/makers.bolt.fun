import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "src/Components/Button/Button";

interface Props {
  relays: [url: string, status: number][];
  onRemoveRelay?: (relayUrl: string) => void;
  onAddNewRelay?: (relayUrl: string) => void;
}

export default function RelaysList(props: Props) {
  const [newRelayInput, setNewRelayInput] = useState("");

  return (
    <ul className="flex flex-col gap-8 bg-gray-100 p-16 rounded">
      {props.relays
        .map(([url, status]) => ({
          url,
          isOpen: status === WebSocket.OPEN,
          isClosed: status === WebSocket.CLOSED || status === WebSocket.CLOSING,
          isConnecting: status === WebSocket.CONNECTING,
        }))
        .map(({ url, isConnecting, isClosed, isOpen }) => (
          <li
            key={url}
            className="md:flex gap-8 flex-wrap items-center px-12 py-8 rounded-4"
          >
            <span className={`text-body3 ${isConnecting && "animate-spin"}`}>
              {isOpen && "✅"} {isConnecting && "⏳"} {isClosed && "⛔"}
            </span>{" "}
            {url}
            <br />
            <Button
              variant="text"
              size="sm"
              color="red"
              onClick={() => props.onRemoveRelay?.(url)}
            >
              Remove
            </Button>
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
              props.onAddNewRelay?.(newRelayInput);
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
  );
}
