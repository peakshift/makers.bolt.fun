import { useCallback, useEffect } from "react";
import Navbar from "./Components/Shared/Navbar/Navbar";
import ExplorePage from "./Components/ExplorePage/ExplorePage";
import ModalsContainer from "./Components/Shared/ModalsContainer/ModalsContainer";
import { useAppDispatch, useAppSelector, useResizeListener } from './utils/hooks';
import { connectWallet } from './redux/features/wallet.slice';
import { setIsMobileScreen } from "./redux/features/theme.slice";

function App() {
  const { isWalletConnected, webln } = useAppSelector(state => ({
    isWalletConnected: state.wallet.isConnected,
    webln: state.wallet.provider,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window.webln != "undefined") {
      window.webln.enable().then((res: any) => {
        dispatch(connectWallet(window.webln));
        console.log("called:webln.enable()", res);
      }).catch((err: any) => {
        console.log("error:webln.enable()", err);
      });
    }
  }, []);

  useResizeListener(() => {
    dispatch(setIsMobileScreen(document.body.clientWidth < 768));
  }, [dispatch])


  return <div id="app" className='w-screen overflow-hidden'>
    <Navbar />
    <ExplorePage />
    <ModalsContainer />
  </div>;
}

export default App;
