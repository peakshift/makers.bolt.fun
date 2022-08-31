import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import Slider from "src/Components/Slider/Slider";
import { useProfileQuery } from "src/graphql";
import { useAppSelector, useMediaQuery } from "src/utils/hooks";
import UpdateMyProfileTab from "./UpdateMyProfileTab/UpdateMyProfileTab";
import { Helmet } from 'react-helmet'
import { MEDIA_QUERIES } from "src/utils/theme";
import PreferencesTab from "./PreferencesTab/PreferencesTab";
import Card from "src/Components/Card/Card";
import { LayoutGroup, motion } from "framer-motion";


const links = [
    {
        text: "👾 My Profile",
        path: 'my-profile',
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
                    <LayoutGroup id="edit-profile-nav">
                        {isMediumScreen ?
                            <Card className="sticky-side-element  isolate">
                                <p className="text-body2 font-bolder text-black mb-16">Edit maker profile</p>
                                <ul className=' flex flex-col gap-8'>
                                    {links.map((link, idx) =>
                                        <li key={idx}>
                                            <NavLink
                                                to={link.path}
                                                className={({ isActive }) => `
                                                flex items-start cursor-pointer font-bold p-12 relative rounded-8`}
                                                children={({ isActive }) => (
                                                    <>
                                                        {isActive && <motion.div className="bg-gray-100 absolute inset-0 rounded-8 z-0" layoutId="bg"></motion.div>}
                                                        <span className="relative z-10">{link.text}</span>
                                                    </>
                                                )}
                                            />
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
                                                active:scale-95 transition-transform relative`}

                                            children={({ isActive }) => (
                                                <>
                                                    {isActive && <motion.div className="absolute h-[2px] bottom-0 inset-x-0 bg-primary-500" layoutId="underline"></motion.div>}
                                                    <span className="relative z-10">{link.text}</span>
                                                </>
                                            )}
                                        />
                                    )}
                                </Slider>
                            </div>
                        }
                    </LayoutGroup>
                </aside>
                <main className="md:col-span-3">
                    <Routes>
                        <Route index element={<Navigate to='my-profile' />} />
                        <Route path='my-profile' element={<UpdateMyProfileTab />} />
                        <Route path='preferences' element={<PreferencesTab />
                        } />
                    </Routes>
                </main>
            </div>
        </>
    )
}
