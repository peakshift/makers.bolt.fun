import { lazyModal } from "src/utils/helperFunctions";

export const { LazyComponent: ConnectNostrIdToProfileModal } = lazyModal(
  () => import("./ConnectNostrIdToProfileModal")
);
