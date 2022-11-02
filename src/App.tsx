import React, { Suspense, useEffect } from "react";
import ModalsContainer from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { useAppDispatch, useAppSelector } from './utils/hooks';
import { Wallet_Service } from "./services";
import { Navigate, Route, Routes } from "react-router-dom";
import { useWrapperSetup } from "./utils/Wrapper";
import LoadingPage from "./Components/LoadingPage/LoadingPage";
// import { setUser } from "./redux/features/user.slice";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { Helmet } from "react-helmet";
import { NavbarLayout } from "./utils/routing/layouts";
import { Loadable, PAGES_ROUTES } from "./utils/routing";
import { URLModal } from "react-url-modal";
import ProjectDetailsCard from 'src/features/Projects/pages/ProjectPage/ProjectDetailsCard/ProjectDetailsCard';
import Modal from "./Components/Modals/Modal/Modal";
import ReactModal from "react-modal";

// Pages
// const FeedPage = Loadable(React.lazy(() => import(  /* webpackChunkName: "feed_page" */ "./features/Posts/pages/FeedPage/FeedPage")))
// const PostDetailsPage = Loadable(React.lazy(() => import(  /* webpackChunkName: "post_details_page" */ "./features/Posts/pages/PostDetailsPage/PostDetailsPage")))
// const CreatePostPage = Loadable(React.lazy(() => import(  /* webpackChunkName: "create_post_page" */ "./features/Posts/pages/CreatePostPage/CreatePostPage")))

// const HottestPage = Loadable(React.lazy(() => import( /* webpackChunkName: "hottest_page" */ "src/features/Projects/pages/HottestPage/HottestPage")))
// const CategoryPage = Loadable(React.lazy(() => import( /* webpackChunkName: "category_page" */ "src/features/Projects/pages/CategoryPage/CategoryPage")))
// const ProjectPage = Loadable(React.lazy(() => import( /* webpackChunkName: "explore_page" */ "src/features/Projects/pages/ProjectPage/ProjectPage")))

// const HackathonsPage = Loadable(React.lazy(() => import(  /* webpackChunkName: "hackathons_page" */ "./features/Hackathons/pages/HackathonsPage/HackathonsPage")))

// const TournamentDetailsPage = Loadable(React.lazy(() => import(  /* webpackChunkName: "hackathons_page" */ "./features/Tournaments/pages/TournamentDetailsPage/TournamentDetailsPage")))

// const DonatePage = Loadable(React.lazy(() => import( /* webpackChunkName: "donate_page" */ "./features/Donations/pages/DonatePage/DonatePage")))
// const LoginPage = Loadable(React.lazy(() => import(  /* webpackChunkName: "login_page" */ "./features/Auth/pages/LoginPage/LoginPage")))
// const LogoutPage = Loadable(React.lazy(() => import(  /* webpackChunkName: "logout_page" */ "./features/Auth/pages/LogoutPage/LogoutPage")))
// const ProfilePage = Loadable(React.lazy(() => import(  /* webpackChunkName: "profile_page" */ "./features/Profiles/pages/ProfilePage/ProfilePage")))
// const EditProfilePage = Loadable(React.lazy(() => import(  /* webpackChunkName: "edit_profile_page" */ "./features/Profiles/pages/EditProfilePage/EditProfilePage")))

const ExplorePage = Loadable(React.lazy(() => import( /* webpackChunkName: "explore_page" */ "src/features/Projects/pages/ExplorePage/ExplorePage")))

const ModalWrapper = ({ children, onClose, visible }: any) => {
  return <ReactModal
    isOpen={visible}
    onRequestClose={onClose}
    overlayClassName='fixed w-full inset-0 overflow-x-hidden z-[2020] no-scrollbar'
    className=' '
    closeTimeoutMS={1000}
    contentElement={(_props, children) => <div {..._props} className={`
        ${_props.className} 
        w-screen min-h-screen relative flex flex-col justify-center items-center inset-0
         `}>
      <div
        onClick={onClose}
        className={`absolute w-full h-full top-0 left-0 bg-gray-300 bg-opacity-50`}
      ></div>
      {children}
    </div>}
  >
    {children}
  </ReactModal>
}


function App() {
  const { isWalletConnected } = useAppSelector(state => ({
    isWalletConnected: state.wallet.isConnected,
  }));

  const dispatch = useAppDispatch();
  useWrapperSetup()

  // useMeQuery({
  //   onCompleted: (data) => {
  //     dispatch(setUser(data.me))
  //   },
  //   onError: (error) => {
  //     dispatch(setUser(null))
  //   },
  // });

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
      <title >Lightning Landscape</title>
      <meta
        name="description"
        content="A directory for lightning startups, projects, and companies."

      />
      <meta
        property="og:title"
        content="Lightning Landscape"

      />
    </Helmet>
    <URLModal
      adapter={null}
      Wrapper={ModalWrapper}
      modals={{
        projectDetails: ProjectDetailsCard,
      }}
    />
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* <Route path={PAGES_ROUTES.blog.writeStory} element={<ProtectedRoute><CreatePostPage initType="story" /></ProtectedRoute>} /> */}

        <Route element={<NavbarLayout />}>
          {/* <Route path={PAGES_ROUTES.projects.hottest} element={<HottestPage />} />
          <Route path={PAGES_ROUTES.projects.byCategoryId} element={<CategoryPage />} />
        
          <Route path={PAGES_ROUTES.projects.listProject} element={<ListProjectPage />} />
          <Route path={PAGES_ROUTES.projects.projectPage} element={<ProjectPage />} />
          <Route path={PAGES_ROUTES.projects.catchProject} element={<Navigate replace to={PAGES_ROUTES.projects.default} />} />

          <Route path={PAGES_ROUTES.blog.storyById} element={<PostDetailsPage postType='story' />} />
          <Route path={PAGES_ROUTES.blog.feed} element={<FeedPage />} />
          <Route path={PAGES_ROUTES.blog.catchStory} element={<Navigate replace to={PAGES_ROUTES.blog.feed} />} />

          <Route path={PAGES_ROUTES.hackathons.default} element={<HackathonsPage />} />

          <Route path={PAGES_ROUTES.tournament.byId} element={<TournamentDetailsPage />} />

          <Route path={PAGES_ROUTES.donate.default} element={<DonatePage />} />

          <Route path={PAGES_ROUTES.profile.editProfile} element={<EditProfilePage />} />
          <Route path={PAGES_ROUTES.profile.byId} element={<ProfilePage />} />

          <Route path={PAGES_ROUTES.auth.login} element={<LoginPage />} />
          <Route path={PAGES_ROUTES.auth.logout} element={<LogoutPage />} /> */}
          <Route path={PAGES_ROUTES.projects.default} element={<ExplorePage />} />
          <Route path="/" element={<Navigate replace to={PAGES_ROUTES.projects.default} />} />
        </Route>

      </Routes>
    </Suspense>
    <ModalsContainer />
  </div>;
}

export default App;
