
import ProjectDetailsCardSkeleton from './ProjectDetailsCard.Skeleton'
import { lazyModal } from 'src/utils/helperFunctions';



export const { LazyComponent: ProjectDetailsCard, preload: projectDetailsCardPreload } = lazyModal(() => import('./ProjectDetailsCard'), ProjectDetailsCardSkeleton)
