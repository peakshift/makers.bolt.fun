import { useParams, Navigate } from 'react-router-dom'
import ErrorMessage from 'src/Components/Errors/ErrorMessage/ErrorMessage';
import { useExplorePageQuery } from 'src/graphql';
import HeaderImage from './Header/Header';
import ProjectsGrid from './ProjectsGrid/ProjectsGrid';
import { Helmet } from "react-helmet";
import Categories, { Category } from '../../Components/Categories/Categories';
import { useCallback, useMemo, useState } from 'react';
import Header from './Header/Header';
import Button from 'src/Components/Button/Button';
import { useAppDispatch } from 'src/utils/hooks';
import { openModal } from 'src/redux/features/modals.slice';
import { createAction } from '@reduxjs/toolkit';
import { useReduxEffect } from 'src/utils/hooks/useReduxEffect';
import { NetworkStatus } from '@apollo/client';
import { GoSettings } from 'react-icons/go'
import { FiSliders } from 'react-icons/fi';
import { ProjectsFilters } from './Filters/FiltersModal';

const UPDATE_FILTERS_ACTION = createAction<{ categoriesIds?: string[], tagsIds?: string[], yearFounded?: string }>('PROJECTS_FILTERS_UPDATED')({})

export default function ExplorePage() {

    const dispatch = useAppDispatch();
    const [filters, setFilters] = useState<Partial<ProjectsFilters>>()
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

    const queryFilters = useMemo(() => {
        let filter: any = {}

        if (!filters) return null;

        if (filters.categoriesIds && filters.categoriesIds?.length > 0)
            filter['categoryId'] = filters.categoriesIds

        if (filters.tagsIds && filters.tagsIds?.length > 0)
            filter['tags'] = filters.tagsIds

        if (filters.yearFounded && filters.yearFounded !== "Any")
            filter['yearFounded'] = Number(filters.yearFounded)

        if (Object.keys(filter).length === 0) return null

        return filter;
    }, [filters])

    const { data, networkStatus, error } = useExplorePageQuery({
        variables: {
            page: 1,
            pageSize: 20,
            filter: queryFilters
        },
        notifyOnNetworkStatusChange: true,
    });





    const onFiltersUpdated = useCallback(({ payload }: typeof UPDATE_FILTERS_ACTION) => {
        setSelectedCategory(null)
        setFilters(payload);
    }, [])

    useReduxEffect(onFiltersUpdated, UPDATE_FILTERS_ACTION.type)


    const openFilters = () => {
        dispatch(openModal({
            Modal: "FiltersModal",
            isPageModal: true,
            props: {
                callbackAction: {
                    type: UPDATE_FILTERS_ACTION.type,
                    payload: {

                    }
                },
                initFilters: {
                    ...filters
                }
            }
        }))
    }

    const selectCategoryTab = (category?: Category | null) => {
        if (!category?.id)
            return;
        setSelectedCategory(category);
        setFilters({
            categoriesIds: [category.id]
        })
    }

    if (error) {
        return <div className="p-32">
            <ErrorMessage type='fetching' />
        </div>
    }

    console.log(networkStatus, NetworkStatus.loading, NetworkStatus.refetch, NetworkStatus.setVariables);

    const isLoading = networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.refetch || networkStatus === NetworkStatus.setVariables;


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
                <div className="grid grid-cols-[1fr_auto] items-center gap-32">
                    <div className="min-w-0"><Categories value={selectedCategory} onChange={v => selectCategoryTab(v)} /></div>
                    <Button className='self-center' variant='outline' color='white' onClick={openFilters}><FiSliders className="scale-150 mr-8 text-primary-500" /> <span className='align-middle'>Filters</span></Button>
                </div>
                <div className="mt-40">
                    <ProjectsGrid
                        isLoading={isLoading}
                        projects={data?.projects?.filter((p) => p !== null) as any[] ?? []}
                    />
                </div>
            </div>
        </>
    )
}
