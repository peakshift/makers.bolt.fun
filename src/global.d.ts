import { NostrToolsEvent, NostrToolsEventWithId } from "nostr-relaypool/event";

declare global {
  interface Window {
    webln: any;
    nostr: Nostr;
  }
}

type Nostr = {
  getPublicKey(): Promise<string>;
  signEvent(
    event: NostrToolsEvent
  ): Promise<NostrToolsEventWithId & { sig: string }>;
};
