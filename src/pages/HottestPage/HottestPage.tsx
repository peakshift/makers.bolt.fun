import ASSETS from 'src/assets';

import ErrorMessage from 'src/Components/ErrorMessage/ErrorMessage';
import HeaderImage from 'src/pages/CategoryPage/HeaderImage/HeaderImage';
import ProjectsGrid from 'src/pages/CategoryPage/ProjectsGrid/ProjectsGrid';

import { useHottestProjectsQuery } from 'src/graphql'

export default function HottestPage() {
    const { data, loading, error } = useHottestProjectsQuery();

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
