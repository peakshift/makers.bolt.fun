import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector, useMyUser } from "src/utils/hooks";

interface Props {
  isAllowed?: (user: ReturnType<typeof useMyUser>) => boolean;
  notAuthorizedRedirectPath?: string;
  notAllowedRedirectPath?: string;
  onlyAdmins?: boolean;
}

export default function ProtectedRoute({
  isAllowed,
  notAuthorizedRedirectPath = "/login",
  notAllowedRedirectPath = "/",
  children,
  onlyAdmins,
}: PropsWithChildren<Props>) {
  const user = useAppSelector((state) => state.user.me);

  const location = useLocation();

  if (user === undefined) return <></>;

  if (user === null)
    return (
      <Navigate
        to={notAuthorizedRedirectPath}
        replace
        state={{ from: location.pathname }}
      />
    );

  if (onlyAdmins) return <Navigate to={notAllowedRedirectPath} replace />;

  if (isAllowed && !isAllowed(user)) {
    return <Navigate to={notAllowedRedirectPath} replace />;
  }

  return <>{children}</>;
}
