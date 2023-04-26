import { Event, EventTemplate, UnsignedEvent } from "nostr-tools";

export type NostrProfile = {
  pubkey: string;
  name: string;
  image: string;
  about: string | null;
  link: string;
  nip05?: string | null;
  lightning_address?: string | null;
  boltfun_id?: number;
};

export type NostrMetadata = Record<string, Event>;

export type NostrEvent = Event;
export type NostrEventTemplate = EventTemplate;
export type UnsignedNostrEvent = UnsignedEvent;
