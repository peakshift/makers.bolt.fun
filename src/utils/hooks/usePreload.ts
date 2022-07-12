import { useEffect } from 'react';

const Components = {
    PostPage: () => import('../../features/Posts/pages/PostDetailsPage/PostDetailsPage'),
    PreviewPostPage: () => import("../../features/Posts/pages/PreviewPostPage/PreviewPostPage")
}

type ComponentToLoad = keyof typeof Components;

export const usePreload = (componentToLoad: ComponentToLoad) => {
    useEffect(() => {
        Components[componentToLoad]()
    }, [componentToLoad])
}