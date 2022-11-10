import { useLocation } from "react-router-dom"




export const useCurrentSection = () => {
    const location = useLocation();

    if (location.pathname.startsWith('/projects'))
        return 'projects';
    if (location.pathname.startsWith('/about'))
        return 'about';
    return 'other'
}