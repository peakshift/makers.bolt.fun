import { lazyModal } from 'src/utils/helperFunctions';

export const { LazyComponent: ConnectToMakerModal } = lazyModal(() => import('./ConnectToMakerModal'))