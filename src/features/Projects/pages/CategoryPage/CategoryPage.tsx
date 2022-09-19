import { useParams, Navigate } from 'react-router-dom'
import ErrorMessage from 'src/Components/Errors/ErrorMessage/ErrorMessage';
import { useCategoryPageQuery } from 'src/graphql';
import HeaderImage from './HeaderImage/HeaderImage';
import ProjectsGrid from './ProjectsGrid/ProjectsGrid';
import { Helmet } from "react-helmet";

export default function CategoryPage() {

    const { id } = useParams();


    const { data, loading, error } = useCategoryPageQuery({
        skip: !id,
        variables: {
            categoryId: Number(id)
        }
    });



    if (!id || (!loading && !data))
        <Navigate to='/' />

    if (error) {
        return <div className="p-32">
            <ErrorMessage type='fetching' />
        </div>
    }



    return (
        <>
            <Helmet>
                <title>{`${data?.getCategory.title!} Lightning Products`}</title>
                <meta property="og:title" content={`${data?.getCategory.title!} Lightning Products`} />
            </Helmet>
            <div className='page-container'>
                <HeaderImage
                    isLoading={loading}
                    title={data?.getCategory.title!}
                    img={data?.getCategory.cover_image!}
                    apps_count={data?.getCategory.apps_count!}
                />
                <div className="mt-40">
                    <ProjectsGrid
                        isLoading={loading}
                        projects={data?.projectsByCategory!}
                    />
                </div>
            </div>
        </>
    )
}
