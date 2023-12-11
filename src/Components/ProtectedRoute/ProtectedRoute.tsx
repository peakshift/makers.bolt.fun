import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector, useMyUser } from "src/utils/hooks";

interface Props {
  isAllowed?: (user: ReturnType<typeof useMyUser>) => boolean;
  notAuthorizedRedirectPath?: string;
  notAllowedRedirectPath?: string;
  onlyAllow?: ("admin" | "tournament_organizer")[];
}

export default function ProtectedRoute({
  isAllowed,
  notAuthorizedRedirectPath = "/login",
  notAllowedRedirectPath = "/",
  children,
  onlyAllow,
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

  if (onlyAllow) {
    let isAllowed = false;

    if (onlyAllow.includes("admin") && user.is_admin) {
      isAllowed = true;
    } else if (
      onlyAllow.includes("tournament_organizer") &&
      user.private_data.tournaments_organizing.length > 0
    ) {
      isAllowed = true;
    }

    if (!isAllowed) return <Navigate to={notAllowedRedirectPath} replace />;
  }

  if (isAllowed && !isAllowed(user)) {
    return <Navigate to={notAllowedRedirectPath} replace />;
  }

  return <>{children}</>;
}
