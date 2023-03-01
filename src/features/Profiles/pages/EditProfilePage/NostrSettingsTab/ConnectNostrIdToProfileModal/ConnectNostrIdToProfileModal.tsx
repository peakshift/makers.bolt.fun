import { motion } from "framer-motion";
import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { IoClose } from "react-icons/io5";
import Button from "src/Components/Button/Button";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { useState } from "react";
import { NotificationsService } from "src/services";
import { useAddNewNostrKeyMutation, useMyNostrKeysQuery } from "src/graphql";
import CopyToClipboard from "src/Components/CopyToClipboard/CopyToClipboard";
import { utils as secpUtils } from "@noble/secp256k1";
import { getPublicKey, nip19 } from "nostr-tools";
import Skeleton from "react-loading-skeleton";
import { extractErrorMessage } from "src/utils/helperFunctions";
import { PayloadAction } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { PAGES_ROUTES } from "src/utils/routing";
import { NostrToolsEvent } from "nostr-relaypool/event";

export type NostrAccountConnection =
  | {
      type: "nostr-ext";
      pubkey: string;
    }
  | {
      type: "generated-keys";
      pubkey: string;
    }
  | {
      type: "inputted-keys";
      pubkey: string;
      prvkey: string;
    };

interface Props extends ModalCard {}

export default function ConnectNostrIdToProfileModal({
  onClose,
  direction,
}: Props) {
  const me = useAppSelector((s) => s.user.me);
  const [mutate] = useAddNewNostrKeyMutation();

  const clickVerify = async () => {
    if (window.nostr) {
      try {
        const pubkey = await window.nostr.getPublicKey();
        const event: NostrToolsEvent = {
          kind: 1,
          created_at: Math.round(Date.now() / 1000),
          content: `I want to link this nostr key to my bolt.fun account with id: ${me?.id}`,
          pubkey,
          tags: [],
        };

        const signedEvent = await window.nostr.signEvent(event);

        mutate({
          variables: {
            event: signedEvent,
          },
          onCompleted: (data) => {
            onClose?.();
          },
        }).catch(() => {
          NotificationsService.error("Something wrong happened...");
        });
      } catch (error) {
        NotificationsService.error("User rejected operation");
      }
    } else {
      NotificationsService.error("No nostr extension was found...");
    }
  };

  return (
    <motion.div
      custom={direction}
      variants={modalCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="modal-card !overflow-auto max-w-[522px] rounded-xl relative"
    >
      <div className="p-24">
        <IoClose
          className="absolute text-body2 top-24 right-24 hover:cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-h5 font-bold text-center">
          Link a Nostr Account to Bolt.Fun Profile
        </h2>
      </div>
      <hr className="bg-gray-200" />
      <div className="flex flex-col gap-24 p-24">
        <p className="text-body4 text-gray-600">
          To link a nostr pubkey to your profile, we will ask you to sign an
          event using the private key of the public key that you would like to
          link.
          <br />
          <Button
            onClick={clickVerify}
            color="primary"
            fullWidth
            className="mt-24"
          >
            Verify
          </Button>
        </p>
      </div>
    </motion.div>
  );
}

function verify() {
  // create verification event not signed
  // sign event
  // send signed event to API
  // close modal on success
}
