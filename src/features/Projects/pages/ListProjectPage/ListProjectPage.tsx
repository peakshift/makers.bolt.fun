import { Navigate, NavLink, Route, Routes, useParams } from "react-router-dom";
import Slider from "src/Components/Slider/Slider";
import { useAppSelector, useMediaQuery } from "src/utils/hooks";
import { Helmet } from 'react-helmet'
import { MEDIA_QUERIES } from "src/utils/theme";
import Card from "src/Components/Card/Card";
import ProjectDetailsTab from "./Components/ProjectDetailsTab/ProjectDetailsTab";
import TeamTab from "./Components/TeamTab/TeamTab";
import ExtrasTab from "./Components/ExtrasTab/ExtrasTab";


const links = [
    {
        text: "🚀️  Project details",
        path: 'project-details',
    },
    {
        text: "⚡️  Team",
        path: 'team',
    },
    {
        text: "💎  Extras",
        path: 'extras',
    }
]



export default function ListProjectPage() {

    const { id } = useParams()

    const isUpdating = !!id;

    const isMediumScreen = useMediaQuery(MEDIA_QUERIES.isMedium)




    // if (!userId || profileQuery.loading)
    //     return <LoadingPage />

    // if (!profileQuery.data?.profile)
    //     return <NotFoundPage />

    return (
        <>
            <Helmet>
                <title>List a project</title>
                <meta property="og:title" content='List a project' />
            </Helmet>
            <div className="page-container grid grid-cols-1 md:grid-cols-4 gap-24">
                <aside>
                    {isMediumScreen ?
                        <Card className="sticky-side-element">
                            <p className="text-body2 font-bolder text-black mb-16">List a project</p>
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
                        <Route index element={<Navigate to={links[0].path} />} />
                        <Route path={links[0].path} element={<ProjectDetailsTab />} />
                        <Route path={links[1].path} element={<TeamTab />} />
                        <Route path={links[2].path} element={<ExtrasTab />} />
                    </Routes>
                </main>
            </div>
        </>
    )
}
