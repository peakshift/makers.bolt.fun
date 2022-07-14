import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "src/utils/hooks";

interface Props {
    isAllowed?: boolean;
    notAuthorizedRedirectPath?: string
    notAllowedRedirectPath?: string
}

export default function ProtectedRoute({
    isAllowed = true,
    notAuthorizedRedirectPath = '/login',
    notAllowedRedirectPath = '/',
    children,
}: PropsWithChildren<Props>) {

    const user = useAppSelector(state => state.user.me);

    const location = useLocation();



    if (user === undefined) return <></>

    if (user === null)
        return <Navigate to={notAuthorizedRedirectPath} replace state={{ from: location.pathname }} />;


    if (!isAllowed) {
        return <Navigate to={notAllowedRedirectPath} replace />;
    }

    return <>{children}</>;
};
