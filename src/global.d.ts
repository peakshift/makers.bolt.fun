import { NostrEvent, UnsignedNostrEvent } from "./lib/nostr";

declare global {
  interface Window {
    webln: any;
    nostr: Nostr;
  }
}

type Nostr = {
  getPublicKey(): Promise<string>;
  signEvent(event: UnsignedNostrEvent): Promise<NostrEvent & { sig: string }>;
};
