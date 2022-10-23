
import ErrorMessage from 'src/Components/Errors/ErrorMessage/ErrorMessage';
import { useExplorePageQuery } from 'src/graphql';
import ProjectsGrid from './ProjectsGrid/ProjectsGrid';
import { Helmet } from "react-helmet";
import Categories, { Category } from '../../Components/Categories/Categories';
import { useCallback, useMemo, useRef, useState } from 'react';
import Header from './Header/Header';
import Button from 'src/Components/Button/Button';
import { useAppDispatch } from 'src/utils/hooks';
import { openModal } from 'src/redux/features/modals.slice';
import { createAction } from '@reduxjs/toolkit';
import { useReduxEffect } from 'src/utils/hooks/useReduxEffect';
import { NetworkStatus } from '@apollo/client';
import { FiSliders } from 'react-icons/fi';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi'
import { ProjectsFilters } from './Filters/FiltersModal';

const UPDATE_FILTERS_ACTION = createAction<Partial<ProjectsFilters>>('PROJECTS_FILTERS_UPDATED')({})


type QueryFilter = Partial<{
    categoryId: string[] | null
    tags: string[] | null
    yearFounded: number | null
    dead: boolean | null
    license: string | null
}>

const PAGE_SIZE = 20;

export default function ExplorePage() {

    const dispatch = useAppDispatch();
    const [filters, setFilters] = useState<Partial<ProjectsFilters> | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const projectsLength = useRef<number>(0);
    const [canFetchMore, setCanFetchMore] = useState(true);

    const { queryFilters, hasSearchFilters } = useMemo(() => {
        let filter: QueryFilter = {}
        let hasSearchFilters = false;

        if (filters?.categoriesIds && filters?.categoriesIds?.length > 0) {
            filter.categoryId = filters?.categoriesIds;
            hasSearchFilters = true;
        }
        if (selectedCategory?.id) filter.categoryId = [selectedCategory?.id]

        if (filters?.tagsIds && filters?.tagsIds?.length > 0) {
            filter.tags = filters?.tagsIds
            hasSearchFilters = true;
        }

        if (filters?.yearFounded && filters?.yearFounded !== 'any') {
            filter.yearFounded = Number(filters?.yearFounded)
            hasSearchFilters = true;
        }

        if (filters?.projectStatus && filters?.projectStatus !== 'any') {
            filter.dead = filters?.projectStatus === 'alive' ? false : true;
            hasSearchFilters = true;
        }


        if (filters?.projectLicense && filters?.projectLicense !== 'any') {
            filter.license = filters?.projectLicense
            hasSearchFilters = true;
        }

        if (Object.keys(filter).length === 0)
            return { queryFilters: null, hasSearchFilters }

        return { queryFilters: filter, hasSearchFilters };
    }, [filters, selectedCategory?.id])

    const { data, networkStatus, error, fetchMore } = useExplorePageQuery({
        variables: {
            page: 1,
            pageSize: PAGE_SIZE,
            filter: queryFilters
        },
        notifyOnNetworkStatusChange: true,
        onCompleted: data => {
            if ((data.projects?.length ?? 0) < PAGE_SIZE) setCanFetchMore(false);
        }
    });


    projectsLength.current = data?.projects?.length ?? 0;


    const onFiltersUpdated = useCallback(({ payload }: typeof UPDATE_FILTERS_ACTION) => {
        setSelectedCategory(null)
        setCanFetchMore(true);
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
        setCanFetchMore(true);
    }

    const clickFetchMore = () => {
        fetchMore({ variables: { page: Math.floor((data?.projects?.length ?? 0) / PAGE_SIZE) + 1 } })
            .then(res => {
                if (!res.data.projects || res.data.projects.length < PAGE_SIZE) setCanFetchMore(false);
            })
    }

    if (error) {
        return <div className="p-32">
            <ErrorMessage type='fetching' />
        </div>
    }


    const isLoading = networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.refetch || networkStatus === NetworkStatus.setVariables;
    const isLoadingMore = networkStatus === NetworkStatus.fetchMore;
    const canLoadMore = !isLoading && !isLoadingMore && data?.projects && data.projects.length > 0 && canFetchMore;


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
                    <div className="min-w-0"><Categories filtersActive={hasSearchFilters} value={selectedCategory} onChange={v => selectCategoryTab(v)} /></div>
                    <Button
                        className={`self-center ${hasSearchFilters ? "!font-bold !bg-primary-50 !text-primary-600 !border-2 !border-primary-400" : "!text-gray-600"}`}
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
                        isLoadingMore={isLoadingMore}
                        projects={data?.projects?.filter((p) => p !== null) as any[] ?? []}
                    />
                    {canLoadMore && <div className="flex justify-center mt-36">
                        <Button onClick={clickFetchMore} color="gray"><HiOutlineChevronDoubleDown /> Load more</Button>
                    </div>}
                </div>
            </div>
        </>
    )
}
