const DEFAULT_RELAYS = [
  "wss://nostr.bolt.fun",
  "wss://nostr-pub.wellorder.net",
  "wss://nostr.drss.io",
  "wss://nostr.swiss-enigma.ch",
  "wss://relay.damus.io",
  "wss://nproxy.zerologin.co",
];

const CONSTS = {
  apiEndpoint: process.env.REACT_APP_API_END_POINT ?? "/.netlify/functions",
  defaultLightningAddress: "johns@getalby.com",
  DEFAULT_RELAYS,
};

export default CONSTS;
