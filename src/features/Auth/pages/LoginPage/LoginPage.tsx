import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Grid } from "react-loader-spinner";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useMeQuery } from "src/graphql";
import { QRCodeSVG } from "qrcode.react";
import { IoRocketOutline } from "react-icons/io5";
import Button from "src/Components/Button/Button";
import { FiCopy } from "react-icons/fi";
import useCopyToClipboard from "src/utils/hooks/useCopyToClipboard";
import { getPropertyFromUnknown, trimText } from "src/utils/helperFunctions";
import { fetchIsLoggedIn, fetchLnurlAuth } from "src/api/auth";
import { useErrorHandler } from "react-error-boundary";
import ChooseLoginMethodCard from "../../components/ChooseLoginMethodCard/ChooseLoginMethodCard";
import LoginWithLightning from "../../components/LoginWithLightning/LoginWithLightning";
import LoginWithEmail from "../../components/LoginWithEmail/LoginWithEmail";

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
  const [searchParams, setSearchParams] = useSearchParams();

  const [loginMethod, setLoginMethod] = useState<"lightning" | "email" | null>(
    () => {
      const loginMethod = searchParams.get("type");
      if (loginMethod === "lightning" || loginMethod === "email")
        return loginMethod;
      return null;
    }
  );

  const loginMethodSearchQuery = searchParams.get("type");

  useEffect(() => {
    if (!loginMethodSearchQuery) setLoginMethod(null);
  }, [loginMethodSearchQuery]);

  const handleChooseLoginMethod = (method: "lightning" | "email") => {
    setLoginMethod(method);
    setSearchParams({ type: method });
  };

  return (
    <>
      <Helmet>
        <title>Login to BOLT.FUN</title>
        <meta property="og:title" content="Login to BOLT.FUN" />
      </Helmet>
      <div className="page-container">
        <div className="min-h-[80vh] flex flex-col justify-center items-center">
          <div className="max-w-[442px] w-full">
            {loginMethod === null && (
              <ChooseLoginMethodCard
                onChooseLoginMethod={handleChooseLoginMethod}
              />
            )}
            {loginMethod === "lightning" && <LoginWithLightning />}
            {loginMethod === "email" && <LoginWithEmail />}
          </div>
        </div>
      </div>
    </>
  );
}
