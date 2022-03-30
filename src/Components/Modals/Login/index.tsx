import { lazyModal } from "src/utils/helperFunctions";

export const { LazyComponent: Login_ExternalWalletCard } = lazyModal(() => import('./Login_ExternalWalletCard'))
export const { LazyComponent: Login_NativeWalletCard } = lazyModal(() => import('./Login_NativeWalletCard'))
export const { LazyComponent: Login_ScanningWalletCard } = lazyModal(() => import('./Login_ScanningWalletCard'))
export const { LazyComponent: Login_SuccessCard } = lazyModal(() => import('./Login_SuccessCard'))