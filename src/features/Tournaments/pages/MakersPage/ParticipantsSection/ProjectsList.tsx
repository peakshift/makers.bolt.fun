import { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import IconButton from 'src/Components/IconButton/IconButton';
import { GetProjectsInTournamentQueryVariables, useGetProjectsInTournamentQuery } from 'src/graphql';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectCardSkeleton from '../ProjectCard/ProjectCard.Skeleton';

interface Props {
    tournamentId: number
    searchFilter: string,
    roleFilter: number | null
}

const ITEMS_PER_PAGE = 15;

export default function ProjectsList(props: Props) {


    const [page, setPage] = useState(0);
    const topContainerRef = useRef<HTMLDivElement>(null)
    const [scrollToTop, setScrollToTop] = useState(false)

    const [queryFilter, setQueryFilter] = useState<GetProjectsInTournamentQueryVariables>({
        tournamentId: props.tournamentId,
        roleId: props.roleFilter ?? null,
        search: props.searchFilter ?? null,
        skip: ITEMS_PER_PAGE * page,
        take: ITEMS_PER_PAGE,
    });





    const query = useGetProjectsInTournamentQuery({
        variables: queryFilter,
    });


    useEffect(() => {
        setPage(0);
        setQueryFilter(f => ({ ...f, search: props.searchFilter, roleId: props.roleFilter, skip: 0 }))
    }, [props.roleFilter, props.searchFilter]);



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


    const itemsCount = query.data?.getProjectsInTournament && query.data.getProjectsInTournament.projects.length;

    return (
        <div >
            <div ref={topContainerRef}></div>
            <div className='flex flex-col gap-16 lg:gap-24'>
                {
                    query.loading ?
                        <>
                            <ProjectCardSkeleton />

                            <ProjectCardSkeleton />
                            <ProjectCardSkeleton />
                        </>
                        :
                        (itemsCount !== 0 ?
                            query.data?.getProjectsInTournament.projects.map(project => <ProjectCard key={project.id} project={project} />) :
                            <div className="py-80 text-center text-body2">
                                <p className="text-gray-400">No projects found here...</p>
                            </div>)
                }
                < div className='flex justify-center gap-36 text-gray-400' >
                    <IconButton isDisabled={!query.data?.getProjectsInTournament.hasPrev} onClick={prevPage}>
                        <FaChevronLeft />
                    </IconButton>
                    <IconButton isDisabled={!query.data?.getProjectsInTournament.hasNext} onClick={nextPage} >
                        <FaChevronRight />
                    </IconButton>
                </div >
            </div>
        </div>
    )
}
