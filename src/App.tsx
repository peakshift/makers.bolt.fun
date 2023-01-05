import React, { Suspense, useEffect } from "react";
import ModalsContainer from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
import { Wallet_Service } from "./services";
import { useWrapperSetup } from "./utils/Wrapper";
import LoadingPage from "./Components/LoadingPage/LoadingPage";
import { useMeQuery } from "./graphql";
import { setUser } from "./redux/features/user.slice";
import { Outlet } from "react-router-dom";
import GlobalLoader from "./Components/GlobalLoader/GlobalLoader";
import OgTags from "./Components/OgTags/OgTags";

function App() {
  const { isWalletConnected } = useAppSelector((state) => ({
    isWalletConnected: state.wallet.isConnected,
  }));

  const dispatch = useAppDispatch();
  useWrapperSetup();

  useMeQuery({
    onCompleted: (data) => {
      dispatch(setUser(data.me));
    },
    onError: (error) => {
      dispatch(setUser(null));
    },
  });

  useEffect(() => {
    // if (typeof window.webln != "undefined") {
    //   alert('hi')
    //   window.webln.enable().then((res: any) => {
    //     dispatch(connectWallet(window.webln));
    //     console.log("called:webln.enable()", res);
    //   }).catch((err: any) => {
    //     console.log("error:webln.enable()", err);
    //   });
    // }
    setTimeout(() => {
      Wallet_Service.init();
    }, 2000);

    const loadingAppPanel = document.querySelector(".loading-app");
    loadingAppPanel?.classList.add("removed");
    setTimeout(() => {
      loadingAppPanel?.remove();
    }, 800);
  }, []);

  return (
    <div id="app" className="w-full">
      <OgTags
        title="makers.bolt.fun"
        description="A lightning app directory made for and by the bitcoin community."
        image="https://makers.bolt.fun/assets/images/og-thumbnail.jpg"
      />
      <GlobalLoader />
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
      <ModalsContainer />
    </div>
  );
}

export default App;
