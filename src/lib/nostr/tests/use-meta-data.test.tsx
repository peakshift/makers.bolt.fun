import { randomUUID } from "crypto";
import { findAllByAltText, render, screen } from "src/utils/testing";
import { useMetaData } from "../hooks/use-metadata";
import { MockRelayInitializer } from "./InMemoryRelay";
import { createMetadataEvent, withTestingRelaysProvider } from "./helpers";
import { nip19 } from "nostr-tools";

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

const UseMetadata = withTestingRelaysProvider(relayBucketId)(
  ({ pubkeys }: { pubkeys: string[] }) => {
    const { profilesData } = useMetaData({ pubkeys });

    return (
      <div>
        <h1 id="title">Users</h1>
        <ul aria-labelledby="title">
          {Object.values(profilesData).map((profile) => (
            <li key={profile.pubkey} data-testid="profile">
              <p>Pubkey: {profile.pubkey}</p>
              <p>Name: {profile.name}</p>
              <img src={profile.image} alt="user avatar" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

describe("useMetadata Hook", () => {
  it("Should display basic profile data for users correctly", async () => {
    const user1 = createMetadataEvent({ name: "Jack" });
    const user2 = createMetadataEvent({ name: "Fadi" });
    await Promise.all([
      mockRelay1.setRelayEvents([user1, user2]),
      mockRelay2.setRelayEvents([user1]),
    ]);

    render(<UseMetadata pubkeys={[user1.pubkey, user2.pubkey]} />);

    expect(await screen.findByText(/Jack/)).toBeInTheDocument();
    expect(await screen.findByText(/Fadi/)).toBeInTheDocument();

    const avatars = (await screen.findAllByRole("img", {
      name: /user avatar/,
    })) as HTMLImageElement[];
    avatars.forEach((avatar) => {
      expect(avatar.src).toMatch(/dicebear/);
    });
  });

  it("Should display npubs for user that don't have a username", async () => {
    const user1 = createMetadataEvent({ about: "something" });

    await Promise.all([mockRelay1.setRelayEvents([user1])]);

    render(<UseMetadata pubkeys={[user1.pubkey]} />);
    const userNpub = nip19.npubEncode(user1.pubkey);
    expect(await screen.findByText(new RegExp(userNpub))).toBeInTheDocument();
  });
});
