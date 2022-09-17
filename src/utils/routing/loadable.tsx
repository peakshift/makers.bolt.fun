import { Suspense } from "react";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";

export function Loadable<P>(Component: React.LazyExoticComponent<(props: P) => JSX.Element>, Loading = LoadingPage) {
    return (props: P) => (
        <Suspense fallback={<Loading />}>
            <Component {...props as any} />
        </Suspense>
    )
}
