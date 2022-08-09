
import { lazyModal } from 'src/utils/helperFunctions';

export const { LazyComponent: NoWeblnModal } = lazyModal(() => import('./NoWeblnModal'))