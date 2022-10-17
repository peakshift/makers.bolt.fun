import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useCarousel } from 'src/utils/hooks'
import { useTournament } from '../../TournamentDetailsPage/TournamentDetailsContext'
import MyProjectCard from '../MyProjectCard/MyProjectCard'

export default function MyTournamentProjects() {
    const { myParticipationInfo } = useTournament()
    const { viewportRef, scrollSnaps, selectedSnapIndex, canScrollNext, canScrollPrev, scrollSlides } = useCarousel({
        align: "start"
    })

    if (!myParticipationInfo?.projects.length)
        return null;

    return (
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

            {myParticipationInfo.projects.length > 1 && <div className="mt-24 flex justify-center items-center gap-4 ">
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
            </div>}
        </div>
    )
}
