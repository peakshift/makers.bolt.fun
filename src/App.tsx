import React, { Suspense, useEffect } from "react";
import ModalsContainer from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { useAppDispatch, useAppSelector } from './utils/hooks';
import { Wallet_Service } from "./services";
import { Navigate, Route, Routes } from "react-router-dom";
import { useWrapperSetup } from "./utils/Wrapper";
import LoadingPage from "./Components/LoadingPage/LoadingPage";
import { useMeQuery } from "./graphql";
import { setUser } from "./redux/features/user.slice";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { Helmet } from "react-helmet";
import { NavbarLayout } from "./utils/routing/layouts";
import { Loadable, PAGES_ROUTES } from "./utils/routing";



// Pages
const FeedPage = Loadable(React.lazy(() => import("./features/Posts/pages/FeedPage/FeedPage")))
const PostDetailsPage = Loadable(React.lazy(() => import("./features/Posts/pages/PostDetailsPage/PostDetailsPage")))
const CreatePostPage = Loadable(React.lazy(() => import("./features/Posts/pages/CreatePostPage/CreatePostPage")))

const HottestPage = Loadable(React.lazy(() => import("src/features/Projects/pages/HottestPage/HottestPage")))
const CategoryPage = Loadable(React.lazy(() => import("src/features/Projects/pages/CategoryPage/CategoryPage")))
const ExplorePage = Loadable(React.lazy(() => import("src/features/Projects/pages/ExplorePage")))

const HackathonsPage = Loadable(React.lazy(() => import("./features/Hackathons/pages/HackathonsPage/HackathonsPage")))

const DonatePage = Loadable(React.lazy(() => import("./features/Donations/pages/DonatePage/DonatePage")))
const LoginPage = Loadable(React.lazy(() => import("./features/Auth/pages/LoginPage/LoginPage")))
const LogoutPage = Loadable(React.lazy(() => import("./features/Auth/pages/LogoutPage/LogoutPage")))
const ProfilePage = Loadable(React.lazy(() => import("./features/Profiles/pages/ProfilePage/ProfilePage")))
const EditProfilePage = Loadable(React.lazy(() => import("./features/Profiles/pages/EditProfilePage/EditProfilePage")))




function App() {
  const { isWalletConnected } = useAppSelector(state => ({
    isWalletConnected: state.wallet.isConnected,
  }));

  const dispatch = useAppDispatch();
  useWrapperSetup()

  useMeQuery({
    onCompleted: (data) => {
      dispatch(setUser(data.me))
    },
    onError: (error) => {
      dispatch(setUser(null))
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
    }, 2000)

    const loadingAppPanel = document.querySelector('.loading-app');
    loadingAppPanel?.classList.add('removed');
    setTimeout(() => {
      loadingAppPanel?.remove()
    }, 800)

  }, []);



  return <div id="app" className='w-full'>
    <Helmet>
      <title >makers.bolt.fun</title>
      <meta
        name="description"
        content="A lightning app directory made for and by the bitcoin community."

      />
      <meta
        property="og:title"
        content="makers.bolt.fun"

      />
    </Helmet>
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path={PAGES_ROUTES.blog.createPost} element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />

        <Route element={<NavbarLayout />}>
          <Route path={PAGES_ROUTES.projects.hottest} element={<HottestPage />} />
          <Route path={PAGES_ROUTES.projects.byCategoryId} element={<CategoryPage />} />
          <Route path={PAGES_ROUTES.projects.default} element={<ExplorePage />} />

          <Route path={PAGES_ROUTES.blog.postById} element={<PostDetailsPage />} />
          <Route path={PAGES_ROUTES.blog.feed} element={<FeedPage />} />

          <Route path={PAGES_ROUTES.hackathons.default} element={<HackathonsPage />} />

          <Route path={PAGES_ROUTES.donate.default} element={<DonatePage />} />

          <Route path={PAGES_ROUTES.profile.editProfile} element={<EditProfilePage />} />
          <Route path={PAGES_ROUTES.profile.byId} element={<ProfilePage />} />

          <Route path={PAGES_ROUTES.auth.login} element={<LoginPage />} />
          <Route path={PAGES_ROUTES.auth.logout} element={<LogoutPage />} />

          <Route path="/" element={<Navigate to={PAGES_ROUTES.projects.default} />} />
        </Route>

      </Routes>
    </Suspense>
    <ModalsContainer />
  </div>;
}

export default App;
