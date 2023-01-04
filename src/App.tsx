import React, { Suspense, useEffect } from "react";
import ModalsContainer from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
import { Wallet_Service } from "./services";
import { useWrapperSetup } from "./utils/Wrapper";
import LoadingPage from "./Components/LoadingPage/LoadingPage";
import { useMeQuery } from "./graphql";
import { setUser } from "./redux/features/user.slice";
import { RootRouter } from "./utils/routing/rootRouter";
import { Outlet } from "react-router-dom";
import GlobalLoader from "./Components/GlobalLoader/GlobalLoader";

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
      <GlobalLoader />
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
      <ModalsContainer />
    </div>
  );
}

export default App;
