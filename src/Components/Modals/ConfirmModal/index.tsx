
import { lazyModal } from 'src/utils/helperFunctions';

export const { LazyComponent: ConfirmModal } = lazyModal(() => import('./ConfirmModal'))