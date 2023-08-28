import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useLocation } from "react-router-dom";
import { useMeQuery } from "src/graphql";
import Button from "src/Components/Button/Button";
import {
  extractErrorMessage,
  getPropertyFromUnknown,
  trimText,
} from "src/utils/helperFunctions";
import { fetchLnurlAuth, loginWithEmailOTP, requestOTP } from "src/api/auth";
import { NotificationsService } from "src/services";

export const useLnurlQuery = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<{ lnurl: string; session_token: string }>({
    lnurl: "",
    session_token: "",
  });

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    const doFetch = async () => {
      const res = await fetchLnurlAuth();
      if (!res?.encoded) setError(new Error("Response doesn't contain data"));
      else {
        setLoading(false);
        setData({
          lnurl: res.encoded,
          session_token: res.session_token,
        });
        timeOut = setTimeout(doFetch, 1000 * 60 * 2);
      }
    };
    doFetch().catch((err) => setError(err));

    return () => clearTimeout(timeOut);
  }, []);

  return {
    loadingLnurl: loading,
    error,
    data,
  };
};

export default function LoginPage() {
  const [emailInput, setEmailInput] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const meQuery = useMeQuery({
    onCompleted: (data) => {
      if (data.me) setIsLoggedIn(true);
    },
  });

  const refetch = meQuery.refetch;

  useEffect(() => {
    if (isLoggedIn) {
      meQuery.stopPolling();
      const timeout = setTimeout(() => {
        const cameFrom = getPropertyFromUnknown(location.state, "from");
        const navigateTo = cameFrom ? cameFrom : "/";

        navigate(navigateTo, { replace: true });
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn, location.state, meQuery, navigate]);

  const onRequestOTP = () => {
    setLoading(true);
    requestOTP(emailInput)
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
      await refetch();
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

  if (isLoggedIn)
    content = (
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
    );
  else
    content = (
      <form
        onSubmit={onSubmit}
        className="w-full max-w-[442px] bg-white border-2 border-gray-200 rounded-16 p-16 flex flex-col gap-24 items-stretch"
      >
        <h2 className="text-h4 font-bold text-center">Login with Email 📧</h2>
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

        <div className="flex gap-8">
          <input
            id="terms"
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="input-checkbox self-center"
          />
          <label htmlFor="terms" className="text-body5 text-gray-600">
            I have read the{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-primary-500"
              href="/terms-conditions"
            >
              Terms & Conditions
            </a>
          </label>
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
            disabled={!emailValid || !acceptedTerms}
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
      </form>
    );

  return (
    <>
      <Helmet>
        <title>Login to BOLT.FUN</title>
        <meta property="og:title" content="Login to BOLT.FUN" />
      </Helmet>
      <div className="page-container">
        <div className="min-h-[80vh] flex flex-col justify-center items-center">
          {content}
        </div>
      </div>
    </>
  );
}

const validateEmail = (email: string) => {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
