
import { lazyModal } from 'src/utils/helperFunctions';

export const { LazyComponent: InsertVideoModal } = lazyModal(() => import('./InsertVideoModal'))