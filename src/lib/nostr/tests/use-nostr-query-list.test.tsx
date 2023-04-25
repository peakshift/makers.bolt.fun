import { renderHook } from "@testing-library/react";
import { RelayPool } from "nostr-relaypool";
import {
  Event,
  generatePrivateKey,
  getEventHash,
  getPublicKey,
  signEvent,
  SimplePool,
  UnsignedEvent,
} from "nostr-tools";
import { useEffect, useMemo, useState } from "react";
import { withProviders } from "src/utils/hoc";
import { render, screen } from "src/utils/testing";
import { useNostrQueryList } from "../hooks/use-nostr-query-list";
import { RelayPoolProvider, useRelayPool } from "../hooks/use-relays-pool";
import { InMemoryRelayServer } from "../InMemoryRelay";

const withTestingRelaysProvider = withProviders([
  RelayPoolProvider,
  { relays: ["ws://localhost:8083", "ws://localhost:8084"] },
]);

const _relayServer1 = new InMemoryRelayServer(8083);
const _relayServer2 = new InMemoryRelayServer(8084);

beforeAll(async () => {
  await _relayServer1.initServer();
  await _relayServer2.initServer();
});

beforeEach(() => {
  _relayServer1.clear();
  _relayServer2.clear();
});

afterAll(async () => {
  await _relayServer1.close();
  await _relayServer2.close();
});

const UseNostrQueryList = withTestingRelaysProvider(() => {
  const filters = useMemo(() => [{ kinds: [1] }], []);

  const { events } = useNostrQueryList({ filters, debounceDelay: 200 });

  return (
    <div>
      <ul>
        {events.map((event) => (
          <li key={event.id} data-testid="event">
            <p>Id: {event.id}</p>
            <p>Kind: {event.kind}</p>
            <p>Content: {event.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
});

const createNostrEvent = (data: Partial<Event>): Event => {
  const prvKey = generatePrivateKey();
  const pubKey = getPublicKey(prvKey);

  const baseEvent: UnsignedEvent = {
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

describe("useNostrQueryList Hook", () => {
  it("should fetch events from relays", async () => {
    _relayServer1.initEvents([
      createNostrEvent({ content: "Event No. 1" }),
      createNostrEvent({ content: "Event No. 2" }),
      createNostrEvent({ content: "Event No. 3" }),
    ]);

    _relayServer2.initEvents([
      createNostrEvent({ content: "Event No. 4" }),
      createNostrEvent({ content: "Event No. 5" }),
    ]);
    render(<UseNostrQueryList />);
    expect(await screen.findByText(/Event No. 1/)).toBeInTheDocument();
    expect(await screen.findByText(/Event No. 4/)).toBeInTheDocument();
  });
});
