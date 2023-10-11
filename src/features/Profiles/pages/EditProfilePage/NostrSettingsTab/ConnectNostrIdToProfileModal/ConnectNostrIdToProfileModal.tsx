import { motion } from "framer-motion";
import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { IoClose } from "react-icons/io5";
import Button from "src/Components/Button/Button";
import { useAppSelector } from "src/utils/hooks";
import { NotificationsService } from "src/services";
import { useLinkNewNostrKeyMutation } from "src/graphql";
import { extractErrorMessage } from "src/utils/helperFunctions";
import { CONSTS } from "src/utils";
import { UnsignedNostrEvent } from "src/lib/nostr";

interface Props extends ModalCard {}

export default function ConnectNostrIdToProfileModal({
  onClose,
  direction,
}: Props) {
  const me = useAppSelector((s) => s.user.me);
  const [mutate] = useLinkNewNostrKeyMutation();

  const clickVerify = async () => {
    if (window.nostr) {
      try {
        const pubkey = await window.nostr.getPublicKey();
        const event: UnsignedNostrEvent = {
          kind: 1,
          created_at: Math.round(Date.now() / 1000),
          content: `Verifying my #BOLTFUN account on Nostr

My Maker Profile: https://makers.bolt.fun/profile/${me?.id}

Join our FUN community of builders and designers
#[0] 

#BuildOnNostr #BuildOnBitcoin`,
          pubkey,
          tags: [["p", CONSTS.BF_NOSTR_PUBKEY]],
        };

        const signedEvent = await window.nostr.signEvent(event);

        mutate({
          variables: {
            event: signedEvent,
          },
          onCompleted: (data) => {
            onClose?.();
            NotificationsService.success("Key Linked Successfully!");
          },
        }).catch((err) => {
          const msg = extractErrorMessage(err);
          NotificationsService.error(msg ?? "Something wrong happened...");
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
          Link a Nostr Key to BOLT.FUN Profile
        </h2>
      </div>
      <hr className="bg-gray-200" />
      <div className="flex flex-col gap-24 p-24">
        <p className="text-body4 text-gray-600">
          To link a nostr pubkey to your profile, we will just ask you to sign a
          verification event using the private key of the account that you would
          like to add.
          <br />
          <br />
          You'll need to have an extension that stores your private key enabled.
          <Button
            onClick={clickVerify}
            color="primary"
            fullWidth
            className="mt-24"
          >
            Verify Using Extension
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
