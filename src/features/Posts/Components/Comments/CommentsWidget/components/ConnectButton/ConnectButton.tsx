import { createAction } from "@reduxjs/toolkit";
import React, { useCallback } from "react";
import Button from "src/Components/Button/Button";
import { openModal } from "src/redux/features/modals.slice";
import { useAppDispatch } from "src/utils/hooks";
import { useReduxEffect } from "src/utils/hooks/useReduxEffect";

interface Props {
  onAccountConnected: () => void;
}

const CONNECT_NOSTR_ACCOUNT_ACTION = createAction<{
  src: string;
  alt?: string;
}>("NOSTR_ACCOUNT_CONNECTED")({ src: "", alt: "" });

export default function ConnectButton({ onAccountConnected }: Props) {
  const dispatch = useAppDispatch();

  const accountConnected = useCallback(() => {
    onAccountConnected();
  }, [onAccountConnected]);

  useReduxEffect(accountConnected, CONNECT_NOSTR_ACCOUNT_ACTION.type);

  const clickOpenModal = () => {
    dispatch(
      openModal({
        Modal: "ConnectNostrAccountModal",
        props: {
          callbackAction: {
            type: CONNECT_NOSTR_ACCOUNT_ACTION.type,
            payload: {},
          },
        },
      })
    );
  };

  return (
    <Button color="gray" onClick={clickOpenModal}>
      🔌 Connect your Nostr Account
    </Button>
  );
}
