import { motion } from "framer-motion";
import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { IoClose } from "react-icons/io5";
import ChooseLoginMethods from "src/features/Auth/components/ChooseLoginMethods/ChooseLoginMethods";
import { ComponentProps, useCallback, useState } from "react";
import LoginWithEmail from "src/features/Auth/components/LoginWithEmail/LoginWithEmail";
import LoginWithLightning from "src/features/Auth/components/LoginWithLightning/LoginWithLightning";
import LoginWithNostr from "src/features/Auth/components/LoginWithNostr/LoginWithNostr";
import { useMeQuery } from "src/graphql";
import { trimText } from "src/utils/helperFunctions";

interface Props extends ModalCard {}

export default function LinkingAccountModal({
  onClose,
  direction,
  ...props
}: Props) {
  const [loginMethod, setLoginMethod] =
    useState<"lightning" | "email" | "nostr" | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChooseLoginMethod: ComponentProps<
    typeof ChooseLoginMethods
  >["onChooseLoginMethod"] = (method) => {
    setLoginMethod(method);
  };

  const meQuery = useMeQuery({
    onCompleted: (data) => {
      if (data.me) {
        setIsLoggedIn(true);
        setTimeout(() => {
          onClose?.();
        }, 2000);
      }
    },
  });

  const refetch = meQuery.refetch;

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
        {!isLoggedIn && loginMethod === null && (
          <ChooseLoginMethods onChooseLoginMethod={handleChooseLoginMethod} />
        )}

        {!isLoggedIn && loginMethod === "lightning" && (
          <LoginWithLightning
            onLogin={onLogin}
            onGoBack={() => setLoginMethod(null)}
          />
        )}
        {!isLoggedIn && loginMethod === "email" && (
          <LoginWithEmail
            onLogin={onLogin}
            onGoBack={() => setLoginMethod(null)}
          />
        )}
        {!isLoggedIn && loginMethod === "nostr" && (
          <LoginWithNostr
            onLogin={onLogin}
            onGoBack={() => setLoginMethod(null)}
          />
        )}
        {isLoggedIn && (
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-body4">
              Hey there{" "}
              <span className="font-bold">
                @{trimText(meQuery.data?.me?.name, 10)}!!
              </span>{" "}
              👋
            </h3>
            <img
              src={meQuery.data?.me?.avatar}
              className="w-80 h-80 object-cover rounded-full outline outline-2 outline-gray-200 mt-24"
              alt=""
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
