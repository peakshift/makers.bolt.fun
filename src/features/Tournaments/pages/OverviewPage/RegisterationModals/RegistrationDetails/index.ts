import { lazyModal } from 'src/utils/helperFunctions';

export const { LazyComponent: RegistrationDetails } = lazyModal(() => import('./RegistrationDetails'))