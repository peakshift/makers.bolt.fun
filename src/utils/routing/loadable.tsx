import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import LoadablePage from "./Page";

export const Loadable = (Component: any, Loading = LoadingPage) => (props: any) => (
    <LoadablePage>
        <Component {...props} />
    </LoadablePage>
);
