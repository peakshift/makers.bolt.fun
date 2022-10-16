import { useDebouncedState } from '@react-hookz/web';
import { useCallback, useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import Button from 'src/Components/Button/Button';
import { useGetProjectsInTournamentQuery } from 'src/graphql'
import { openModal } from 'src/redux/features/modals.slice';
import { useAppDispatch } from 'src/utils/hooks';
import { useTournament } from '../TournamentDetailsPage/TournamentDetailsContext';
import MyProjectCard from './MyProjectCard/MyProjectCard';
import ProjectCard from './ProjectCard/ProjectCard';
import ProjectCardSkeleton from './ProjectCard/ProjectCard.Skeleton';
import useEmblaCarousel from 'embla-carousel-react'
import CustomDot from 'src/features/Projects/pages/ExplorePage/Header/CustomDot/CustomDot';


export default function ProjectsPage() {

    const dispatch = useAppDispatch();
    const { tournamentDetails: { id, title, tracks }, myParticipationInfo } = useTournament()

    const [searchFilter, setSearchFilter] = useState("");
    const [debouncedsearchFilter, setDebouncedSearchFilter] = useDebouncedState("", 500);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
    })

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
    }, [emblaApi, setScrollSnaps, onSelect]);


    const query = useGetProjectsInTournamentQuery({
        variables: {
            tournamentId: id,
            roleId: null,
            search: debouncedsearchFilter,
            skip: 0,
            take: 200,
        },
    });


    const changeSearchFilter = (new_value: string) => {
        setSearchFilter(new_value);
        setDebouncedSearchFilter(new_value);
    }

    const projectsCount = !!query.data?.getProjectsInTournament.projects && query.data.getProjectsInTournament.projects.length;


    return (
        <div className='pb-42 flex flex-col gap-24'>
            {!!myParticipationInfo?.projects.length &&
                <div>
                    <div className="relative group">
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="w-full flex gap-16">
                                {myParticipationInfo.projects.map(project => <div key={project.project.id} className="flex-[0_0_100%]">
                                    <MyProjectCard projectTournament={project} />
                                </div>)}

                            </div>
                        </div>
                    </div>

                    <div className="mt-24 flex justify-center gap-4 ">
                        {scrollSnaps.map((_, index) => (
                            <div
                                key={index}
                                className={`
                                        rounded-full w-[8px] h-[8px]
                                        ${index === selectedIndex ? "bg-gray-500" : "bg-gray-200"}
                                        `}></div>
                        ))}
                    </div>
                </div>
            }

            <div className="flex flex-wrap justify-between items-center gap-16">
                <h2 className='text-body1 font-bolder text-gray-900'>Projects {projectsCount && `(${projectsCount})`}</h2>
                <Button size='sm' color='primary' onClick={() => dispatch(openModal({
                    Modal: "AddProjectTournamentModal",
                    props: { tournament: { id, title, tracks } }
                }))
                }>Add your project</Button>
            </div>

            <div className="input-wrapper relative">
                <FiSearch className="self-center ml-16 flex-shrink-0 w-[20px] text-gray-400" />
                <input
                    type='text'
                    className="input-text"
                    placeholder="Search"
                    value={searchFilter}
                    onChange={e => changeSearchFilter(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
                {query.loading ?
                    Array(9).fill(0).map((_, idx) => <ProjectCardSkeleton key={idx} />)
                    :
                    query.data?.getProjectsInTournament.projects.map(project =>
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />)
                }
            </div>
        </div>
    )
}
