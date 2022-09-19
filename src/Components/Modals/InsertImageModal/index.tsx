
import { lazyModal } from 'src/utils/helperFunctions';

export const { LazyComponent: InsertImageModal } = lazyModal(() => import('./InsertImageModal'))