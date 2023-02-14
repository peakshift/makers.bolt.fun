const DEFAULT_RELAYS = [
  "wss://nproxy.zerologin.co",
  "wss://nostr.drss.io",
  "wss://nostr.swiss-enigma.ch",
  "wss://relay.damus.io",
  "wss://nostr-relay.untethr.me",
  "wss://nostr-pub.wellorder.net",
];

const CONSTS = {
  apiEndpoint: process.env.REACT_APP_API_END_POINT ?? "/.netlify/functions",
  defaultLightningAddress: "johns@getalby.com",
  DEFAULT_RELAYS,
};

export default CONSTS;
