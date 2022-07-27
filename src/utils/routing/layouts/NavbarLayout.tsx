import { Outlet, } from 'react-router-dom';
import Navbar from "src/Components/Navbar/Navbar";
import { FallbackProvider } from '../FallbackProvider';

export const NavbarLayout = () => {
    return <>
        <Navbar />
        <FallbackProvider>
            <Outlet />
        </FallbackProvider>
    </>
};
