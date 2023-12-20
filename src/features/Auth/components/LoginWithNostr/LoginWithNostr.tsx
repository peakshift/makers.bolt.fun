import { useRef, useState } from "react";
import Button from "src/Components/Button/Button";
import { extractErrorMessage } from "src/utils/helperFunctions";
import { loginWithNostrOTP, requestOTP } from "src/api/auth";
import { NotificationsService } from "src/services";
import IconButton from "src/Components/IconButton/IconButton";
import { FaArrowLeft, FaChevronDown } from "react-icons/fa";
import { nip05, nip19 } from "nostr-tools";

interface Props {
  onLogin: () => void;
  onGoBack: () => void;
}

export default function LoginWithNostr({ onLogin, onGoBack }: Props) {
  const [pubkeyInput, setPubkeyInput] = useState("");
  const [pubkeyValid, setPubkeyValid] = useState(false);

  const [showRelayInput, setShowRelayInput] = useState(false);
  const [relayUrlInput, setRelayUrlInput] = useState("");
  const [relayUrlValid, setRelayUrlValid] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingRequetOTPAgain, setLoadingRequetOTPAgain] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  const otpSentBefore = useRef(false);

  otpSentBefore.current = otpSentBefore.current || otpSent;

  const onRequestOTP = async () => {
    const hexKey = await getHexPubkey(pubkeyInput.trim());
    setPubkeyValid(!!hexKey);

    if (!hexKey) throw new Error("Invalid Nostr Public Key or NIP05");

    await requestOTP({ nostrPubkey: hexKey, relay: relayUrlInput.trim() });
    setOtpSent(true);
    NotificationsService.info("OTP sent");
  };

  const submitOTP = async () => {
    const hexKey = await getHexPubkey(pubkeyInput.trim());
    if (!hexKey) throw new Error("Invalid Nostr Public Key or NIP05");

    await loginWithNostrOTP(hexKey, otpInput.trim());
    onLogin();
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

  content = (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-24">
        <h2 className="text-h5 font-bold flex flex-wrap w-full gap-8 items-center text-gray-700">
          <span className="flex-1 min-w-min">
            <IconButton aria-label="Go back" onClick={onGoBack} className="">
              <FaArrowLeft />
            </IconButton>
          </span>
          <span className="text-center">Sign-in with Nostr 🦩</span>
          <span className="flex-1"></span>
        </h2>
        <p className="text-gray-600">
          Enter your nostr{" "}
          <span className="font-bold">public key or NIP05</span> below, & we
          will send you a DM containing an OTP (One Time Password) that you can
          use to sign-in.
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
              that we know of, but there's a good chance that your nostr client
              isn't connected to any of them. <br /> So you can enter a relay
              URL below, and we will send the OTP to that relay.
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

  return <>{content}</>;
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
