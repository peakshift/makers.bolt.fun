
import { lazyModal } from 'src/utils/helperFunctions';



export const { LazyComponent: EventModal, } = lazyModal(() => import('./EventModal'))
