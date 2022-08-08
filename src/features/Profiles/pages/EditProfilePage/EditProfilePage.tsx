import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import Slider from "src/Components/Slider/Slider";
import { useProfileQuery } from "src/graphql";
import { useAppSelector, useMediaQuery } from "src/utils/hooks";
import CommentsSettingsCard from "../ProfilePage/CommentsSettingsCard/CommentsSettingsCard";
import UpdateMyProfileCard from "./UpdateMyProfileCard/UpdateMyProfileCard";
import { Helmet } from 'react-helmet'
import { MEDIA_QUERIES } from "src/utils/theme";
import AccountCard from "./AccountCard/AccountCard";


const links = [
    {
        text: "👾 My Profile",
        path: 'my-profile',
    },
    // {
    //     text: "🙍‍♂️ Account",
    //     path: 'account',
    // },
    {
        text: "⚙️ Preferences",
        path: 'preferences',
    }
]



export default function EditProfilePage() {
    const userId = useAppSelector(state => state.user.me?.id)
    const profileQuery = useProfileQuery({
        variables: {
            profileId: userId!,
        },
        skip: !userId,
    })
    const isMediumScreen = useMediaQuery(MEDIA_QUERIES.isMedium)




    if (!userId || profileQuery.loading)
        return <LoadingPage />

    if (!profileQuery.data?.profile)
        return <NotFoundPage />

    return (
        <>
            <Helmet>
                <title>Settings</title>
                <meta property="og:title" content='Settings' />
            </Helmet>
            <div className="page-container grid grid-cols-1 md:grid-cols-4 gap-24">
                <aside>
                    {isMediumScreen ?
                        <div className='bg-white border-2 border-gray-200 rounded-12 p-16 sticky-side-element' >
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
                        </div>
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
                <main className="md:col-span-2">
                    <Routes>
                        <Route index element={<Navigate to='my-profile' />} />
                        <Route path='my-profile' element={<UpdateMyProfileCard data={profileQuery.data.profile} />} />
                        <Route path='account' element={<AccountCard />} />
                        <Route path='preferences' element={<CommentsSettingsCard nostr_prv_key={profileQuery.data.profile.nostr_prv_key} nostr_pub_key={profileQuery.data.profile.nostr_pub_key} isOwner={true} />
                        } />
                    </Routes>
                </main>
            </div>
        </>
    )
}
