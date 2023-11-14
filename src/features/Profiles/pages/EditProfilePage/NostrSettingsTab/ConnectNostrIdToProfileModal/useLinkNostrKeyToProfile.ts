import { useCallback } from "react";
import { useLinkNewNostrKeyMutation } from "src/graphql";
import { UnsignedNostrEvent } from "src/lib/nostr";
import { CONSTS } from "src/utils";
import { extractErrorMessage } from "src/utils/helperFunctions";
import { useAppSelector } from "src/utils/hooks";

export const useLinkNostrExtensionKeyToProfile = () => {
  const [mutate] = useLinkNewNostrKeyMutation();
  const me = useAppSelector((s) => s.user.me);

  const myId = me?.id;

  const link = useCallback(async () => {
    if (window.nostr) {
      try {
        const pubkey = await window.nostr.getPublicKey().catch((err) => {
          throw new Error("User rejected operation", err);
        });
        const event: UnsignedNostrEvent = {
          kind: 1,
          created_at: Math.round(Date.now() / 1000),
          content: `Verifying my #BOLTFUN account on Nostr
      
      My Maker Profile: https://makers.bolt.fun/profile/${myId}
      
      Join our FUN community of builders and designers
      #[0] 
      
      #BuildOnNostr #BuildOnBitcoin`,
          pubkey,
          tags: [["p", CONSTS.BF_NOSTR_PUBKEY]],
        };

        const signedEvent = await window.nostr.signEvent(event).catch((err) => {
          throw new Error("User rejected operation", err);
        });

        await mutate({
          variables: {
            event: signedEvent,
          },
        }).catch((err) => {
          throw new Error(
            extractErrorMessage(err) ?? "Error linking Nostr key to profile"
          );
        });
      } catch (err) {
        throw err;
      }
    } else {
      throw new Error("Nostr extension not found");
    }
  }, [mutate, myId]);

  return { link };
};
