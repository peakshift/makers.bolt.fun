import {
  UpdateUserPreferencesMutationVariables,
  useMyNostrSettingsQuery,
  useMyProfilePreferencesQuery,
  useUpdateUserPreferencesMutation,
} from "src/graphql";
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import PreferencesTabSkeleton from "./PreferencesTab.Skeleton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SaveChangesCard from "../SaveChangesCard/SaveChangesCard";
import { toast } from "react-toastify";
import { NotificationsService } from "src/services";
import { NetworkStatus } from "@apollo/client";
import { useAppDispatch, usePrompt } from "src/utils/hooks";
import Card from "src/Components/Card/Card";
import { nip19 } from "nostr-tools";
import CopyToClipboard from "src/Components/CopyToClipboard/CopyToClipboard";
import CommentsSettingsCard from "./CommentsSettingsCard/CommentsSettingsCard";
import RelaysList from "src/features/Posts/Components/Comments/CommentsWidget/components/RelaysList/RelaysList";
import Button from "src/Components/Button/Button";
import { openModal } from "src/redux/features/modals.slice";

interface Props {}

export type IProfilePreferencesForm =
  NonNullable<UpdateUserPreferencesMutationVariables>;

export default function NostrSettingsTab() {
  const dispatch = useAppDispatch();
  const query = useMyNostrSettingsQuery({
    onCompleted: (data) => {
      // if (data.me) reset(data.me);
    },
    notifyOnNetworkStatusChange: true,
  });

  if (query.networkStatus === NetworkStatus.loading)
    return <PreferencesTabSkeleton />;

  if (!query.data?.me) return <NotFoundPage />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
      <div className="md:col-span-2 flex flex-col gap-24">
        <Card>
          <p className="text-body2 font-bold">🔑 My Connected Nostr Keys </p>
          <p className="mt-8 text-body4 text-gray-600">
            You can connect your various nostr public keys to your bolt.fun
            profile. <br />
            This will allow other users to follow you on nostr, and allows us to
            display your info on your nostr posted content like comments.
          </p>

          <ul className="flex flex-col gap-12 mt-24">
            {query.data.me.nostr_keys.map((nostrKey) => (
              <li
                key={nostrKey.key}
                className="bg-gray-100 rounded p-16 flex gap-12 justify-between"
              >
                <p className="overflow-hidden text-ellipsis">
                  {nip19.npubEncode(nostrKey.key)}
                </p>
                <div className="shrink-0 relative">
                  <CopyToClipboard text={nostrKey.key} />
                </div>
              </li>
            ))}
          </ul>
          <Button
            fullWidth
            className="mt-24"
            onClick={() =>
              dispatch(openModal({ Modal: "ConnectNostrIdToProfileModal" }))
            }
          >
            🔌 Link New Nostr Key to Profile
          </Button>
        </Card>
        <CommentsSettingsCard
          nostr_prv_key={query.data.me.nostr_prv_key}
          nostr_pub_key={query.data.me.nostr_pub_key}
        />
        <Card>
          <p className="text-body2 font-bold">📡 Your Preferred Relays List</p>
          <p className="mt-8 text-body4 text-gray-600">
            When interacting with the Nostr network, you connect to a bunch of
            relays that you read & write data from & to.
            <br />
            Here are your relays:
          </p>
          <div className="mt-24">
            <RelaysList />
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
