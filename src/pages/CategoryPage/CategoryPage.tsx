import { useQuery } from '@apollo/client';
import { useParams, Navigate } from 'react-router-dom'
import HeaderImage from './HeaderImage/HeaderImage';
import ProjectsGrid from './ProjectsGrid/ProjectsGrid';
import { PROJECTS_IN_CATEGORY_QUERY, PROJECTS_IN_CATEGORY_QUERY_RES_TYPE, PROJECTS_IN_CATEGORY_QUERY_VARS } from './query';

export default function CategoryPage() {

    const { id } = useParams();


    const { data, loading } = useQuery<PROJECTS_IN_CATEGORY_QUERY_RES_TYPE, PROJECTS_IN_CATEGORY_QUERY_VARS>(PROJECTS_IN_CATEGORY_QUERY, {
        skip: !id,
        variables: {
            categoryId: Number(id)
        },
        onCompleted: data => {
            console.log('--------------');

            console.log(data);

        }
    });

    if (!id || (!loading && !data))
        <Navigate to='/' />



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
