import { lazyModal } from "src/utils/helperFunctions";

export const { LazyComponent: IssueBadgeToMakerModal } = lazyModal(
  () => import("./IssueBadgeToMakerModal")
);
