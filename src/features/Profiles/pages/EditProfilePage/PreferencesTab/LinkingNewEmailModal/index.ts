import { lazyModal } from "src/utils/helperFunctions";

export const { LazyComponent: LinkingNewEmailModal } = lazyModal(
  () => import("./LinkingNewEmailModal")
);
