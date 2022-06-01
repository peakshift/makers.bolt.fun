import React, { Suspense, useEffect } from "react";
import Navbar from "src/Components/Navbar/Navbar";
import ModalsContainer from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { useAppSelector } from './utils/hooks';
import { Wallet_Service } from "./services";
import { Navigate, Route, Routes } from "react-router-dom";
import { useWrapperSetup } from "./utils/Wrapper";
import LoadingPage from "./Components/LoadingPage/LoadingPage";

// Pages
const FeedPage = React.lazy(() => import("./features/Posts/pages/FeedPage/FeedPage"))
const HackathonsPage = React.lazy(() => import("./features/Hackathons/pages/HackathonsPage/HackathonsPage"))
const HottestPage = React.lazy(() => import("src/features/Projects/pages/HottestPage/HottestPage"))
const PostDetailsPage = React.lazy(() => import("./features/Posts/pages/PostDetailsPage/PostDetailsPage"))
const CategoryPage = React.lazy(() => import("src/features/Projects/pages/CategoryPage/CategoryPage"))
const ExplorePage = React.lazy(() => import("src/features/Projects/pages/ExplorePage"))
const DonatePage = React.lazy(() => import("./features/Donations/pages/DonatePage/DonatePage"))
const LoginPage = React.lazy(() => import("./features/Auth/pages/LoginPage/LoginPage"))
const LogoutPage = React.lazy(() => import("./features/Auth/pages/LogoutPage/LogoutPage"))

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
        <Route path="/products/hottest" element={<HottestPage />} />
        <Route path="/products/category/:id" element={<CategoryPage />} />
        <Route path="/products" element={<ExplorePage />} />

        <Route path="/blog/post/:type/:id" element={<PostDetailsPage />} />
        <Route path="/blog" element={<FeedPage />} />

        <Route path="/hackathons" element={<HackathonsPage />} />

        <Route path="/donate" element={<DonatePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />

        <Route path="/" element={<Navigate to="/products" />} />
      </Routes>
    </Suspense>
    <ModalsContainer />
  </div>;
}

export default App;
