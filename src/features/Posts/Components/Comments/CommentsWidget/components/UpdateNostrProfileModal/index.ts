import { lazyModal } from "src/utils/helperFunctions";

export const { LazyComponent: UpdateNostrProfileModal } = lazyModal(
  () => import("./UpdateNostrProfileModal")
);
