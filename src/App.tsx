import { useEffect } from "react";
import Navbar from "src/Components/Navbar/Navbar";
import ExplorePage from "src/pages/ExplorePage";
import ModalsContainer from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { useAppDispatch, useAppSelector, useResizeListener } from './utils/hooks';
import { connectWallet } from 'src/redux/features/wallet.slice';
import { setIsMobileScreen } from "src/redux/features/theme.slice";

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
  }, [dispatch]);

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
