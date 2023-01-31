import { lazyModal } from "src/utils/helperFunctions";

export const { LazyComponent: ConnectNostrAccountModal } = lazyModal(
  () => import("./ConnectNostrAccountModal")
);
