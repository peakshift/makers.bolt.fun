import { Outlet, } from 'react-router-dom';
import Navbar from "src/Components/Navbar/Navbar";

export const NavbarLayout = () => {
    return <>
        <Navbar />
        <Outlet />
    </>
};
