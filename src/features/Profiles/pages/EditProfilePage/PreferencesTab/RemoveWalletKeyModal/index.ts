import { lazyModal } from 'src/utils/helperFunctions';

export const { LazyComponent: RemoveWalletKeyModal } = lazyModal(() => import('./RemoveWalletKeyModal'))