import { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import IconButton from 'src/Components/IconButton/IconButton';
import { GetMakersInTournamentQueryVariables, useGetMakersInTournamentQuery } from 'src/graphql';
import MakerCard from '../MakerCard/MakerCard';
import MakerCardSkeleton from '../MakerCard/MakerCard.Skeleton';

interface Props {
    tournamentId: number
    searchFilter: string,
    roleFilter: number | null
    onlyLookingToTeam?: boolean
}

const ITEMS_PER_PAGE = 15;

export default function MakersList(props: Props) {


    const [page, setPage] = useState(0);
    const topContainerRef = useRef<HTMLDivElement>(null)
    const [scrollToTop, setScrollToTop] = useState(false)

    const [queryFilter, setQueryFilter] = useState<GetMakersInTournamentQueryVariables>({
        tournamentId: props.tournamentId,
        roleId: props.roleFilter ?? null,
        search: props.searchFilter ?? null,
        skip: ITEMS_PER_PAGE * page,
        take: ITEMS_PER_PAGE,
        openToConnect: props.onlyLookingToTeam ?? null
    });





    const query = useGetMakersInTournamentQuery({
        variables: queryFilter,
    });


    useEffect(() => {
        setPage(0);
        setQueryFilter(f => ({ ...f, search: props.searchFilter, roleId: props.roleFilter, openToConnect: props.onlyLookingToTeam ?? null, skip: 0 }))
    }, [props.onlyLookingToTeam, props.roleFilter, props.searchFilter]);



    useEffect(() => {
        if (scrollToTop && topContainerRef.current) {
            topContainerRef.current.scrollIntoView({
                behavior: 'smooth',
                block: "center"
            })
            setScrollToTop(false)
        }
    }, [scrollToTop])



    const nextPage = () => {
        setPage(p => p + 1)
        setQueryFilter(f => ({ ...f, skip: (f.skip ?? 0) + ITEMS_PER_PAGE }))
        setScrollToTop(true)
    }
    const prevPage = () => {
        if (page === 0) return
        setPage(p => p - 1)
        setQueryFilter(f => ({ ...f, skip: (f.skip ?? 0) - ITEMS_PER_PAGE }))
        setScrollToTop(true)
    }


    const itemsCount = query.data?.getMakersInTournament && query.data.getMakersInTournament.makers.length;

    return (
        <div >
            <div ref={topContainerRef}></div>
            <div className='flex flex-col gap-16 lg:gap-24'>
                {
                    query.loading ?
                        <>
                            <div  >
                                <MakerCardSkeleton />
                            </div>
                            <MakerCardSkeleton />
                            <MakerCardSkeleton />
                        </>
                        :
                        (itemsCount !== 0 ?
                            query.data?.getMakersInTournament.makers.map(maker => <MakerCard key={maker.user.id} maker={maker} />) :
                            <div className="py-80 text-center text-body2">
                                <p className="text-gray-400">No makers found here...</p>
                            </div>)
                }
                < div className='flex justify-center gap-36 text-gray-400' >
                    <IconButton isDisabled={!query.data?.getMakersInTournament.hasPrev} onClick={prevPage}>
                        <FaChevronLeft />
                    </IconButton>
                    <IconButton isDisabled={!query.data?.getMakersInTournament.hasNext} onClick={nextPage} >
                        <FaChevronRight />
                    </IconButton>
                </div >
            </div>
        </div>
    )
}
