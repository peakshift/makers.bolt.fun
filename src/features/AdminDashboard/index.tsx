import { useApolloClient } from "@apollo/client";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Loadable } from "src/utils/routing";
import { badgeDetailsLoader } from "./Badges/pages/BadgeDetailsPage/badgeDetails.loader";
import { updateBadgeDetailsLoader } from "./Badges/pages/CreateBadgePage/updateBadgeDetails.loader";
import { manageBadgesLoader } from "./Badges/pages/ManageBadgesPage/manageBadges.loader";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

const AdminManageBadgesPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "admin_manage_badges_page" */ "./Badges/pages/ManageBadgesPage/ManageBadgesPage"
      )
  )
);

const AdminCreateBadgePage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "admin_create_badge_page" */ "./Badges/pages/CreateBadgePage/CreateBadgePage"
      )
  )
);

const AdminUpdateBadgePage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "admin_update_badge_page" */ "./Badges/pages/CreateBadgePage/UpdateBadgePage"
      )
  )
);

const BadgeDetailsPage = Loadable(
  React.lazy(
    () =>
      import(
        /* webpackChunkName: "badge_details_page" */ "./Badges/pages/BadgeDetailsPage/BadgeDetailsPage"
      )
  )
);

export default function AdminPages() {
  const queryClient = useApolloClient();

  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="badges">
        <Route
          index
          element={<AdminManageBadgesPage />}
          loader={manageBadgesLoader(queryClient)}
        />
        <Route path="create" element={<AdminCreateBadgePage />} />
        <Route
          path=":idOrSlug/update"
          element={<AdminUpdateBadgePage />}
          loader={updateBadgeDetailsLoader(queryClient)}
        />
        <Route
          path=":idOrSlug"
          element={<BadgeDetailsPage />}
          loader={badgeDetailsLoader(queryClient)}
        />
      </Route>
    </Routes>
  );
}
