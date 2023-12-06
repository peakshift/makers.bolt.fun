import { createLoader } from "src/utils/routing/helpers";
import {
  AdminDashboardDocument,
  AdminDashboardQuery,
  AdminDashboardQueryVariables,
} from "src/graphql";

export type LoaderData = AdminDashboardQuery;

export const adminDashboardLoader = createLoader<AdminDashboardQueryVariables>(
  () => ({
    query: AdminDashboardDocument,
    variables: {},
  })
);
