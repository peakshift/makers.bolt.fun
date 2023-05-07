import {
  UpdateUserPreferencesMutationVariables,
  useMyNostrSettingsQuery,
} from "src/graphql";
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import PreferencesTabSkeleton from "./PreferencesTab.Skeleton";
import { NetworkStatus } from "@apollo/client";
import Card from "src/Components/Card/Card";
import GeneratedKeysCard from "./GeneratedKeysCard/GeneratedKeysCard";
import RelaysList from "src/features/Posts/Components/Comments/CommentsWidget/components/RelaysList/RelaysList";
import LinkedNostrKeys from "./LinkedNostrKeys/LinkedNostrKeys";
import { withProviders } from "src/utils/hoc";
import {
  RelayPoolProvider,
  useRelayPool,
  useRelayPoolStatus,
} from "src/lib/nostr";

interface Props {}

export type IProfilePreferencesForm =
  NonNullable<UpdateUserPreferencesMutationVariables>;

function NostrSettingsTab() {
  const query = useMyNostrSettingsQuery();

  const { relayPool } = useRelayPool();
  const { relaysStatus } = useRelayPoolStatus(relayPool);

  if (query.networkStatus === NetworkStatus.loading)
    return <PreferencesTabSkeleton />;

  if (!query.data?.me) return <NotFoundPage />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
      <div className="md:col-span-2 flex flex-col gap-24">
        <LinkedNostrKeys keys={query.data.me.nostr_keys} />
        <GeneratedKeysCard
          nostr_prv_key={query.data.me.private_data.default_nostr_prv_key}
          nostr_pub_key={query.data.me.private_data.default_nostr_pub_key}
        />
        <Card>
          <p className="text-body2 font-bold">📡 Your Preferred Relays List</p>
          <p className="mt-8 text-body4 text-gray-600">
            When interacting with Nostr network, you are connected to a bunch of
            relays that you read & write data from & to.
            <br /> <br />
            You can change what relays you connect to here:
            <br />
          </p>
          <div className="mt-24">
            <RelaysList relaysConnectionStatus={relaysStatus} />
          </div>
        </Card>
      </div>
      <div className="self-start sticky-side-element">
        {/* <SaveChangesCard
                    isLoading={mutationStatus.loading}
                    isDirty={isDirty}
                    onSubmit={handleSubmit(onSubmit)}
                    onCancel={() => reset()}
                /> */}
      </div>
    </div>
  );
}

export default withProviders(RelayPoolProvider)(NostrSettingsTab);
