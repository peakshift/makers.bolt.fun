import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Button from "src/Components/Button/Button";
import { useAppDispatch } from "src/utils/hooks";
import { PayloadAction } from "@reduxjs/toolkit";

interface Props extends ModalCard {
  callbackAction: PayloadAction<{ confirmed: boolean }>;
}

export default function RemoveEmailModal({
  onClose,
  direction,
  callbackAction,
}: Props) {
  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    const action = Object.assign({}, callbackAction);
    action.payload = { confirmed: true };
    dispatch(action);
    onClose?.();
  };

  return (
    <motion.div
      custom={direction}
      variants={modalCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="modal-card max-w-[326px] p-24 rounded-xl relative"
    >
      <IoClose
        className="absolute text-body2 top-24 right-24 hover:cursor-pointer"
        onClick={onClose}
      />
      <h2 className="text-h5 font-bold text-center">Remove Email?</h2>
      <div className="pt-16 flex flex-col gap-24 mt-16">
        <p className="text-h1 text-center">📧</p>
        <p className="text-body4 text-gray-600 text-center font-light">
          Are you sure you want to remove this email from your account?
        </p>
        <div className="grid grid-cols-2 gap-16">
          <Button color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button color="red" onClick={handleConfirm}>
            Remove
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
