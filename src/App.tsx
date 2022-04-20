import { useEffect } from "react";
import Navbar from "src/Components/Navbar/Navbar";
import ExplorePage from "src/features/Projects/pages/ExplorePage";
import ModalsContainer from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { useAppSelector } from './utils/hooks';
import { Wallet_Service } from "./services";
import { Route, Routes } from "react-router-dom";
import CategoryPage from "src/features/Projects/pages/CategoryPage/CategoryPage";
import { useWrapperSetup } from "./utils/Wrapper";
import HottestPage from "src/features/Projects/pages/HottestPage/HottestPage";
import FeedPage from "./features/Posts/pages/FeedPage/FeedPage";
import PostDetailsPage from "./features/Posts/pages/PostDetailsPage/PostDetailsPage";

function App() {
  const { isWalletConnected } = useAppSelector(state => ({
    isWalletConnected: state.wallet.isConnected,
  }));

  useWrapperSetup()


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



  return <div id="app" className=''>
    <Navbar />
    <Routes>
      <Route path="/hottest" element={<HottestPage />} />
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="/blog/post/:type/:id" element={<PostDetailsPage />} />
      <Route path="/blog" element={<FeedPage />} />
      <Route path="/" element={<ExplorePage />} />
    </Routes>
    <ModalsContainer />
  </div>;
}

export default App;
