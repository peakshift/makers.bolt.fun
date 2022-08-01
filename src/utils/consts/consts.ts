
const DEFAULT_RELAYS = [
    'wss://nostr.drss.io',
    'wss://relay.damus.io',
];

const CONSTS = {
    apiEndpoint: process.env.REACT_APP_API_END_POINT ?? '/.netlify/functions',
    defaultLightningAddress: 'johns@getalby.com',
    DEFAULT_RELAYS
}

export default CONSTS;