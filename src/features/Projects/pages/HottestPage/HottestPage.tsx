import ASSETS from 'src/assets';

import ErrorMessage from 'src/Components/Errors/ErrorMessage/ErrorMessage';
import HeaderImage from 'src/features/Projects/pages/CategoryPage/HeaderImage/HeaderImage';
import ProjectsGrid from 'src/features/Projects/pages/CategoryPage/ProjectsGrid/ProjectsGrid';
import { Helmet } from "react-helmet";

import { useHottestProjectsQuery } from 'src/graphql'

export default function HottestPage() {
    const { data, loading, error } = useHottestProjectsQuery();

    if (error) {
        return <div className="p-32">
            <ErrorMessage type='fetching' />
        </div>
    }



    return (
        <>
            <Helmet>
                <title>{`Hottest Lightning Products`}</title>
                <meta property="og:title" content={`Hottest Lightning Products`} />
            </Helmet>
            <div className='page-container'>
                <HeaderImage
                    isLoading={loading}
                    title={"Hottest Projects"}
                    img={ASSETS.Image_Hottest_Header}
                />
                <div className="mt-40">
                    <ProjectsGrid
                        isLoading={loading}
                        projects={data?.hottestProjects!}
                    />
                </div>
            </div>
        </>
    )
}
