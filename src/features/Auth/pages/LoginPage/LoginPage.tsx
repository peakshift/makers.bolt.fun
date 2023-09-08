import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { fetchLnurlAuth } from "src/api/auth";
import ChooseLoginMethodCard from "../../components/ChooseLoginMethodCard/ChooseLoginMethodCard";
import LoginWithLightning from "../../components/LoginWithLightning/LoginWithLightning";
import LoginWithEmail from "../../components/LoginWithEmail/LoginWithEmail";
import LoginWithNostr from "../../components/LoginWithNostr/LoginWithNostr";
import { useMeQuery } from "src/graphql";
import { getPropertyFromUnknown, trimText } from "src/utils/helperFunctions";
import Card from "src/Components/Card/Card";

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
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMethod, setLoginMethod] = useState<
    "lightning" | "email" | "nostr" | null
  >(() => {
    const loginMethod = searchParams.get("type");
    if (
      loginMethod === "lightning" ||
      loginMethod === "email" ||
      loginMethod === "nostr"
    )
      return loginMethod;
    return null;
  });

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

  const loginMethodSearchQuery = searchParams.get("type");

  useEffect(() => {
    if (!loginMethodSearchQuery) setLoginMethod(null);
  }, [loginMethodSearchQuery]);

  const onLogin = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleChooseLoginMethod = (method: "lightning" | "email" | "nostr") => {
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
            {!isLoggedIn && loginMethod === null && (
              <ChooseLoginMethodCard
                onChooseLoginMethod={handleChooseLoginMethod}
              />
            )}
            {!isLoggedIn && loginMethod === "lightning" && (
              <Card>
                <LoginWithLightning
                  onLogin={onLogin}
                  onGoBack={() => setLoginMethod(null)}
                />
              </Card>
            )}
            {!isLoggedIn && loginMethod === "email" && (
              <Card>
                <LoginWithEmail
                  onLogin={onLogin}
                  onGoBack={() => setLoginMethod(null)}
                />
              </Card>
            )}
            {!isLoggedIn && loginMethod === "nostr" && (
              <Card>
                <LoginWithNostr
                  onLogin={onLogin}
                  onGoBack={() => setLoginMethod(null)}
                />
              </Card>
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
        </div>
      </div>
    </>
  );
}
