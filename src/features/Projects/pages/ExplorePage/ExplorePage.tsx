
import ErrorMessage from 'src/Components/Errors/ErrorMessage/ErrorMessage';
import { useExplorePageQuery } from 'src/graphql';
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
import { FiSliders } from 'react-icons/fi';
import { ProjectsFilters } from './Filters/FiltersModal';

const UPDATE_FILTERS_ACTION = createAction<Partial<ProjectsFilters>>('PROJECTS_FILTERS_UPDATED')({})

type QueryFilter = Partial<{
    categoryId: string[] | null
    tags: string[] | null
    yearFounded: number | null
    dead: boolean | null
    license: string | null
}>

export default function ExplorePage() {

    const dispatch = useAppDispatch();
    const [filters, setFilters] = useState<Partial<ProjectsFilters> | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

    const queryFilters = useMemo(() => {
        let filter: QueryFilter = {}

        if (!filters) return null;

        if (filters.categoriesIds && filters.categoriesIds?.length > 0)
            filter.categoryId = filters.categoriesIds;

        if (selectedCategory?.id) filter.categoryId = [selectedCategory?.id]

        if (filters.tagsIds && filters.tagsIds?.length > 0)
            filter.tags = filters.tagsIds

        if (filters.yearFounded && filters.yearFounded !== 'any')
            filter.yearFounded = Number(filters.yearFounded)

        if (filters.projectStatus && filters.projectStatus !== 'any')
            filter.dead = filters.projectStatus === 'alive' ? false : true;


        if (filters.projectLicense && filters.projectLicense !== 'any')
            filter.license = filters.projectLicense

        if (Object.keys(filter).length === 0)
            return null

        return filter;
    }, [filters, selectedCategory?.id])

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
        if (Object.keys(payload).length === 0)
            setFilters(null);
        else
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

    const selectCategoryTab = (category: Category | null) => {
        setSelectedCategory(category);
    }

    if (error) {
        return <div className="p-32">
            <ErrorMessage type='fetching' />
        </div>
    }


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
                    <div className="min-w-0"><Categories filtersActive={!!queryFilters} value={selectedCategory} onChange={v => selectCategoryTab(v)} /></div>
                    <Button
                        className={`self-center ${!!queryFilters ? "!font-bold !bg-primary-50 !text-primary-600 !border-2 !border-primary-400" : "!text-gray-600"}`}
                        variant='outline'
                        color='white'
                        onClick={openFilters}>
                        <FiSliders className="scale-150 mr-12" />
                        <span className='align-middle'>Filters</span>
                    </Button>
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
