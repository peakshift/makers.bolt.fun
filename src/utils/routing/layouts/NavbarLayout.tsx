import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, } from 'react-router-dom';
import ErrorPage from 'src/Components/Errors/ErrorPage/ErrorPage';
import Navbar from "src/Components/Navbar/Navbar";

export const NavbarLayout = () => {
    return <>
        <Navbar />
        <ErrorBoundary
            FallbackComponent={ErrorPage}
        >
            <Outlet />
        </ErrorBoundary>
    </>
};
