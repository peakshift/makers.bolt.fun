import { useEffect } from "react";
import Navbar from "src/Components/Navbar/Navbar";
import ExplorePage from "src/pages/ExplorePage";
import ModalsContainer from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { useAppDispatch, useAppSelector, useResizeListener } from './utils/hooks';
import { Wallet_Service } from "./services";

function App() {
  const { isWalletConnected } = useAppSelector(state => ({
    isWalletConnected: state.wallet.isConnected,
  }));

  const dispatch = useAppDispatch();

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
    }, 2000)
  }, []);

  useResizeListener(() => {
    // dispatch(setIsMobileScreen(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)));
  }, [dispatch])


  return <div id="app" className='w-screen overflow-hidden'>
    <Navbar />
    <ExplorePage />
    <ModalsContainer />
  </div>;
}

export default App;
