import { useParams, Navigate } from 'react-router-dom'
import ErrorMessage from 'src/Components/Errors/ErrorMessage/ErrorMessage';
import { useExplorePageQuery } from 'src/graphql';
import HeaderImage from './Header/Header';
import ProjectsGrid from './ProjectsGrid/ProjectsGrid';
import { Helmet } from "react-helmet";
import Categories, { Category } from '../../Components/Categories/Categories';
import { useState } from 'react';
import Header from './Header/Header';

export default function ExplorePage() {

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const { data, loading, error } = useExplorePageQuery({
        variables: {
            page: 1,
            pageSize: 20,
            filter: selectedCategory ? {
                "categoryId": selectedCategory?.id
            } : null
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
                <Header
                    category={selectedCategory}
                />
                <Categories value={selectedCategory} onChange={v => setSelectedCategory(v)} />
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
