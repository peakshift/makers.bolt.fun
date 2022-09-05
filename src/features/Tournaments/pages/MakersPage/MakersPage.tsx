import { NetworkStatus } from '@apollo/client';
import { useDebouncedCallback, useDebouncedState } from '@react-hookz/web';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import IconButton from 'src/Components/IconButton/IconButton';
import LoadingPage from 'src/Components/LoadingPage/LoadingPage';
import { GenericMakerRole, GetMakersInTournamentQueryVariables, Tournament, useGetMakersInTournamentQuery, User } from 'src/graphql'
import ScrollToTop from 'src/utils/routing/scrollToTop';
import MakerCard from './MakerCard/MakerCard';
import MakerCardSkeleton from './MakerCard/MakerCard.Skeleton';
import MakersFilters from './MakersFilters/MakersFilters';

interface Props {
    data: Pick<Tournament,
        | 'id'>
}

const ITEMS_PER_PAGE = 15;

export default function MakersPage({ data: { id } }: Props) {

    const [page, setPage] = useState(0)
    const [searchFilter, setSearchFilter] = useState("");
    const [debouncedsearchFilter, setDebouncedSearchFilter] = useDebouncedState("", 500);
    const [roleFilter, setRoleFilter] = useState<GenericMakerRole | null>(null);

    const loadingContainerCbRef = useCallback((e: HTMLDivElement) => {
        if (e)
            e.scrollIntoView({
                behavior: 'smooth',
                block: "center"
            })
    }, [])

    const [queryFilter, setQueryFilter] = useState<GetMakersInTournamentQueryVariables>({
        tournamentId: id,
        roleId: roleFilter?.id ?? null,
        search: debouncedsearchFilter,
        skip: ITEMS_PER_PAGE * page,
        take: ITEMS_PER_PAGE,
    });


    const query = useGetMakersInTournamentQuery({
        variables: queryFilter,
        notifyOnNetworkStatusChange: true,
    });


    useEffect(() => {
        setPage(0);
        setQueryFilter(f => ({ ...f, search: debouncedsearchFilter, roleId: roleFilter?.id ?? null, skip: 0 }))
    }, [debouncedsearchFilter, roleFilter]);





    if (query.networkStatus === NetworkStatus.loading) return <LoadingPage />


    const changeSearchFilter = (new_value: string) => {
        setSearchFilter(new_value);
        setDebouncedSearchFilter(new_value);
    }


    const nextPage = () => {
        setPage(p => p + 1)
        setQueryFilter(f => ({ ...f, skip: (f.skip ?? 0) + ITEMS_PER_PAGE }))
    }
    const prevPage = () => {
        if (page === 0) return
        setPage(p => p - 1)
        setQueryFilter(f => ({ ...f, skip: (f.skip ?? 0) - ITEMS_PER_PAGE }))
    }


    const isFetchingMore = query.networkStatus === NetworkStatus.setVariables;
    const itemsCount = query.data?.getMakersInTournament && query.data.getMakersInTournament.length;


    return (
        <div className='pb-42'>
            <div className="flex flex-col gap-16 lg:gap-24">
                <MakerCard isMe maker={(query.data?.me ?? query.previousData?.me) as User} />
                <div className="flex flex-col gap-16">
                    <h3 className="text-body1 text-gray-900 font-bold mt-24">Makers 👾</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
                        <MakersFilters
                            searchValue={searchFilter}
                            onSearchChange={changeSearchFilter}
                            roleValue={roleFilter}
                            onRoleChange={setRoleFilter}
                        />
                    </div>
                </div>
                {isFetchingMore ?
                    <>
                        <div ref={loadingContainerCbRef} >
                            <MakerCardSkeleton />
                        </div>
                        <MakerCardSkeleton />
                        <MakerCardSkeleton />
                    </>
                    :
                    (itemsCount !== 0 ?
                        query.data?.getMakersInTournament.map(maker => <MakerCard key={maker.id} maker={maker} />) :
                        <div className="py-80 text-center text-body2">
                            <p className="text-gray-400">No makers found here...</p>
                        </div>)
                }


                <div className='flex justify-center gap-36 text-gray-400'>
                    <IconButton isDisabled={!itemsCount || page === 0} onClick={prevPage}>
                        <FaChevronLeft />
                    </IconButton>
                    <IconButton isDisabled={!itemsCount || itemsCount < ITEMS_PER_PAGE} onClick={nextPage} >
                        <FaChevronRight />
                    </IconButton>
                </div>
            </div>

        </div>
    )
}
