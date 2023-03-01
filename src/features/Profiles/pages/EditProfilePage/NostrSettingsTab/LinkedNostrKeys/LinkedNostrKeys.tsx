import { nip19 } from "nostr-tools";
import React from "react";
import { FiTrash2 } from "react-icons/fi";
import Button from "src/Components/Button/Button";
import Card from "src/Components/Card/Card";
import IconButton from "src/Components/IconButton/IconButton";
import { MyNostrSettingsQuery, useUnlinkNostrKeyMutation } from "src/graphql";
import { openModal } from "src/redux/features/modals.slice";
import { useAppDispatch } from "src/utils/hooks";
import CopyToClipboard from "src/Components/CopyToClipboard/CopyToClipboard";
import { extractErrorMessage } from "src/utils/helperFunctions";
import { NotificationsService } from "src/services";

interface Props {
  keys: NonNullable<MyNostrSettingsQuery["me"]>["nostr_keys"];
}

export default function LinkedNostrKeys({ keys }: Props) {
  const dispatch = useAppDispatch();

  const [mutate] = useUnlinkNostrKeyMutation();

  const handleDeleteConnection = (key: string) => {
    if (
      window.confirm(
        "Are you sure you want to unlink this nostr key from your account"
      )
    ) {
      mutate({
        variables: { key },
        onCompleted: () => {
          NotificationsService.success("Key Unlinked Successfully");
        },
      }).catch((err) => {
        const msg = extractErrorMessage(err);
        NotificationsService.error(msg ?? "Something wrong happened...");
      });
    }
  };

  return (
    <Card>
      <p className="text-body2 font-bold">🔑 My Linked Nostr Keys </p>
      <p className="mt-8 text-body4 text-gray-600">
        From here, you can add your various nostr public keys to your bolt.fun
        profile.
        <br />
        <br />
        This will:
        <br />- Allow other users to see your nostr public keys on your profile
        and follow you.
        <br />- We will display your bolt.fun profile data next to your notes on
        bolt.fun (username, avatar,...etc)
      </p>

      <p className="text-body4 text-black font-bold mt-24 mb-12">
        Currently linked pubkeys:
      </p>
      {keys.length > 0 ? (
        <ul className="flex flex-col gap-12">
          {keys.map((nostrKey) => (
            <li
              key={nostrKey.key}
              className="bg-gray-100 rounded p-16 flex gap-12 justify-between"
            >
              <div className="flex items-center min-w-0">
                <p className="overflow-hidden text-ellipsis">
                  {nip19.npubEncode(nostrKey.key)}
                  {nip19.npubEncode(nostrKey.key)}
                </p>
                <span className="relative">
                  <CopyToClipboard text={nostrKey.key} />
                </span>
              </div>
              <IconButton
                size="sm"
                className="text-red-500 shrink-0 mx-auto"
                onClick={() => handleDeleteConnection(nostrKey.key)}
              >
                <FiTrash2 />{" "}
              </IconButton>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          You haven't linked any nostr keys to this profile yet...
        </p>
      )}
      <Button
        fullWidth
        className="mt-24"
        onClick={() =>
          dispatch(openModal({ Modal: "ConnectNostrIdToProfileModal" }))
        }
      >
        🔌 Link a New Nostr Key to Profile
      </Button>
    </Card>
  );
}
