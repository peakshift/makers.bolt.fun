import { lazyModal } from "src/utils/helperFunctions";

export const { LazyComponent: RemoveEmailModal } = lazyModal(
  () => import("./RemoveEmailModal")
);
