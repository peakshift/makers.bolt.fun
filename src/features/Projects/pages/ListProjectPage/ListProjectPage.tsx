import { useCarousel, useMediaQuery, } from "src/utils/hooks";
import { Helmet } from 'react-helmet'
import { MEDIA_QUERIES } from "src/utils/theme";
import Card from "src/Components/Card/Card";
import ProjectDetailsTab from "./Components/ProjectDetailsTab/ProjectDetailsTab";
import TeamTab from "./Components/TeamTab/TeamTab";
import ExtrasTab from "./Components/ExtrasTab/ExtrasTab";
import FormContainer from "./Components/FormContainer/FormContainer";
import { useState } from "react";
import SaveChangesCard from "./Components/SaveChangesCard/SaveChangesCard";


export const tabs = {
    'project-details': {
        text: "🚀️  Project details",
        path: 'project-details',
    },
    'team': {
        text: "⚡️  Team",
        path: 'team',
    },
    'extras': {
        text: "💎  Extras",
        path: 'extras',
    }
} as const;

const links = [tabs['project-details'], tabs['team'], tabs['extras']];

type TabsKeys = keyof typeof tabs;


export default function ListProjectPage() {

    const isMediumScreen = useMediaQuery(MEDIA_QUERIES.isMedium)
    const [curTab, setCurTab] = useState<TabsKeys>(tabs['project-details'].path)
    const { viewportRef, } = useCarousel({
        align: 'start', slidesToScroll: 2,
        containScroll: "trimSnaps",
    })



    return (
        <>
            <Helmet>
                <title>List a project</title>
                <meta property="og:title" content='List a project' />
            </Helmet>
            <div className="page-container grid grid-cols-1 md:grid-cols-4 gap-24">
                {isMediumScreen ?
                    <aside >
                        <Card className="sticky-side-element">
                            <p className="text-body2 font-bolder text-black mb-16">List a project</p>
                            <ul className=' flex flex-col gap-8'>
                                {links.map((link, idx) =>
                                    <li key={idx}>
                                        <button
                                            //             className={({ isActive }) => `flex items-start rounded-8 cursor-pointer font-bold p-12
                                            //  active:scale-95 transition-transform
                                            // ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'}
                                            // `}
                                            className={`flex w-full items-start rounded-8 cursor-pointer font-bold p-12
                                                        active:scale-95 transition-transform
                                                        ${link.path === curTab ? 'bg-gray-100' : 'hover:bg-gray-50'}
                                                        `}
                                            onClick={() => setCurTab(link.path)}
                                        >
                                            {link.text}
                                        </button>
                                    </li>)}
                            </ul>
                        </Card>
                    </aside>
                    :
                    <aside
                        className=" bg-white z-10 w-full sticky-top-element"
                    >
                        <div className="relative group overflow-hidden">
                            <div className="border-b-2 border-gray-200" ref={viewportRef}>
                                <div className="select-none w-full flex gap-16">
                                    {links.map((link, idx) =>
                                        <button
                                            key={idx}
                                            className={`flex min-w-max  items-start cursor-pointer font-bold py-12 px-8
                                                active:scale-95 transition-transform`}
                                            style={{
                                                ...(link.path === curTab && {
                                                    borderBottom: '2px solid var(--primary)',
                                                    marginBottom: -2
                                                }),
                                            }
                                            }

                                        >
                                            {link.text}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>
                }
                <main className="md:col-span-3">
                    <FormContainer>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                            <div className="md:col-span-2">
                                {curTab === tabs["project-details"].path && <ProjectDetailsTab />}
                                {curTab === tabs["team"].path && <TeamTab />}
                                {curTab === tabs["extras"].path && <ExtrasTab />}
                            </div>
                            <div className="self-start sticky-side-element">
                                <SaveChangesCard currentTab={curTab} />
                            </div>
                        </div>
                    </FormContainer>
                </main>
            </div>
        </>
    )
}
