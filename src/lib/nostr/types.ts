import { NostrToolsEventWithId } from "nostr-relaypool/event";

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

export type NostrMetadata = Record<string, NostrToolsEventWithId>;
