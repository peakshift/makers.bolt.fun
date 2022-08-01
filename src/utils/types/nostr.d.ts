
interface NostrEvent {
    id?: string,
    kind: number,
    pubkey?: string,
    content: string,
    tags: Array<Array<string>>,
    created_at: number,
    sig?: string;
}


declare module 'nostr-tools' {
    declare function generatePrivateKey(): string
    declare function relayConnect(): void
    declare function relayPool(): any
    declare function signEvent(event: NostrEvent, key: sting): string
    declare function validateEvent(): void
    declare function verifySignature(event: NostrEvent): bool
    declare function serializeEvent(): string
    declare function getEventHash(event: NostrEvent): string
    declare function getPublicKey(prvKey: string): string
    declare function getBlankEvent(): NostrEvent
    declare function matchFilter(): void
    declare function matchFilters(): void
}
