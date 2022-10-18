import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Project } from 'src/graphql'
import { useCarousel } from 'src/utils/hooks'
import { useTournament } from '../../TournamentDetailsPage/TournamentDetailsContext'
import MyProjectCard from '../MyProjectCard/MyProjectCard'
import ProjectCard, { TournamentProjectCardType } from '../ProjectCard/ProjectCard'
import { TrackFilterType } from '../ProjectsFilters/ProjectsFilters'


interface Props {
    projects: TournamentProjectCardType[]
}



export default function MyTournamentProjects({ projects }: Props) {


    return (
        <>
            {projects
                .map(project => <ProjectCard
                    key={project.id}
                    project={project}
                    isOwner
                />)}
        </>
    )
}
