import { randomUUID } from "crypto";
import { act, render, screen } from "src/utils/testing";
import { generatePrivateKey, getPublicKey } from "nostr-tools";
import { useNotifications } from "src/features/Notifications/useNotifications";
import NotificationsList from "./NotificationsList";
import { MockRelayInitializer } from "src/lib/nostr/tests/InMemoryRelay";
import {
  createMetadataEvent,
  createNostrEvent,
  withTestingRelaysProvider,
} from "src/lib/nostr/tests/helpers";
import { ControlledMenu } from "@szhsin/react-menu";

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
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

const RenderNotificationsList = withTestingRelaysProvider(relayBucketId)(
  ({ user_nostr_key }: { user_nostr_key: string }) => {
    const { notifications, isEmpty } = useNotifications({
      pubkey: user_nostr_key,
    });

    return (
      <ControlledMenu
        align="end"
        arrow
        anchorPoint={{ x: 0, y: 0 }}
        menuClassName="!p-8 !rounded-12 !w-[min(90vw,375px)]"
        state="open"
      >
        <NotificationsList
          isLoadingNotifications={notifications.length === 0 && !isEmpty}
          notifications={notifications}
          noKeyConnected={!user_nostr_key}
        />
      </ControlledMenu>
    );
  }
);

describe("Notifications List", () => {
  const myUserPrvKey = generatePrivateKey();
  const myUserPubKey = getPublicKey(myUserPrvKey);

  const anotherUserPrvKey = generatePrivateKey();
  const anotherUserPubKey = getPublicKey(anotherUserPrvKey);
  const anotherUserProfileData = createMetadataEvent({
    name: "Johns",
    prvKey: anotherUserPrvKey,
  });

  it("Should start with loading state then become empty", async () => {
    render(<RenderNotificationsList user_nostr_key={myUserPubKey} />);

    expect(await screen.findByLabelText(/Loading/)).toBeInTheDocument();
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(
      await screen.findByLabelText(/notifications empty/i)
    ).toBeInTheDocument();
  });

  it("Should show post mention", async () => {
    const postMentionEvent = createNostrEvent({
      prvKey: anotherUserPrvKey,
      content: "I'm mentioning you #[0]",
      tags: [
        ["p", myUserPubKey],
        ["c", "bolt.fun"],
        ["r", "https://makers.bolt.fun/posts/1234"],
      ],
    });

    await Promise.all([
      mockRelay1.setRelayEvents([postMentionEvent, anotherUserProfileData]),
      mockRelay2.setRelayEvents([postMentionEvent]),
    ]);

    render(<RenderNotificationsList user_nostr_key={myUserPubKey} />);
    // await waitFor(() => {
    //   expect(screen.getByText(/mentioned you/i)).toBeDefined();
    // });
    expect(
      await screen.findByText(/Johns mentioned you in a post/i)
    ).toBeInTheDocument();
  });

  it("Should show commented on post", async () => {
    const postEvent = createNostrEvent({
      prvKey: myUserPrvKey,
      content: "Here is My Post",
      tags: [
        ["c", "bolt.fun"],
        ["r", "https://makers.bolt.fun/posts/1234"],
      ],
    });
    const commentEvent = createNostrEvent({
      prvKey: anotherUserPrvKey,
      content: "I'm commenting on your post",
      tags: [
        ["p", myUserPubKey],
        ["c", "bolt.fun"],
        ["r", "https://makers.bolt.fun/posts/1234"],
        ["e", postEvent.id, "relay url", "root"],
      ],
    });

    await Promise.all([
      mockRelay1.setRelayEvents([
        postEvent,
        commentEvent,
        anotherUserProfileData,
      ]),
      mockRelay2.setRelayEvents([postEvent, commentEvent]),
    ]);

    render(<RenderNotificationsList user_nostr_key={myUserPubKey} />);
    expect(
      await screen.findByText(/Johns commented on your post/i)
    ).toBeInTheDocument();
  });

  it("Should show replied to your comment", async () => {
    const postEvent = createNostrEvent({
      prvKey: anotherUserPrvKey,
      content: "Here is A Post",
      tags: [
        ["c", "bolt.fun"],
        ["r", "https://makers.bolt.fun/posts/1234"],
      ],
    });
    const commentEvent = createNostrEvent({
      prvKey: myUserPrvKey,
      content: "I'm commenting on post",
      tags: [
        ["p", myUserPubKey],
        ["c", "bolt.fun"],
        ["r", "https://makers.bolt.fun/posts/1234"],
        ["e", postEvent.id, "relay url", "root"],
      ],
    });
    const replyEvent = createNostrEvent({
      prvKey: anotherUserPrvKey,
      content: "I'm replying on comment",
      tags: [
        ["p", myUserPubKey],
        ["c", "bolt.fun"],
        ["r", "https://makers.bolt.fun/posts/1234"],
        ["e", postEvent.id, "relay url", "root"],
        ["e", commentEvent.id, "relay url", "reply"],
      ],
    });

    await Promise.all([
      mockRelay1.setRelayEvents([
        postEvent,
        commentEvent,
        replyEvent,
        anotherUserProfileData,
      ]),
      mockRelay2.setRelayEvents([postEvent, commentEvent, replyEvent]),
    ]);

    render(<RenderNotificationsList user_nostr_key={myUserPubKey} />);
    expect(
      await screen.findByText(/Johns replied on your comment/i)
    ).toBeInTheDocument();
  });
});
