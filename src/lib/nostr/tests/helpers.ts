import {
  Event,
  generatePrivateKey,
  getEventHash,
  getPublicKey,
  signEvent,
} from "nostr-tools";
import { withProviders } from "src/utils/hoc";
import { RelayPoolProvider } from "../hooks/use-relays-pool";
import { NostrProfile, UnsignedNostrEvent } from "../types";

export const withTestingRelaysProvider = (bucketId: string) =>
  withProviders([
    RelayPoolProvider,
    {
      relays: [
        `ws://localhost:8083?bucket=${bucketId}`,
        `ws://localhost:8084?bucket=${bucketId}`,
      ],
    },
  ]);

export const createNostrEvent = (
  data: Partial<Event & { prvKey: string }>
): Event => {
  const prvKey = data.prvKey ?? generatePrivateKey();
  const pubKey = getPublicKey(prvKey);

  const baseEvent: UnsignedNostrEvent = {
    content: data.content ?? "default content",
    created_at: data.created_at ?? Math.floor(Date.now() / 1000),
    kind: data.kind ?? 1,
    tags: data.tags ?? [],
    pubkey: data.pubkey ?? pubKey,
  };

  const id = getEventHash(baseEvent);

  return {
    ...baseEvent,
    id,
    sig: data.sig ?? signEvent(baseEvent, prvKey),
  };
};

export const createMetadataEvent = (
  data: Partial<Omit<NostrProfile, "pubkey"> & { prvKey: string }>
): Event => {
  const { prvKey = generatePrivateKey(), ...content } = data;

  const pubKey = getPublicKey(prvKey);

  const baseEvent: UnsignedNostrEvent = {
    content: JSON.stringify(content),
    created_at: Math.floor(Date.now() / 1000),
    kind: 0,
    tags: [],
    pubkey: pubKey,
  };

  const id = getEventHash(baseEvent);

  return {
    ...baseEvent,
    id,
    sig: signEvent(baseEvent, prvKey),
  };
};
