import { lazyModal } from 'src/utils/helperFunctions';

export const { LazyComponent: AddProjectTournamentModal } = lazyModal(() => import('./AddProjectTournamentModal'))