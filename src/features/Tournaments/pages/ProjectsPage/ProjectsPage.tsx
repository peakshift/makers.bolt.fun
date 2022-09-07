import { useDebouncedState } from '@react-hookz/web';
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import { Tournament, useGetProjectsInTournamentQuery } from 'src/graphql'
import ProjectCard from './ProjectCard/ProjectCard';
import ProjectCardSkeleton from './ProjectCard/ProjectCard.Skeleton';

interface Props {
    data: Pick<Tournament,
        | 'id'>
}

export default function ProjectsPage({ data: { id } }: Props) {


    const [searchFilter, setSearchFilter] = useState("");
    const [debouncedsearchFilter, setDebouncedSearchFilter] = useDebouncedState("", 500);



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
            <h2 className='text-body1 font-bolder text-gray-900'>Projects {projectsCount && `(${projectsCount})`}</h2>

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
