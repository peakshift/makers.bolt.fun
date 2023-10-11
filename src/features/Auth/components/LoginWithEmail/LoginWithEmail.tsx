import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMeQuery } from "src/graphql";
import Button from "src/Components/Button/Button";
import {
  extractErrorMessage,
  getPropertyFromUnknown,
  trimText,
} from "src/utils/helperFunctions";
import { loginWithEmailOTP, requestOTP } from "src/api/auth";
import { NotificationsService } from "src/services";
import IconButton from "src/Components/IconButton/IconButton";
import { FaArrowLeft } from "react-icons/fa";
import { createRoute } from "src/utils/routing";

interface Props {
  onLogin: () => void;
  onGoBack: () => void;
}

export default function LoginWithEmail({ onLogin, onGoBack }: Props) {
  const [emailInput, setEmailInput] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpInput, setOtpInput] = useState("");

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
      await loginWithEmailOTP(emailInput, otpInput.trim());
      onLogin();
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

  let content = <></>;

  content = (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-24">
        <h2 className="text-h5 font-bold flex flex-wrap w-full gap-8 items-center text-gray-700">
          <span className="flex-1 min-w-min">
            <IconButton aria-label="Go back" onClick={onGoBack} className="">
              <FaArrowLeft />
            </IconButton>
          </span>
          <span className="text-center">Sign-in with Email 📧</span>
          <span className="flex-1"></span>
        </h2>
        <div>
          <label htmlFor="email" className="text-body5">
            Your Email
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
                className="input-text tracking-[.7em]"
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
            Submit
          </Button>
        )}
      </div>
    </form>
  );

  return <>{content}</>;
}

const validateEmail = (email: string) => {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
