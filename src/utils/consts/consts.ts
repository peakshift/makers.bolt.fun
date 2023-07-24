const DEFAULT_RELAYS = [
  "wss://nostr.bolt.fun",
  "wss://nostr-pub.wellorder.net",
  "wss://nostr.drss.io",
  "wss://relay.damus.io",
];

const CONSTS = {
  apiEndpoint: process.env.REACT_APP_API_END_POINT ?? "/.netlify/functions",
  defaultLightningAddress: "johns@getalby.com",
  DEFAULT_RELAYS,
  BF_NOSTR_PUBKEY:
    "4f260791d78a93d13e09f1965f4ba1e1f96d1fcb812123a26d95737c9d54802b",
  OPENAI_API_KEY: process.env.REACT_APP_OPENAI_API_KEY ?? "",
};

export default CONSTS;
