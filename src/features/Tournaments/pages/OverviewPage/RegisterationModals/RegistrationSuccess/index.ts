import { lazyModal } from 'src/utils/helperFunctions';

export const { LazyComponent: RegistrationSuccess } = lazyModal(() => import('./RegistrationSuccess'))