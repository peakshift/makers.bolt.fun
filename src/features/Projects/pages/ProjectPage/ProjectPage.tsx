import { useParams } from "react-router-dom"
import LoadingPage from "src/Components/LoadingPage/LoadingPage"
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage"
import { ProjectLaunchStatusEnum, useProjectDetailsQuery } from "src/graphql"
import { Helmet } from 'react-helmet'
import { useAppDispatch, useMediaQuery } from 'src/utils/hooks';
import styles from './styles.module.scss'
import { MEDIA_QUERIES } from "src/utils/theme"
import { setProject } from "src/redux/features/project.slice"
import LinksCard from "./Components/LinksCard/LinksCard"
import CapabilitiesCard from "./Components/CapabilitiesCard/CapabilitiesCard"
import TournamentsCard from "src/features/Profiles/pages/ProfilePage/TournamentsCard/TournamentsCard"
import StoriesCard from "src/features/Profiles/pages/ProfilePage/StoriesCard/StoriesCard"
import MakersCard from "./Components/MakersCard/MakersCard"
import AboutCard from "./Components/AboutCard/AboutCard"
import SimilarProjectsCard from "./Components/SimilarProjectsCard/SimilarProjectsCard"

export default function ProjectPage() {

    const { tag } = useParams()

    const dispatch = useAppDispatch();

    const { data, loading, error } = useProjectDetailsQuery({
        variables: { projectId: null, projectTag: tag! },
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
            <div className="relative w-full md:hidden h-[120px]">
                <img className="w-full h-full object-cover" src={project.cover_image} alt="" />
                <div className="absolute top-16 md:top-24 left-24 flex gap-8 bg-gray-800 bg-opacity-60 text-white rounded-48 py-4 px-12 text-body6 font-medium">
                    {project.launch_status === ProjectLaunchStatusEnum.Launched && `🚀 Launched`}
                    {project.launch_status === ProjectLaunchStatusEnum.Wip && `🔧 WIP`}
                </div>
                <div className="absolute left-24 bottom-0 translate-y-1/2 w-[108px] aspect-square">
                    <img className="w-full h-full border-2 border-white rounded-24" src={project.thumbnail_image} alt="" />
                </div>
            </div>
            <div className={`content-container pb-32 md:pt-32 bg-white md:bg-inherit`}
            >
                <div className={` ${styles.grid}`}
                >{isMediumScreen ?
                    <>
                        <aside>
                            <LinksCard links={project} />
                            <CapabilitiesCard capabilities={project.capabilities} />
                            <TournamentsCard tournaments={[]} />
                        </aside>
                        <main className="min-w-0">

                            <AboutCard project={project} />
                            <StoriesCard stories={project.stories} />
                        </main>
                        <aside className="min-w-0">
                            <MakersCard members={project.members} recruit_roles={project.recruit_roles} />
                            <SimilarProjectsCard id={project.id} />
                        </aside>
                    </>
                    :
                    <>
                        <main>
                            <AboutCard project={project} />
                            <CapabilitiesCard capabilities={project.capabilities} />
                            <hr className="bg-gray-100" />
                            <MakersCard members={project.members} recruit_roles={project.recruit_roles} />
                            <hr className="bg-gray-100" />
                            <StoriesCard onlyMd stories={project.stories} />
                            <TournamentsCard onlyMd tournaments={[]} />
                            <hr className="bg-gray-100" />
                            <SimilarProjectsCard id={project.id} />
                        </main>
                    </>
                    }</div>
            </div>
        </>
    )
}
