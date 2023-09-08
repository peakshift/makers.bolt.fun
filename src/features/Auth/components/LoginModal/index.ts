import { lazyModal } from 'src/utils/helperFunctions';

export const { LazyComponent: LoginModal } = lazyModal(() => import('./LoginModal'))