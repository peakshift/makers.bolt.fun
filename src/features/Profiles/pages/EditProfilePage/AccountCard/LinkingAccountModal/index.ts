import { lazyModal } from 'src/utils/helperFunctions';

export const { LazyComponent: LinkingAccountModal } = lazyModal(() => import('./LinkingAccountModal'))