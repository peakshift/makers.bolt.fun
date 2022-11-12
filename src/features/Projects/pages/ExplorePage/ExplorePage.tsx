
import ErrorMessage from 'src/Components/Errors/ErrorMessage/ErrorMessage';
import { useExplorePageQuery, useGetFiltersQuery } from 'src/graphql';
import ProjectsGrid from './ProjectsGrid/ProjectsGrid';
import Categories, { Category } from '../../Components/Categories/Categories';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { useUpdateUrlWithFilters } from './helpers';
import { withBasicProvider } from 'src/utils/helperFunctions';
import { ProjectsFiltersProvider, useProjectsFilters } from './filters-context';
import { setTheme } from 'src/redux/features/ui.slice';
import OgTags from 'src/Components/OgTags/OgTags';


function ExplorePage() {

    const dispatch = useAppDispatch();

    const [canFetchMore, setCanFetchMore] = useState(true);

    const { filters, updateFilters } = useProjectsFilters();

    useUpdateUrlWithFilters(filters)
    const filtersQuery = useGetFiltersQuery();

    const hiddenCategoriesIds = useMemo(() => {
        if (filtersQuery.loading) return [];
        return filtersQuery.data?.categoryList?.filter(c => c?.isHidden).map(c => c!.id!) ?? [];
    }, [filtersQuery.data?.categoryList, filtersQuery.loading])

    const { queryFilters, hasSearchFilters } = useMemo(() => createQueryFilters(filters, {
        hiddenCategoriesIds
    }), [filters, hiddenCategoriesIds])


    const { data, networkStatus, error, fetchMore } = useExplorePageQuery({
        variables: {
            page: 1,
            pageSize: PAGE_SIZE,
            filter: queryFilters
        },
        notifyOnNetworkStatusChange: true,
        onCompleted: data => {
            if ((data.projects?.length ?? 0) < PAGE_SIZE) setCanFetchMore(false);
        },
        skip: filtersQuery.loading
    });


    const onFiltersUpdated = useCallback(({ payload }: typeof UPDATE_FILTERS_ACTION) => {
        updateFilters(payload)
    }, [updateFilters])

    useReduxEffect(onFiltersUpdated, UPDATE_FILTERS_ACTION.type);

    useEffect(() => {
        dispatch(setTheme('light'))
    }, [dispatch])


    useEffect(() => {
        setCanFetchMore(true);
    }, [filters])


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
        updateFilters({ ...(filters ?? {}), categories: category ? [category] : undefined })
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

    const isLoading = networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.refetch || networkStatus === NetworkStatus.setVariables || filtersQuery.loading;
    const isLoadingMore = networkStatus === NetworkStatus.fetchMore;
    const canLoadMore = !isLoading && !isLoadingMore && data?.projects && data.projects.length > 0 && canFetchMore;


    return (
        <>
            <OgTags
                title="Lightning Landscape | Explore"
                description="Everything lightning network in one place"
            />
            <Header
                selectedCategry={filters?.categories?.[0] ?? null}
            />
            <div className="page-container">
                <div className="grid grid-cols-1  md:grid-cols-[1fr_auto] items-center gap-x-32 gap-y-16 mb-36">
                    <div className="min-w-0 max-md:row-start-2"><Categories filtersActive={hasSearchFilters} value={filters?.categories?.[0] ?? null} onChange={v => selectCategoryTab(v)} /></div>
                    <Button
                        className={`self-center ${hasSearchFilters ? "!font-bold !bg-primary-50 !text-primary-600 !border-2 !border-primary-400" : "!text-gray-600"}`}
                        variant='outline'
                        color='white'
                        onClick={openFilters}>
                        <FiSliders className="scale-150 mr-12" />
                        <span className='align-middle'>Filter</span>
                        {hasSearchFilters && <span className='absolute bg-primary-600 text-body6 text-white w-24 aspect-square rounded-full top-0 right-0 translate-x-1/3 -translate-y-1/3 flex justify-center border-2 border-white items-center '>{Object.keys(filters ?? {}).length}</span>}
                    </Button>
                </div>
                <ProjectsGrid
                    isLoading={isLoading}
                    isLoadingMore={isLoadingMore}
                    projects={data?.projects?.filter((p) => p !== null) as any[] ?? []}
                />
                {canLoadMore && <div className="flex justify-center mt-36">
                    <Button onClick={clickFetchMore} color="gray"><HiOutlineChevronDoubleDown /> Load more</Button>
                </div>}
            </div>
        </>
    )
}

export default withBasicProvider(ProjectsFiltersProvider, ExplorePage);


const UPDATE_FILTERS_ACTION = createAction<Partial<ProjectsFilters>>('PROJECTS_FILTERS_UPDATED')({})

const PAGE_SIZE = 28;

type QueryFilter = Partial<{
    categoryId: object | null
    tags: string[] | null
    yearFounded: number | null
    dead: boolean | null
    license: string | null
}>


const createQueryFilters = (filters: Partial<ProjectsFilters> | null, extraFilters: { hiddenCategoriesIds: string[] }) => {
    let filter: QueryFilter = {}
    let hasSearchFilters = false;


    if (filters?.categories) {
        filter.categoryId = filters?.categories.map(c => c.id!)
        hasSearchFilters = true;
    } else {
        filter.categoryId = {
            _nin: extraFilters.hiddenCategoriesIds
        };
    }


    if (filters?.tags) {
        filter.tags = filters?.tags.map(t => t.id)
        hasSearchFilters = true;
    }

    if (filters?.yearFounded) {
        filter.yearFounded = Number(filters?.yearFounded)
        hasSearchFilters = true;
    }

    if (filters?.projectStatus) {
        filter.dead = filters?.projectStatus === 'alive' ? false : true;
        hasSearchFilters = true;
    }


    if (filters?.projectLicense) {
        filter.license = filters?.projectLicense
        hasSearchFilters = true;
    }

    if (Object.keys(filter).length === 0)
        return { queryFilters: null, hasSearchFilters }

    return { queryFilters: filter, hasSearchFilters };
}