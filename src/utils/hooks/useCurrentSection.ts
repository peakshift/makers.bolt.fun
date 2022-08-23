import { useLocation } from "react-router-dom"




export const useCurrentSection = () => {
    const location = useLocation();

    if (location.pathname.startsWith('/blog'))
        return 'blog';
    if (location.pathname.startsWith('/hackathons'))
        return 'hackathons';
    if (location.pathname.startsWith('/apps'))
        return 'apps';
    if (location.pathname.startsWith('/donate'))
        return 'donate';
    return 'other'
}