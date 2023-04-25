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

function withTestingRelaysProvider<
  T extends (props: any) => JSX.Element | null
>(Component: T) {
  return withProviders((props) => (
    <RelayPoolProvider relays={["ws://localhost:8083", "ws://localhost:8084"]}>
      {props.children}
    </RelayPoolProvider>
  ))(Component);
}

let _relayServer1: InMemoryRelayServer;
let _relayServer2: InMemoryRelayServer;

beforeAll(async () => {
  _relayServer1 = new InMemoryRelayServer();
  _relayServer2 = new InMemoryRelayServer();
  await _relayServer1.initServer(8083);
  await _relayServer2.initServer(8084);
});

beforeEach(() => {
  _relayServer1.clear();
  _relayServer2.clear();
});
afterEach(async () => {
  // await _relayServer1.close();
  // await _relayServer2.close();
});

afterAll(async () => {
  await _relayServer1.close();
  await _relayServer2.close();
});

const UseNostrQueryList = withTestingRelaysProvider(() => {
  const filters = useMemo(() => [{ kinds: [1] }], []);

  const { events } = useNostrQueryList({ filters });

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

describe("RelayPoolProvider", () => {
  it("should connect to relays", async () => {
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
