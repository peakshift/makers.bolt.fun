import React, { Suspense, useEffect } from "react";
import ModalsContainer from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { Navigate, Route, Routes } from "react-router-dom";
import { useWrapperSetup } from "./utils/Wrapper";
import LoadingPage from "./Components/LoadingPage/LoadingPage";
import { Helmet } from "react-helmet";
import { NavbarLayout } from "./utils/routing/layouts";
import { Loadable, PAGES_ROUTES } from "./utils/routing";
import { URLModal } from "react-url-modal";
import ProjectDetailsCard from 'src/features/Projects/pages/ProjectPage/ProjectDetailsCard/ProjectDetailsCard';
import ReactModal from "react-modal";

const ExplorePage = Loadable(React.lazy(() => import( /* webpackChunkName: "explore_page" */ "src/features/Projects/pages/ExplorePage/ExplorePage")))
const AboutPage = Loadable(React.lazy(() => import( /* webpackChunkName: "about_page" */ "src/features/About/AboutPage")))

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

  useWrapperSetup()


  useEffect(() => {
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
          <Route path={PAGES_ROUTES.projects.default} element={<ExplorePage />} />
          <Route path={PAGES_ROUTES.about.default} element={<AboutPage />} />
          <Route path="/" element={<Navigate replace to={PAGES_ROUTES.projects.default} />} />
        </Route>

      </Routes>
    </Suspense>
    <ModalsContainer />
  </div>;
}

export default App;
