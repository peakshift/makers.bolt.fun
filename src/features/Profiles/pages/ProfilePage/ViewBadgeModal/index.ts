import { lazyModal } from "src/utils/helperFunctions";

export const { LazyComponent: ViewBadgeModal } = lazyModal(
  () => import("./ViewBadgeModal")
);
