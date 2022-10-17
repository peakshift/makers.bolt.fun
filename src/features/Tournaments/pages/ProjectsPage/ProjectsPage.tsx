import { useDebouncedState } from '@react-hookz/web';
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import Button from 'src/Components/Button/Button';
import { useGetProjectsInTournamentQuery } from 'src/graphql'
import { openModal } from 'src/redux/features/modals.slice';
import { useAppDispatch, useCarousel } from 'src/utils/hooks';
import { useTournament } from '../TournamentDetailsPage/TournamentDetailsContext';
import MyProjectCard from './MyProjectCard/MyProjectCard';
import ProjectCard from './ProjectCard/ProjectCard';
import ProjectCardSkeleton from './ProjectCard/ProjectCard.Skeleton';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import BasicSelectInput from 'src/Components/Inputs/Selects/BasicSelectInput/BasicSelectInput';


export default function ProjectsPage() {

    const dispatch = useAppDispatch();
    const { tournamentDetails: { id, title, tracks }, myParticipationInfo } = useTournament()

    const [searchFilter, setSearchFilter] = useState("");
    const [debouncedsearchFilter, setDebouncedSearchFilter] = useDebouncedState("", 500);
    const [trackFilter, setTrackFilter] = useState<typeof tracks[number] | null>(null)


    const { viewportRef, scrollSnaps, selectedSnapIndex, canScrollNext, canScrollPrev, scrollSlides } = useCarousel({
        align: "start"
    })


    const query = useGetProjectsInTournamentQuery({
        variables: {
            tournamentId: id,
            trackId: trackFilter?.id ?? null,
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
                        <div className="overflow-hidden" ref={viewportRef}>
                            <div className="w-full flex gap-16">
                                {myParticipationInfo.projects.map(project => <div key={project.project.id} className="flex-[0_0_100%]">
                                    <MyProjectCard projectTournament={project} />
                                </div>)}

                            </div>
                        </div>
                    </div>

                    <div className="mt-24 flex justify-center items-center gap-4 ">
                        <button className={`text-body4 mr-12 text-gray-400 ${canScrollPrev && 'opacity-100'} active:scale-90`} onClick={() => scrollSlides(-1)}>
                            <FaChevronLeft />
                        </button>
                        {scrollSnaps.map((_, index) => (
                            <div
                                key={index}
                                className={`
                                        rounded-full w-[8px] h-[8px]
                                        ${index === selectedSnapIndex ? "bg-gray-500" : "bg-gray-200"}
                                        `}></div>
                        ))}
                        <button className={`text-body4 ml-12 text-gray-400 ${canScrollNext && 'opacity-100'} active:scale-90`} onClick={() => scrollSlides(1)}>
                            <FaChevronRight />
                        </button>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
                <div className="input-wrapper relative lg:col-span-2">
                    <FiSearch className="self-center ml-16 flex-shrink-0 w-[20px] text-gray-400" />
                    <input
                        type='text'
                        className="input-text"
                        placeholder="Search"
                        value={searchFilter}
                        onChange={e => changeSearchFilter(e.target.value)}
                    />
                </div>
                <BasicSelectInput
                    isMulti={false}
                    labelField='title'
                    valueField='id'
                    placeholder='All tracks'
                    isClearable
                    value={trackFilter}
                    onChange={(v) => setTrackFilter(v)}
                    options={tracks}
                />
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
