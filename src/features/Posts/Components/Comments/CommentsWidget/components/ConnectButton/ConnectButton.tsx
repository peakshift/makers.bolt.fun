import React from "react";
import Button from "src/Components/Button/Button";
import { openModal } from "src/redux/features/modals.slice";
import { useAppDispatch } from "src/utils/hooks";

export default function ConnectButton() {
  const dispatch = useAppDispatch();

  const clickOpenModal = () => {
    dispatch(openModal({ Modal: "ConnectNostrAccountModal" }));
  };

  return (
    <Button color="primary" onClick={clickOpenModal}>
      🔌 Connect Nostr Account
    </Button>
  );
}
