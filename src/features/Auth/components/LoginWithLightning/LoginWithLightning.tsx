import { useCallback, useEffect, useRef, useState } from "react";
import { Grid } from "react-loader-spinner";
import { QRCodeSVG } from "qrcode.react";
import { IoRocketOutline } from "react-icons/io5";
import Button from "src/Components/Button/Button";
import { FiCopy } from "react-icons/fi";
import useCopyToClipboard from "src/utils/hooks/useCopyToClipboard";
import { fetchIsLoggedIn, fetchLnurlAuth } from "src/api/auth";
import { useErrorHandler } from "react-error-boundary";
import IconButton from "src/Components/IconButton/IconButton";
import { createRoute } from "src/utils/routing";
import { FaArrowLeft } from "react-icons/fa";

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

interface Props {
  onLogin: () => void;
  onGoBack: () => void;
}

export default function LoginWithLightning({ onLogin, onGoBack }: Props) {
  const [copiedCurrentLnurl, setCopiedCurrentLnurl] = useState(false);
  const canFetchIsLogged = useRef(true);

  const {
    loadingLnurl,
    data: { lnurl, session_token },
    error,
  } = useLnurlQuery();

  useErrorHandler(error);
  const clipboard = useCopyToClipboard();

  useEffect(() => {
    setCopiedCurrentLnurl(false);
  }, [lnurl]);

  const copyToClipboard = () => {
    setCopiedCurrentLnurl(true);
    clipboard(lnurl);
  };

  const startPolling = useCallback(() => {
    const interval = setInterval(() => {
      if (canFetchIsLogged.current === false) return;

      canFetchIsLogged.current = false;
      fetchIsLoggedIn(session_token)
        .then((is_logged_in) => {
          if (is_logged_in) {
            clearInterval(interval);
            onLogin();
          }
        })
        .catch()
        .finally(() => {
          canFetchIsLogged.current = true;
        });
    }, 2000);

    return interval;
  }, [onLogin, session_token]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (lnurl) interval = startPolling();

    return () => {
      canFetchIsLogged.current = true;
      clearInterval(interval);
    };
  }, [lnurl, startPolling]);

  let content = <></>;

  if (error)
    content = (
      <div className="flex flex-col gap-24 items-center">
        <p className="text-body3 text-red-500 font-bold">
          Something wrong happened...
        </p>
        <a href="/login" className="text body4 text-gray-500 hover:underline">
          Refresh the page
        </a>
      </div>
    );
  else if (loadingLnurl)
    content = (
      <div className="flex flex-col gap-24 items-center">
        <Grid color="var(--primary)" width="150" />
        <p className="text-body3 font-bold">Fetching Lnurl-Auth...</p>
      </div>
    );
  else
    content = (
      <div className="flex flex-col gap-24 items-center">
        <h2 className="text-h5 font-bold flex flex-wrap w-full gap-8 items-center text-gray-700">
          <span className="flex-1 min-w-min">
            <IconButton aria-label="Go back" onClick={onGoBack} className="">
              <FaArrowLeft />
            </IconButton>
          </span>
          <span className="text-center">Sign-in with Lightning ⚡</span>
          <span className="flex-1"></span>
        </h2>
        <a href={`lightning:${lnurl}`}>
          <QRCodeSVG
            width={280}
            height={280}
            value={lnurl}
            bgColor="transparent"
            imageSettings={{
              src: "/assets/images/nut_3d.png",
              width: 16,
              height: 16,
              excavate: true,
            }}
          />
        </a>
        <p className="text-gray-600 text-body4 text-center">
          Scan this QR code or copy + paste it to your lightning wallet. Or
          click to sign-in with your browser's wallet.
        </p>
        <div className="w-full grid md:grid-cols-2 gap-16">
          <a
            href={`lightning:${lnurl}`}
            className="block text-body4 text-center text-white bg-primary-500 hover:bg-primary-600 rounded-10 px-16 py-12 active:scale-90 transition-transform"
          >
            Click to connect <IoRocketOutline />
          </a>
          <Button color="gray" onClick={copyToClipboard}>
            {copiedCurrentLnurl ? "Copied!" : "Copy LNURL"} <FiCopy />
          </Button>
          <a
            href={`https://bolt.fun/story/sign-in-with-lightning--99`}
            target="_blank"
            rel="noreferrer"
            className="md:col-span-2 block text-body4 text-center text-gray-900 border border-gray-200 rounded-10 px-16 py-12 active:scale-90 transition-transform"
          >
            What is a lightning wallet?
          </a>
        </div>
      </div>
    );

  return <>{content}</>;
}
