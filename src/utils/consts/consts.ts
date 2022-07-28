
const DEFAULT_RELAYS = [
    'wss://nostr.drss.io',
    'wss://nostr-relay.freeberty.net',
    'wss://nostr.unknown.place',
    'wss://nostr-relay.untethr.me',
    'wss://relay.damus.io'
];

const CONSTS = {
    apiEndpoint: process.env.REACT_APP_API_END_POINT ?? '/.netlify/functions',
    defaultLightningAddress: 'johns@getalby.com',
    DEFAULT_RELAYS
}

export default CONSTS;