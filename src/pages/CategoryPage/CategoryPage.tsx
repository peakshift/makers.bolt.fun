import { useParams, Navigate } from 'react-router-dom'
import ErrorMessage from 'src/Components/ErrorMessage/ErrorMessage';
import { useCategoryPageQuery } from 'src/graphql';
import HeaderImage from './HeaderImage/HeaderImage';
import ProjectsGrid from './ProjectsGrid/ProjectsGrid';

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
        <div className='px-32'>
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
    )
}
