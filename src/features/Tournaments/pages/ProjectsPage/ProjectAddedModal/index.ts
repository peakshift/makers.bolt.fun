
import { lazyModal } from 'src/utils/helperFunctions';

export const { LazyComponent: ProjectAddedModal } = lazyModal(() => import('./ProjectAddedModal'))