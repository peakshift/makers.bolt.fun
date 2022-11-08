
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
import { useUpdateUrlWithFilters } from './helpers';
import { withBasicProvider } from 'src/utils/helperFunctions';
import { ProjectsFiltersProvider, useProjectsFilters } from './filters-context';

const UPDATE_FILTERS_ACTION = createAction<Partial<ProjectsFilters>>('PROJECTS_FILTERS_UPDATED')({})


type QueryFilter = Partial<{
    categoryId: string[] | null
    tags: string[] | null
    yearFounded: number | null
    dead: boolean | null
    license: string | null
}>

const PAGE_SIZE = 28;

function ExplorePage() {

    const dispatch = useAppDispatch();
    const { filters, updateFilters } = useProjectsFilters();

    const projectsLength = useRef<number>(0);
    const [canFetchMore, setCanFetchMore] = useState(true);

    useUpdateUrlWithFilters(filters)


    const { queryFilters, hasSearchFilters } = useMemo(() => {
        let filter: QueryFilter = {}
        let hasSearchFilters = false;


        if (filters?.categories) {
            filter.categoryId = filters?.categories.map(c => c.id!);
            hasSearchFilters = true;
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
    }, [filters])

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
    });


    projectsLength.current = data?.projects?.length ?? 0;


    const onFiltersUpdated = useCallback(({ payload }: typeof UPDATE_FILTERS_ACTION) => {
        setCanFetchMore(true);
        updateFilters(payload)
    }, [updateFilters])

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
        updateFilters({ ...(filters ?? {}), categories: category ? [category] : undefined })
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
                {/* <div className="flex justify-end mb-12 md:mb-24 my-24">
                    <label className='flex gap-16 items-center'>
                        <input
                            disabled={hasDeadProjectsFilter}
                            checked={showDeadProjects}
                            className='input-checkbox self-center'
                            onChange={e => setShowDeadProjects(v => !v)}
                            type="checkbox" />
                        <span className={`text-body4 text-gray-800 ${hasDeadProjectsFilter && 'opacity-60'}`}>Show dead projects {deadProjectsCount !== undefined && `(${deadProjectsCount})`}</span>
                    </label>
                </div> */}
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