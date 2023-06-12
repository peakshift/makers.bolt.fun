import { motion } from "framer-motion";
import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { IoClose } from "react-icons/io5";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { useAppSelector } from "src/utils/hooks";
import Button from "src/Components/Button/Button";
import { createRoute } from "src/utils/routing";

interface Props extends ModalCard {
  tournamentId: number;
}

export default function RegistrationSuccess({
  onClose,
  direction,
  ...props
}: Props) {
  const me = useAppSelector((state) => state.user.me);

  if (!me) throw new Error("User not defined");

  return (
    <motion.div
      custom={direction}
      variants={modalCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="modal-card max-w-[442px] rounded-xl relative"
    >
      <div className="p-16 md:p-24">
        <IoClose
          className="absolute text-body2 top-16 right-16 hover:cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-h5 font-bold text-center">
          Registration succeeded!! ✅
        </h2>
      </div>
      <hr className="bg-gray-200" />
      <div className="flex flex-col justify-center gap-16 items-center text-center p-16 md:p-24">
        <Avatar src={me.avatar} width={80} />
        <div className="flex flex-col gap-4 max-w-full">
          <p className="text-body3 text-gray-900 font-medium overflow-hidden text-ellipsis">
            {me.name}
          </p>
          <p className="text-body4 text-gray-600">{me.jobTitle}</p>
        </div>

        <p className="text-body4 text-gray-600">
          Nice work! You’ve successfully registered for the tournament. You can
          get started with some of the options below!
        </p>

        <div className="flex w-full gap-8 items-center">
          <div
            className={`shrink-0 flex flex-col justify-center items-center bg-gray-50 rounded-8 w-48 h-48`}
          >
            👾
          </div>
          <div className="self-center px-16 text-left">
            <p className="text-body4 text-gray-900 font-medium">
              Complete your maker profile
            </p>
            <p className="text-body5 text-gray-400">
              Add details to your maker profile so you stand out.
            </p>
          </div>
        </div>
        <div className="flex w-full gap-8 items-center">
          <div
            className={`shrink-0 flex flex-col justify-center items-center bg-gray-50 rounded-8 w-48 h-48`}
          >
            🤝️️️
          </div>
          <div className="self-center px-16 text-left">
            <p className="text-body4 text-gray-900 font-medium">
              Find makers to team up with
            </p>
            <p className="text-body5 text-gray-400">
              Recruit or find makers to team up with.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-16 w-full mt-24">
          <Button
            fullWidth
            href={createRoute({
              type: "tournament",
              tab: "makers",
              idOrSlug: props.tournamentId,
            })}
            onClick={onClose}
            color="primary"
          >
            🤝 Team up with other makers
          </Button>
          <Button
            fullWidth
            href={createRoute({ type: "edit-profile" })}
            onClick={onClose}
            color="gray"
          >
            👾 Complete maker profile
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
