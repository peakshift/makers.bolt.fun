import { useQuery } from '@apollo/client';
import ASSETS from 'src/assets';

import ErrorMessage from 'src/Components/ErrorMessage/ErrorMessage';
import HeaderImage from 'src/pages/CategoryPage/HeaderImage/HeaderImage';
import ProjectsGrid from 'src/pages/CategoryPage/ProjectsGrid/ProjectsGrid';

import { HOTTEST_PROJECTS_QUERY, HOTTEST_PROJECTS_QUERY_RES_TYPE } from './query';

export default function HottestPage() {


    const { data, loading, error } = useQuery<HOTTEST_PROJECTS_QUERY_RES_TYPE>(HOTTEST_PROJECTS_QUERY);



    if (error) {
        return <div className="p-32">
            <ErrorMessage type='fetching' />
        </div>
    }



    return (
        <div className='px-32'>
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
    )
}
