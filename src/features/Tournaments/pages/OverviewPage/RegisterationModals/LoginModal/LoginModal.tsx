import { motion } from "framer-motion";
import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { IoClose } from "react-icons/io5";
import { useAppDispatch } from "src/utils/hooks";
import ChooseLoginMethods from "src/features/Auth/components/ChooseLoginMethods/ChooseLoginMethods";
import { ComponentProps, useCallback, useState } from "react";
import { Direction, replaceModal } from "src/redux/features/modals.slice";
import ChooseLoginMethodCard from "src/features/Auth/components/ChooseLoginMethodCard/ChooseLoginMethodCard";
import LoginWithEmail from "src/features/Auth/components/LoginWithEmail/LoginWithEmail";
import LoginWithLightning from "src/features/Auth/components/LoginWithLightning/LoginWithLightning";
import LoginWithNostr from "src/features/Auth/components/LoginWithNostr/LoginWithNostr";
import { NotificationsService } from "src/services";
import { useMeTournamentQuery } from "src/graphql";

interface Props extends ModalCard {
  tournamentId: number;
}

export default function LinkingAccountModal({
  onClose,
  direction,
  tournamentId,
  ...props
}: Props) {
  const [loginMethod, setLoginMethod] =
    useState<"lightning" | "email" | "nostr" | null>(null);

  const handleChooseLoginMethod: ComponentProps<
    typeof ChooseLoginMethods
  >["onChooseLoginMethod"] = (method) => {
    setLoginMethod(method);
  };

  const meQuery = useMeTournamentQuery({
    variables: {
      id: tournamentId,
    },
    onCompleted: (data) => {
      if (data.me) {
        const already_registerd = !!data.tournamentParticipationInfo;
        if (already_registerd) {
          onClose?.();
          NotificationsService.info("You are already registered");
        } else
          dispatch(
            replaceModal({
              Modal: "RegisterTournamet_RegistrationDetails",
              direction: Direction.NEXT,
              props: { tournamentId },
            })
          );
      }
    },
  });

  const refetch = meQuery.refetch;

  const dispatch = useAppDispatch();

  const onLogin = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <motion.div
      custom={direction}
      variants={modalCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="modal-card max-w-[442px] rounded-xl relative"
    >
      {loginMethod === null && (
        <div className="p-16 md:p-24">
          <IoClose
            className="absolute text-body2 top-16 right-16 hover:cursor-pointer"
            onClick={onClose}
          />
          <h2 className="text-h5 font-bold text-center">
            Connect ⚡️ your maker profile
          </h2>
        </div>
      )}
      <hr className="bg-gray-200" />
      <div className=" p-16 md:p-24">
        {loginMethod === null && (
          <p className="text-gray-600 text-body4 text-left mb-16">
            To register for this tournament, you need a maker profile. Luckily,
            this is very easy!
            <br />
            To sign in or create an account, choose one of the methods below.
          </p>
        )}
        {loginMethod === null && (
          <ChooseLoginMethods onChooseLoginMethod={handleChooseLoginMethod} />
        )}

        {loginMethod === "lightning" && (
          <LoginWithLightning
            onLogin={onLogin}
            onGoBack={() => setLoginMethod(null)}
          />
        )}
        {loginMethod === "email" && (
          <LoginWithEmail
            onLogin={onLogin}
            onGoBack={() => setLoginMethod(null)}
          />
        )}
        {loginMethod === "nostr" && (
          <LoginWithNostr
            onLogin={onLogin}
            onGoBack={() => setLoginMethod(null)}
          />
        )}
      </div>
    </motion.div>
  );
}
