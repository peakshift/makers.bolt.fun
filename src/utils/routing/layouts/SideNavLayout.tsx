import { Outlet } from "react-router-dom";
import { SideNavigation } from "src/Components/SideNavigation/SideNavigationContext";

export const SideNavLayout = () => {
  return (
    <>
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-24">
          <div className="hidden lg:block">
            <SideNavigation />
          </div>
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
