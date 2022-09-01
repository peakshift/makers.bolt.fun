
import { lazyModal } from 'src/utils/helperFunctions';



export const { LazyComponent: EventModal, preload: projectDetailsCardPreload } = lazyModal(() => import('./EventModal'))
