
import { lazyModal } from 'src/utils/helperFunctions';

export const { LazyComponent: ProjectListedModal } = lazyModal(() => import('./ProjectListedModal'))