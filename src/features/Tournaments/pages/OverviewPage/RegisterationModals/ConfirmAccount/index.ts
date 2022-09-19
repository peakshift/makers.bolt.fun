import { lazyModal } from 'src/utils/helperFunctions';

export const { LazyComponent: ConfirmAccount } = lazyModal(() => import('./ConfirmAccount'))