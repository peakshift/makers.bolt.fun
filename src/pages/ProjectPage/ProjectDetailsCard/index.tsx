import React, { ComponentProps, ComponentType, Suspense } from 'react'
import ProjectDetailsCardSkeleton from './ProjectDetailsCard.Skeleton'



function lazyFactory(Factory: () => Promise<{ default: ComponentType<any>; }>) {
    const C = React.lazy(Factory)
    const preload = Factory;
    const LazyComponent = ({ direction, ...props }: ComponentProps<typeof C>) => <Suspense
        fallback={
            // <ProjectDetailsCardSkeleton direction={direction} {...props} />
            <h2>Loading Modal</h2>
        }>
        <C {...props} />
    </Suspense>

    return { LazyComponent, preload };
}

export const {
    LazyComponent: ProjectDetailsCard,
    preload: projectDetailsCardPreload
} = lazyFactory(() => import('./ProjectDetailsCard'))




