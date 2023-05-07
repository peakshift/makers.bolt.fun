import { randomUUID } from "crypto";
import { useMemo } from "react";
import { render, screen } from "src/utils/testing";
import { useNostrQueryList } from "../hooks/use-nostr-query-list";
import { MockRelayInitializer } from "./InMemoryRelay";
import { createNostrEvent, withTestingRelaysProvider } from "./helpers";

const relayBucketId = randomUUID();
const mockRelay1 = new MockRelayInitializer(8083, relayBucketId);
const mockRelay2 = new MockRelayInitializer(8084, relayBucketId);

beforeAll(async () => {
  await Promise.all([
    mockRelay1.waitForSocketToStart(),
    mockRelay2.waitForSocketToStart(),
  ]);
});

beforeEach(async () => {
  await Promise.all([
    mockRelay1.clearRelayEvents(),
    mockRelay2.clearRelayEvents(),
  ]);
});

const UseNostrQueryList = withTestingRelaysProvider(relayBucketId)(() => {
  const filters = useMemo(() => [{ kinds: [1] }], []);

  const { events, isEmpty } = useNostrQueryList({
    filters,
    debounceDelay: 200,
    considerEmptyTimeout: 300,
  });

  return (
    <div>
      <h1>Events</h1>
      <p>Is Empty: {isEmpty ? "true" : "false"}</p>
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

describe("useNostrQueryList Hook", () => {
  it("should fetch events from relays", async () => {
    await Promise.all([
      mockRelay1.setRelayEvents([
        createNostrEvent({ content: "Event No. 1" }),
        createNostrEvent({ content: "Event No. 2" }),
        createNostrEvent({ content: "Event No. 3" }),
      ]),
      mockRelay2.setRelayEvents([
        createNostrEvent({ content: "Event No. 4" }),
        createNostrEvent({ content: "Event No. 5" }),
      ]),
    ]);

    render(<UseNostrQueryList />);

    expect(await screen.findByText(/Event No. 1/)).toBeInTheDocument();
    expect(await screen.findByText(/Event No. 4/)).toBeInTheDocument();
    expect(await screen.findByText(/Is Empty: false/)).toBeInTheDocument();
  });

  it("should become empty", async () => {
    await Promise.all([
      mockRelay1.setRelayEvents([createNostrEvent({ kind: 0 })]),
    ]);

    render(<UseNostrQueryList />);
    expect(await screen.findByText(/Is Empty: false/)).toBeInTheDocument();
    expect(await screen.findByText(/Is Empty: true/)).toBeInTheDocument();
  });
});
