import { Link, Outlet } from "react-router-dom";
import { SideNavigation } from "src/Components/SideNavigation";

export const SideNavLayout = () => {
  return (
    <>
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-24">
          <div className="hidden lg:block">
            <nav className="md:overflow-y-auto sticky-side-element flex flex-col gap-16 md:gap-24">
              <SideNavigation />
              <ul className="px-16 py-16 pb-32 flex flex-wrap gap-y-12 gap-x-12 border-t pt-32 mt-auto">
                <li className="text-body5 text-gray-500 hover:text-gray-700 w-1/2">
                  <Link to="/terms-conditions">Terms & Conditions</Link>
                </li>
                <li className="text-body5 text-gray-500 hover:text-gray-700 w-1/2">
                  <Link to="/privacy-policy">Privacy Policy</Link>{" "}
                </li>
              </ul>
            </nav>
          </div>
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
