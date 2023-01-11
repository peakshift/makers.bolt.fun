import { useEffect } from "react";

const Components = {
  PostPage: () =>
    import("../../features/Posts/pages/PostDetailsPage/PostDetailsPage"),
  TagPage: () => import("src/features/Posts/pages/TagPage/TagPage"),
};

type ComponentToLoad = keyof typeof Components;

export const usePreload = (componentToLoad: ComponentToLoad) => {
  useEffect(() => {
    Components[componentToLoad]();
  }, [componentToLoad]);
};
