import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import Slider from "src/Components/Slider/Slider";
import { useAppSelector, useMediaQuery } from "src/utils/hooks";
import UpdateMyProfileTab from "./UpdateMyProfileTab/UpdateMyProfileTab";
import { Helmet } from 'react-helmet'
import { MEDIA_QUERIES } from "src/utils/theme";
import PreferencesTab from "./PreferencesTab/PreferencesTab";
import RolesSkillsTab from "./RolesSkillsTab/RolesSkillsTab";
import Card from "src/Components/Card/Card";


const links = [
    {
        text: "🤠  Basic information",
        path: 'my-profile',
    },
    {
        text: "🎛️  Roles & Skills",
        path: 'roles-skills',
    },
    {
        text: "⚙️  Settings & Preferences",
        path: 'preferences',
    }
]



export default function EditProfilePage() {

    const isMediumScreen = useMediaQuery(MEDIA_QUERIES.isMedium);


    const user = useAppSelector(state => state.user.me)


    if (!user)
        return <LoadingPage />

    return (
        <>
            <Helmet>
                <title>Settings</title>
                <meta property="og:title" content='Settings' />
            </Helmet>
            <div className="page-container grid grid-cols-1 md:grid-cols-4 gap-24">
                <aside>
                    {isMediumScreen ?
                        <Card className="sticky-side-element">
                            <p className="text-body2 font-bolder text-black mb-16">Edit maker profile</p>
                            <ul className=' flex flex-col gap-8'>
                                {links.map((link, idx) =>
                                    <li key={idx}>
                                        <NavLink
                                            to={link.path}
                                            className={({ isActive }) => `flex items-start rounded-8 cursor-pointer font-bold p-12
                                 active:scale-95 transition-transform
                                ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'}
                                `}
                                        >
                                            {link.text}
                                        </NavLink>
                                    </li>)}
                            </ul>
                        </Card>
                        :
                        <div className="border-b-2 border-gray-200">
                            <Slider>
                                {links.map((link, idx) =>
                                    <NavLink
                                        to={link.path}
                                        key={idx}
                                        className={`flex items-start cursor-pointer font-bold py-12
                                                active:scale-95 transition-transform`}
                                        style={({ isActive }) => ({
                                            boxShadow: isActive ? '0px 2px var(--primary)' : 'none'
                                        })}
                                    >
                                        {link.text}
                                    </NavLink>
                                )}
                            </Slider>
                        </div>
                    }
                </aside>
                <main className="md:col-span-3">
                    <Routes>
                        <Route index element={<Navigate to='my-profile' />} />
                        <Route path='my-profile' element={<UpdateMyProfileTab />} />
                        <Route path='roles-skills' element={<RolesSkillsTab />} />
                        <Route path='preferences' element={<PreferencesTab />
                        } />
                    </Routes>
                </main>
            </div>
        </>
    )
}
