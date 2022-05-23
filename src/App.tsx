import React, { Suspense, useEffect } from "react";
import Navbar from "src/Components/Navbar/Navbar";
import ModalsContainer from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { useAppSelector } from './utils/hooks';
import { Wallet_Service } from "./services";
import { Route, Routes } from "react-router-dom";
import { useWrapperSetup } from "./utils/Wrapper";
import LoadingPage from "./Components/LoadingPage/LoadingPage";

// Pages
const FeedPage = React.lazy(() => import("./features/Posts/pages/FeedPage/FeedPage"))
const HackathonsPage = React.lazy(() => import("./features/Hackathons/pages/HackathonsPage/HackathonsPage"))
const HottestPage = React.lazy(() => import("src/features/Projects/pages/HottestPage/HottestPage"))
const PostDetailsPage = React.lazy(() => import("./features/Posts/pages/PostDetailsPage/PostDetailsPage"))
const CategoryPage = React.lazy(() => import("src/features/Projects/pages/CategoryPage/CategoryPage"))
const ExplorePage = React.lazy(() => import("src/features/Projects/pages/ExplorePage"))

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



  return <div id="app" className='w-full'>
    <Navbar />
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/hottest" element={<HottestPage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/blog/post/:type/:id" element={<PostDetailsPage />} />
        <Route path="/blog" element={<FeedPage />} />
        <Route path="/hackathons" element={<HackathonsPage />} />
        <Route path="/" element={<ExplorePage />} />
      </Routes>
    </Suspense>
    <ModalsContainer />
  </div>;
}

export default App;
