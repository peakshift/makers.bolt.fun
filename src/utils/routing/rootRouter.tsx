import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Navigate,
  createMemoryRouter,
} from "react-router-dom";
import React, { useState } from "react";
import { Loadable } from "./loadable";
import { ApolloClient, useApolloClient } from "@apollo/client";
import { PAGES_ROUTES } from "./routes";
import ProtectedRoute from "src/Components/ProtectedRoute/ProtectedRoute";
import { NavbarLayout } from "./layouts";
import { tagPageLoader } from "src/features/Posts/pages/TagPage/tagPage.loader";
import App from "src/App";
import { postDetailsPageLoader } from "src/features/Posts/pages/PostDetailsPage/postDetailsPage.loader";
import ErrorPage from "src/Components/Errors/ErrorPage/ErrorPage";
import { allTopicsPageLoader } from "src/features/Posts/pages/AllTopicsPage/allTopicsPage.loader";

const FeedPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "feed_page" */ "../../features/Posts/pages/FeedPage/FeedPage"
      )
  )
);
const PostDetailsPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "post_details_page" */ "../../features/Posts/pages/PostDetailsPage/PostDetailsPage"
      )
  )
);
const CreatePostPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "create_post_page" */ "../../features/Posts/pages/CreatePostPage/CreatePostPage"
      )
  )
);
const TagPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "tag_page" */ "../../features/Posts/pages/TagPage/TagPage"
      )
  )
);

const AllTopicsPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "tag_page" */ "../../features/Posts/pages/AllTopicsPage/AllTopicsPage"
      )
  )
);

const HottestPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "hottest_page" */ "src/features/Projects/pages/HottestPage/HottestPage"
      )
  )
);
const CategoryPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "category_page" */ "src/features/Projects/pages/CategoryPage/CategoryPage"
      )
  )
);
const ExplorePage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "explore_page" */ "src/features/Projects/pages/ExplorePage"
      )
  )
);
const ProjectPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "explore_page" */ "src/features/Projects/pages/ProjectPage/ProjectPage"
      )
  )
);
const ListProjectPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "explore_page" */ "src/features/Projects/pages/ListProjectPage/ListProjectPage"
      )
  )
);

const HackathonsPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "hackathons_page" */ "../../features/Hackathons/pages/HackathonsPage/HackathonsPage"
      )
  )
);

const TournamentDetailsPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "hackathons_page" */ "../../features/Tournaments/pages/TournamentDetailsPage/TournamentDetailsPage"
      )
  )
);

const DonatePage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "donate_page" */ "../../features/Donations/pages/DonatePage/DonatePage"
      )
  )
);
const LoginPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "login_page" */ "../../features/Auth/pages/LoginPage/LoginPage"
      )
  )
);
const LogoutPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "logout_page" */ "../../features/Auth/pages/LogoutPage/LogoutPage"
      )
  )
);
const ProfilePage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "profile_page" */ "../../features/Profiles/pages/ProfilePage/ProfilePage"
      )
  )
);
const EditProfilePage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "edit_profile_page" */ "../../features/Profiles/pages/EditProfilePage/EditProfilePage"
      )
  )
);

const createRoutes = (queryClient: ApolloClient<object>) =>
  createRoutesFromElements(
    <Route element={<App />} errorElement={<ErrorPage />}>
      <Route
        path={PAGES_ROUTES.blog.writeStory}
        element={
          <ProtectedRoute>
            <CreatePostPage initType="story" />
          </ProtectedRoute>
        }
      />
      <Route element={<NavbarLayout />}>
        <Route path={PAGES_ROUTES.projects.hottest} element={<HottestPage />} />
        <Route
          path={PAGES_ROUTES.projects.byCategoryId}
          element={<CategoryPage />}
        />
        <Route path={PAGES_ROUTES.projects.default} element={<ExplorePage />} />
        <Route
          path={PAGES_ROUTES.projects.listProject}
          element={<ListProjectPage />}
        />
        <Route
          path={PAGES_ROUTES.projects.projectPage}
          element={<ProjectPage />}
        />
        <Route
          path={PAGES_ROUTES.projects.catchProject}
          element={<Navigate replace to={PAGES_ROUTES.projects.default} />}
        />

        <Route
          path={PAGES_ROUTES.blog.storyById}
          element={<PostDetailsPage postType="story" />}
          loader={postDetailsPageLoader(queryClient, { type: "story" })}
        />
        <Route
          path={PAGES_ROUTES.blog.tagPage}
          element={<TagPage />}
          loader={tagPageLoader(queryClient)}
        />

        <Route
          path={PAGES_ROUTES.blog.topicsPage}
          element={<AllTopicsPage />}
          loader={allTopicsPageLoader(queryClient)}
        />
        <Route path={PAGES_ROUTES.blog.feed} element={<FeedPage />} />
        <Route
          path={PAGES_ROUTES.blog.catchStory}
          element={<Navigate replace to={PAGES_ROUTES.blog.feed} />}
        />

        <Route
          path={PAGES_ROUTES.hackathons.default}
          element={<HackathonsPage />}
        />

        <Route
          path={PAGES_ROUTES.tournament.byId}
          element={<TournamentDetailsPage />}
        />

        <Route path={PAGES_ROUTES.donate.default} element={<DonatePage />} />

        <Route
          path={PAGES_ROUTES.profile.editProfile}
          element={<EditProfilePage />}
        />
        <Route path={PAGES_ROUTES.profile.byId} element={<ProfilePage />} />

        <Route path={PAGES_ROUTES.auth.login} element={<LoginPage />} />
        <Route path={PAGES_ROUTES.auth.logout} element={<LogoutPage />} />

        <Route
          path="/"
          element={<Navigate replace to={PAGES_ROUTES.blog.feed} />}
        />
      </Route>
    </Route>
  );

type CreateRouterOptions = Parameters<typeof createMemoryRouter>[1];

export const createRouter = (
  client: ApolloClient<object>,
  options?: CreateRouterOptions
) => {
  const routes = createRoutes(client);

  return createBrowserRouter(routes, options);
};

export const RootRouter = (props: CreateRouterOptions) => {
  const client = useApolloClient();
  const [router] = useState(() =>
    createRouter(client, { initialEntries: props?.initialEntries })
  );

  return <RouterProvider router={router} />;
};
