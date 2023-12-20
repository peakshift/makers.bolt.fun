import { Outlet } from "react-router-dom";
import ProtectedRoute from "src/Components/ProtectedRoute/ProtectedRoute";

type Props = Omit<Parameters<typeof ProtectedRoute>[0], "children">;

export const ProtectedLayout = (props: Props) => {
  return (
    <ProtectedRoute {...props}>
      <Outlet />
    </ProtectedRoute>
  );
};
