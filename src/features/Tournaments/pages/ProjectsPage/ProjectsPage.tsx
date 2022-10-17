import { useDebouncedState } from '@react-hookz/web';
import { useState } from 'react'
import Button from 'src/Components/Button/Button';
import { useGetProjectsInTournamentQuery } from 'src/graphql'
import { openModal } from 'src/redux/features/modals.slice';
import { useAppDispatch } from 'src/utils/hooks';
import { useTournament } from '../TournamentDetailsPage/TournamentDetailsContext';
import ProjectCard from './ProjectCard/ProjectCard';
import ProjectCardSkeleton from './ProjectCard/ProjectCard.Skeleton';
import ProjectsFilters, { TrackFilterType } from './ProjectsFilters/ProjectsFilters';
import MyTournamentProjects from './MyTournamentProjects/MyTournamentProjects';


export default function ProjectsPage() {

    const dispatch = useAppDispatch();
    const { tournamentDetails: { id, title, tracks } } = useTournament()

    const [searchFilter, setSearchFilter] = useState("");
    const [debouncedsearchFilter, setDebouncedSearchFilter] = useDebouncedState("", 500);
    const [trackFilter, setTrackFilter] = useState<TrackFilterType | null>(null)




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
            <MyTournamentProjects />

            <div className="flex flex-wrap justify-between items-center gap-16">
                <h2 className='text-body1 font-bolder text-gray-900'>Projects {projectsCount && `(${projectsCount})`}</h2>
                <Button size='sm' color='primary' onClick={() => dispatch(openModal({
                    Modal: "AddProjectTournamentModal",
                    props: { tournament: { id, title, tracks } }
                }))
                }>Add your project</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
                <ProjectsFilters searchValue={searchFilter} onSearchChange={changeSearchFilter} trackValue={trackFilter} onTrackChange={setTrackFilter} />
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
