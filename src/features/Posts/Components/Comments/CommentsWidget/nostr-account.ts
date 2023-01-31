import { getPublicKey } from "nostr-tools";

type NostrAccountConnection =
  | {
      type: "nostr-ext";
      pubkey: string;
    }
  | {
      type: "generated-keys";
      pubkey: string;
    }
  | {
      type: "inputted-keys";
      pubkey: string;
      prvkey: string;
    };

export function getMyNostrConnection() {
  const storedNostrObject = localStorage.getItem("nostr-connection");

  if (!storedNostrObject) return null;

  return JSON.parse(storedNostrObject) as NostrAccountConnection;
}

export async function connectToNostr(options: {
  type: NostrAccountConnection["type"];
  prvkey?: string;
}) {
  let nostrAccountConnection: NostrAccountConnection;

  if (options.type === "nostr-ext") {
    const pubkey = await window.nostr.getPublicKey();
    nostrAccountConnection = {
      type: options.type,
      pubkey,
    };
  } else if (options.type === "generated-keys") {
    // Make a fetch request to our API to get the keys
    const pubkey = (await fetch("some-where").then((res) =>
      res.json()
    )) as string;
    nostrAccountConnection = {
      type: options.type,
      pubkey,
    };
  } else if (options.type === "inputted-keys") {
    if (!options.prvkey)
      throw new Error(
        "You need to provide a private key when connecting with your own keys"
      );

    const pubkey = getPublicKey(options.prvkey);
    nostrAccountConnection = {
      type: options.type,
      pubkey,
      prvkey: options.prvkey,
    };
  } else throw new Error("Unknown connection type");

  localStorage.setItem(
    "nostr-connection",
    JSON.stringify(nostrAccountConnection)
  );

  return nostrAccountConnection;
}
