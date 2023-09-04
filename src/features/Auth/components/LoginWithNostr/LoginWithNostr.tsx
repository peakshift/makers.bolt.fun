import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMeQuery } from "src/graphql";
import Button from "src/Components/Button/Button";
import {
  extractErrorMessage,
  getPropertyFromUnknown,
  trimText,
} from "src/utils/helperFunctions";
import { loginWithEmailOTP, loginWithNostrOTP, requestOTP } from "src/api/auth";
import { NotificationsService } from "src/services";
import IconButton from "src/Components/IconButton/IconButton";
import { FaArrowLeft, FaChevronDown } from "react-icons/fa";
import { createRoute } from "src/utils/routing";
import { nip05, nip19 } from "nostr-tools";

export default function LoginWithNostr() {
  const [pubkeyInput, setPubkeyInput] = useState("");
  const [pubkeyValid, setPubkeyValid] = useState(false);

  const [showRelayInput, setShowRelayInput] = useState(false);
  const [relayUrlInput, setRelayUrlInput] = useState("");
  const [relayUrlValid, setRelayUrlValid] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingRequetOTPAgain, setLoadingRequetOTPAgain] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const otpSentBefore = useRef(false);

  otpSentBefore.current = otpSentBefore.current || otpSent;

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

  const onRequestOTP = async () => {
    const hexKey = await getHexPubkey(pubkeyInput.trim());
    setPubkeyValid(!!hexKey);

    if (!hexKey) throw new Error("Invalid Nostr Public Key or NIP05");
    await requestOTP({ nostrPubkey: pubkeyInput, relay: relayUrlInput });
    setOtpSent(true);
    NotificationsService.info("OTP sent");
  };

  const submitOTP = async () => {
    await loginWithNostrOTP(pubkeyInput, otpInput.trim());
    await refetch();
  };

  const onPubkeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPubkeyInput(value);

    setOtpSent(false);
    setOtpInput("");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (otpSent) await submitOTP();
      else await onRequestOTP();
    } catch (error) {
      NotificationsService.error(
        extractErrorMessage(error) ?? "Sorry. Something went wrong..."
      );
    }
    setLoading(false);
  };

  const onRequestOTPAgain = async () => {
    setLoadingRequetOTPAgain(true);
    try {
      await onRequestOTP();
    } catch (error) {
      NotificationsService.error(
        extractErrorMessage(error) ?? "Sorry. Something went wrong..."
      );
    }
    setLoadingRequetOTPAgain(false);
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
        className="w-full max-w-[442px] bg-white border-2 border-gray-200 rounded-16 p-16 items-stretch"
      >
        <div className="flex flex-col gap-24">
          <h2 className="text-h4 font-bold flex flex-wrap w-full gap-8 items-center text-gray-700">
            <span className="flex-1 min-w-min">
              <IconButton
                aria-label="Go back"
                href={createRoute({ type: "login" })}
                className=""
              >
                <FaArrowLeft />
              </IconButton>
            </span>
            <span className="text-center">Login with Nostr 🦩</span>
            <span className="flex-1"></span>
          </h2>
          <p className="text-gray-600">
            Enter your nostr public key or NIP05 below, & we will send you a DM
            containing an OTP (One Time Password) that you can use to login.
          </p>
          <div>
            <label htmlFor="pubkey" className="text-body5">
              Nostr Public Key OR NIP05
            </label>
            <div className="input-wrapper mt-8 relative">
              <input
                id="pubkey"
                value={pubkeyInput}
                onChange={onPubkeyChange}
                type="text"
                className="input-text"
              />
            </div>
          </div>
          {/* <div>
            <label htmlFor="relay-url" className="text-body5">
              Preferred Relay URL
            </label>
            <div className="input-wrapper mt-8 relative">
              <input
                id="relay-url"
                value={emailInput}
                onChange={onChangeEmail}
                type="text"
                className="input-text"
              />
            </div>
          </div> */}
          {otpSent && (
            <div>
              <p className="text-gray-900">
                A 6-digits OTP has been sent to your nostr account DMs, please
                check it out and enter it below.
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
            </div>
          )}
          {otpSentBefore.current && (
            <button
              onClick={() => setShowRelayInput((v) => !v)}
              type="button"
              className="text-gray-900 font-bold underline flex justify-between items-center gap-8 w-full"
            >
              <span>I don't see the message in my DMs...</span>
              <FaChevronDown
                className={`text-gray-900 ${showRelayInput && "rotate-180"}`}
              />
            </button>
          )}
          {showRelayInput && (
            <div className="-mt-8">
              <p className="text-gray-600">
                By default, we send the DM to most of the popular nostr relays
                that we know of, but there's a good chance that your nostr
                client isn't connected to any of them. <br /> So you can enter a
                relay URL below, and we will send the OTP to that relay.
              </p>
              <div className="mt-8">
                <label htmlFor="relay" className="text-body5">
                  Relay URL to Use
                </label>
                <div className="input-wrapper mt-8 relative">
                  <input
                    id="relay"
                    value={relayUrlInput}
                    onChange={(e) => setRelayUrlInput(e.target.value)}
                    type="text"
                    placeholder="wss://relay.nostr.org"
                    className="input-text"
                  />
                </div>
              </div>
              {otpSent && (
                <Button
                  color="primary"
                  variant="text"
                  size="sm"
                  className="ml-auto block mt-8"
                  onClick={onRequestOTPAgain}
                  isLoading={loadingRequetOTPAgain}
                >
                  Send Code Again
                </Button>
              )}
            </div>
          )}
          {!otpSent && (
            <Button
              fullWidth
              color="primary"
              className=""
              isLoading={loading}
              type="submit"
            >
              Continue
            </Button>
          )}
          {otpSent && (
            <Button
              disabled={!pubkeyValid || otpInput.trim().length < 6}
              fullWidth
              color="primary"
              className=""
              isLoading={loading}
              type="submit"
            >
              Verify
            </Button>
          )}
        </div>
      </form>
    );

  return <div>{content}</div>;
}

const getHexPubkey = async (pubkey: string) => {
  if (!pubkey) return null;

  if (pubkey.indexOf("@") !== -1)
    return nip05.queryProfile(pubkey).then((res) => res?.pubkey);

  let value = pubkey;
  if (value?.startsWith("nostr:")) {
    value = value.replace("nostr:", "");
  }
  if (value?.startsWith("npub")) {
    try {
      return nip19.decode(value).data as string;
    } catch (error) {
      return null;
    }
  }

  // valid hex key
  if (value.match(/^[a-f0-9]{64}$/)) return value;
};
