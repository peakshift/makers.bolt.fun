import { useParams, Navigate } from 'react-router-dom'
import ErrorMessage from 'src/Components/Errors/ErrorMessage/ErrorMessage';
import { useExplorePageQuery } from 'src/graphql';
import HeaderImage from './HeaderImage/HeaderImage';
import ProjectsGrid from './ProjectsGrid/ProjectsGrid';
import { Helmet } from "react-helmet";

export default function ExplorePage() {


    const { data, loading, error } = useExplorePageQuery({
        variables: {
            page: 1,
            pageSize: 20,
        }
    });



    if (error) {
        return <div className="p-32">
            <ErrorMessage type='fetching' />
        </div>
    }



    return (
        <>
            <Helmet>
                <title>{`Lightning Landscape`}</title>
                <meta property="og:title" content={`Lightning Landscape`} />
            </Helmet>
            <div className='page-container'>
                {/* <HeaderImage
                    isLoading={loading}
                    title={data?.getCategory.title!}
                    img={data?.getCategory.cover_image!}
                    apps_count={data?.getCategory.apps_count!}
                /> */}
                <div className="mt-40">
                    <ProjectsGrid
                        isLoading={loading}
                        projects={data?.projects?.filter((p) => p !== null) as any[] ?? []}
                    />
                </div>
            </div>
        </>
    )
}
