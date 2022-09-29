import { useParams } from "react-router-dom"
import LoadingPage from "src/Components/LoadingPage/LoadingPage"
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage"
import { useProjectDetailsQuery } from "src/graphql"
import { Helmet } from 'react-helmet'
import { useAppDispatch, useMediaQuery } from 'src/utils/hooks';
import styles from './styles.module.scss'
import { MEDIA_QUERIES } from "src/utils/theme"
import { setProject } from "src/redux/features/project.slice"
import LinksCard from "./Components/LinksCard/LinksCard"
import CapabilitiesCard from "./Components/CapabilitiesCard/CapabilitiesCard"
import OpenRolesCard from "./Components/OpenRolesCard/OpenRolesCard"
import TournamentsCard from "src/features/Profiles/pages/ProfilePage/TournamentsCard/TournamentsCard"
import StoriesCard from "src/features/Profiles/pages/ProfilePage/StoriesCard/StoriesCard"
import MakersCard from "./Components/MakersCard/MakersCard"
import AboutCard from "./Components/AboutCard/AboutCard"

export default function ProjectPage() {

    const { tag } = useParams()

    const dispatch = useAppDispatch();

    const { data, loading, error } = useProjectDetailsQuery({
        variables: { projectId: Number(tag!) },
        onCompleted: data => {
            dispatch(setProject(data.getProject))
        },
        onError: () => {
            dispatch(setProject(null));
        },
        skip: !Boolean(tag)
    });


    const isMediumScreen = useMediaQuery(MEDIA_QUERIES.isMedium)



    if (loading)
        return <LoadingPage />

    if (!data?.getProject)
        return <NotFoundPage />

    if (error) throw new Error("Couldn't fetch the project", { cause: error })


    const project = data.getProject;

    return (
        <>
            <Helmet>
                <title>{project.title}</title>
                <meta property="og:title" content={project.title} />

                {project.lightning_address &&
                    <meta name="lightning" content={`lnurlp:${project.lightning_address}`} />
                }
                <meta property="og:image" content={project.cover_image} />
            </Helmet>
            <div className={`page-container`}
            >
                <div className={` ${styles.grid}`}
                >{isMediumScreen ?
                    <>
                        <aside>
                            <LinksCard links={project} />
                            <CapabilitiesCard capabilities={project.capabilities} />
                            <OpenRolesCard recruit_roles={project.recruit_roles} />
                            <TournamentsCard tournaments={[]} />
                        </aside>
                        <main className="min-w-0">

                            <AboutCard project={project} />
                            <StoriesCard stories={[]} />
                        </main>
                        <aside className="min-w-0">
                            <MakersCard members={project.members} />
                        </aside>
                    </>
                    :
                    <>
                        <main>
                            <AboutCard project={project} />
                            <LinksCard links={project} />
                            <CapabilitiesCard capabilities={project.capabilities} />
                            <TournamentsCard tournaments={[]} />
                            <MakersCard members={project.members} />
                            <OpenRolesCard recruit_roles={project.recruit_roles} />
                            <StoriesCard stories={[]} />
                        </main>
                    </>
                    }</div>
            </div>
        </>
    )
}
