import { Suspense } from "react";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";

export const Loadable = (Component: any, Loading = LoadingPage) => (props: any) => (
    <Suspense fallback={<Loading />}>
        <Component {...props} />
    </Suspense>
);
