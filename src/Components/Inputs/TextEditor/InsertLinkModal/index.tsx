
import { lazyModal } from 'src/utils/helperFunctions';

export const { LazyComponent: InsertLinkModal } = lazyModal(() => import('./InsertLinkModal'))