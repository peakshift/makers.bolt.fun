import { motion } from "framer-motion";
import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { QRCodeSVG } from "qrcode.react";
import Button from "src/Components/Button/Button";
import { FiCopy } from "react-icons/fi";
import useCopyToClipboard from "src/utils/hooks/useCopyToClipboard";
import { useApolloClient } from "@apollo/client";
import { IoClose } from "react-icons/io5";
import IconButton from "src/Components/IconButton/IconButton";
import { FaArrowLeft } from "react-icons/fa";
import {
  extractErrorMessage,
  getPropertyFromUnknown,
  trimText,
} from "src/utils/helperFunctions";
import { NotificationsService } from "src/services";
import {
  linkEmailToAccount,
  loginWithEmailOTP,
  requestOTP,
} from "src/api/auth";

export default function LinkingNewEmailModal({
  onClose,
  direction,
  ...props
}: ModalCard) {
  const apolloClient = useApolloClient();

  const [emailInput, setEmailInput] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  const done = () => {
    apolloClient.refetchQueries({
      include: ["MyProfilePreferences"],
    });
    onClose?.();
  };

  const onRequestOTP = () => {
    setLoading(true);
    requestOTP({ email: emailInput })
      .then((res) => {
        setOtpSent(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const submitOTP = async () => {
    try {
      setLoading(true);
      await linkEmailToAccount(emailInput, otpInput.trim());
      NotificationsService.success("Email linked successfully!");
      done();
    } catch (error) {
      NotificationsService.error(
        extractErrorMessage(error) ??
          "Something went wrong on our side, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailInput(value);

    const isEmailValid = validateEmail(value);
    setEmailValid(isEmailValid);

    setOtpSent(false);
    setOtpInput("");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otpSent) submitOTP();
    else onRequestOTP();
  };

  const content = (
    <form onSubmit={onSubmit} className="w-full items-stretch">
      <div className="flex flex-col gap-24">
        <div>
          <label htmlFor="email" className="text-body5">
            Email Address
          </label>
          <div className="input-wrapper mt-8 relative">
            <input
              id="email"
              value={emailInput}
              onChange={onChangeEmail}
              type="email"
              className="input-text"
            />
          </div>
        </div>
        {otpSent && (
          <div>
            <p className="text-gray-900">
              A 6-digits OTP has been sent to your email, please verify it
              below.
            </p>
            <div className="input-wrapper mt-16 relative">
              <input
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                type="text"
                placeholder="XXXXXX"
                className="input-text"
              />
            </div>
            <p className="mt-8 text-body5 text-gray-700">
              Didn't Receive it yet?{" "}
              <button
                onClick={onRequestOTP}
                type="button"
                className="text-primary-500 underline"
              >
                Send Again
              </button>
            </p>
          </div>
        )}
        {!otpSent && (
          <Button
            disabled={!emailValid}
            fullWidth
            color="primary"
            className="mt-16"
            isLoading={loading}
            type="submit"
          >
            Continue
          </Button>
        )}
        {otpSent && (
          <Button
            disabled={!emailValid || otpInput.trim().length < 6}
            fullWidth
            color="primary"
            className="mt-16"
            isLoading={loading}
            type="submit"
          >
            Verify
          </Button>
        )}
      </div>
    </form>
  );

  return (
    <motion.div
      custom={direction}
      variants={modalCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="modal-card max-w-[442px] p-24 rounded-xl relative"
    >
      <IoClose
        className="absolute text-body2 top-24 right-24 hover:cursor-pointer"
        onClick={onClose}
      />
      <h2 className="text-h5 font-bold text-center">
        Link a new Email Address
      </h2>
      {content}
    </motion.div>
  );
}

const validateEmail = (email: string) => {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
