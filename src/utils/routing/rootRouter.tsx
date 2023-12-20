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
import { SideNavLayout, TopNavLayout } from "./layouts/index";
import { tagPageLoader } from "src/features/Posts/pages/TagPage/tagPage.loader";
import App from "src/App";
import { postDetailsPageLoader } from "src/features/Posts/pages/PostDetailsPage/postDetailsPage.loader";
import ErrorPage from "src/Components/Errors/ErrorPage/ErrorPage";
import { allTopicsPageLoader } from "src/features/Posts/pages/AllTopicsPage/allTopicsPage.loader";
import { feedPageLoader } from "src/features/Posts/pages/FeedPage/feedPage.loader";
import { Post_Type } from "src/graphql";
import { LandingPage } from "src/features/LandingPage/LandingPage";
import { EventsPage } from "src/features/Events/pages/EventsPage/EventsPage";

const HomePage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "home_page" */ "../../features/Home/pages/LandingPage/LandingPage"
      )
  )
);

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
const NostrPostDetailsPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "nostr_post_details_page" */ "../../features/Posts/pages/NostrPostDetailsPage/NostrPostDetailsPage"
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
        /* webpackChunkName: "all_topics_page" */ "../../features/Posts/pages/AllTopicsPage/AllTopicsPage"
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
        /* webpackChunkName: "project_page" */ "src/features/Projects/pages/ProjectPage/ProjectPage"
      )
  )
);
const ListProjectPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "list_project_page" */ "src/features/Projects/pages/ListProjectPage/ListProjectPage"
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
        /* webpackChunkName: "tournament_details_page" */ "../../features/Tournaments/pages/TournamentDetailsPage/TournamentDetailsPage"
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

const LoginEmailPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "login_email_page" */ "../../features/Auth/pages/LoginEmailPage/LoginEmailPage"
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

const HangoutPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "hangout_page" */ "../../features/Hangout/HangoutPage"
      )
  )
);

const PrivacyPolicyPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "privacy_policy_page" */ "../../features/Shared/pages/PrivacyPolicyPage/PrivacyPolicyPage"
      )
  )
);

const TermsAndConditionsPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "terms_conditions_page" */ "../../features/Shared/pages/TermsAndConditionsPage/TermsAndConditionsPage"
      )
  )
);

const SubscribeToNewsletterPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "subscribe_to_newsletter_page" */ "../../features/Shared/pages/SubscribeToNewsletterPage/SubscribeToNewsletterPage"
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
      <Route
        path={PAGES_ROUTES.hangout.default}
        element={
          <ProtectedRoute>
            <HangoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={PAGES_ROUTES.subscribeToNewsletter.default}
        element={<SubscribeToNewsletterPage />}
      />
      <Route element={<TopNavLayout />}>
        <Route element={<SideNavLayout />}>
          <Route
            path={PAGES_ROUTES.projects.hottest}
            element={<HottestPage />}
          />
          <Route
            path={PAGES_ROUTES.projects.byCategoryId}
            element={<CategoryPage />}
          />
          <Route
            path={PAGES_ROUTES.projects.default}
            element={<ExplorePage />}
          />

          <Route
            path={PAGES_ROUTES.tournament.default}
            element={<EventsPage />}
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
          <Route
            path={PAGES_ROUTES.blog.feed}
            element={<FeedPage />}
            loader={feedPageLoader(queryClient)}
          />
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

          <Route path={PAGES_ROUTES.home.default} element={<LandingPage />} />
          <Route path={"/BuildOnBitcoin"} element={<HomePage />} />
          <Route
            path={PAGES_ROUTES.landingPage.buildOnBitcoin}
            element={<HomePage />}
          />
        </Route>

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
          path={PAGES_ROUTES.blog.nostrStoryById}
          element={<NostrPostDetailsPage />}
        />
        <Route
          path={PAGES_ROUTES.blog.storyById}
          element={<PostDetailsPage postType={Post_Type.Story} />}
          loader={postDetailsPageLoader(queryClient, { type: Post_Type.Story })}
        />

        <Route path={PAGES_ROUTES.donate.default} element={<DonatePage />} />

        <Route
          path={PAGES_ROUTES.profile.editProfile}
          element={
            <ProtectedRoute>
              <EditProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path={PAGES_ROUTES.profile.byId} element={<ProfilePage />} />

        <Route path={PAGES_ROUTES.auth.login} element={<LoginPage />} />
        <Route
          path={PAGES_ROUTES.auth.loginEmail}
          element={<LoginEmailPage />}
        />
        <Route path={PAGES_ROUTES.auth.logout} element={<LogoutPage />} />

        <Route path={"/privacy-policy"} element={<PrivacyPolicyPage />} />

        <Route
          path={"/terms-conditions"}
          element={<TermsAndConditionsPage />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute
              notAuthorizedRedirectPath={PAGES_ROUTES.home.default}
            >
              <Navigate replace to={PAGES_ROUTES.blog.feed} />
            </ProtectedRoute>
          }
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
