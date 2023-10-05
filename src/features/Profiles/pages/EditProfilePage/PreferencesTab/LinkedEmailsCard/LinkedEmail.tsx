import { useToggle } from "@react-hookz/web";
import { createAction } from "@reduxjs/toolkit";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiTrash2, FiLock } from "react-icons/fi";
import Button from "src/Components/Button/Button";
import IconButton from "src/Components/IconButton/IconButton";
import { useReduxEffect } from "src/utils/hooks/useReduxEffect";
import { WalletKeyType } from "./LinkedEmailsCard";
import { useAppDispatch } from "src/utils/hooks";
import { openModal } from "src/redux/features/modals.slice";
import "react-popper-tooltip/dist/styles.css";
import { usePopperTooltip } from "react-popper-tooltip";
import dayjs from "dayjs";

interface Props {
  walletKey: WalletKeyType;
  hasMultiWallets?: boolean;
  onDelete: () => void;
}

export default function LinkedEmail({
  walletKey,
  hasMultiWallets,
  onDelete,
}: Props) {
  const dispatch = useAppDispatch();

  const CONFIRM_DELETE_EMAIL = useMemo(
    () =>
      createAction<{ confirmed?: boolean }>(
        `CONFIRM_DELETE_EMAIL_${walletKey.email.slice(0, 10)}`
      )({}),
    [walletKey.email]
  );

  const onConfirmDelete = useCallback(
    ({ payload: { confirmed } }: typeof CONFIRM_DELETE_EMAIL) => {
      if (confirmed) onDelete();
    },
    [onDelete]
  );

  useReduxEffect(onConfirmDelete, CONFIRM_DELETE_EMAIL.type);

  const handleDelete = () => {
    dispatch(
      openModal({
        Modal: "RemoveEmailModal",
        props: {
          callbackAction: {
            type: CONFIRM_DELETE_EMAIL.type,
            payload: { confirmed: false },
          },
        },
      })
    );
  };

  return (
    <li key={walletKey.email} className="bg-gray-100 rounded py-8 px-16">
      <div className="flex gap-16 items-center">
        <div className="flex items-center flex-grow relative min-w-0">
          <p className="text-gray-700">{walletKey.email}</p>
        </div>
        {hasMultiWallets && (
          <div className="flex justify-center">
            <IconButton
              size="sm"
              className="text-red-500 shrink-0"
              onClick={() => handleDelete()}
            >
              <FiTrash2 />{" "}
            </IconButton>
          </div>
        )}
      </div>
      <p className="text-body5 text-gray-500 italic mt-4">
        created at {dayjs(walletKey.createdAt).format("DD-MM-YYYY")}
      </p>
    </li>
  );
}
