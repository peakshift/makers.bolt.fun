import React, { useMemo } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Tournament } from 'src/graphql'
import { useCarousel } from 'src/utils/hooks'

interface Props {
    data: Pick<Tournament, 'events_count' | 'makers_count' | 'projects_count'>
}

export default function Navigation({ data }: Props) {

    const { viewportRef, scrollSlides, canScrollNext, canScrollPrev, isClickAllowed } = useCarousel({
        align: 'start', slidesToScroll: 2,
        containScroll: "trimSnaps",
    })

    const links = useMemo(() => [
        {
            text: "Overview",
            path: "overview",
        },
        {
            text: `Events (${data.events_count})`,
            path: "events",
        },
        {
            text: `Makers (${data.makers_count})`,
            path: "makers",
        },
        {
            text: `Projects (${data.projects_count})`,
            path: "projects",
        },
        {
            text: "Ideas",
            path: "ideas",
        },
        {
            text: "Resources",
            path: "resources",
        },
    ], [data.events_count, data.makers_count, data.projects_count])

    return (
        <div className="w-full bg-white py-16 border-b-2 border-gray-200">
            <div className="relative group content-container">
                <div className="overflow-hidden" ref={viewportRef}>
                    <div className="select-none w-full flex gap-16">
                        {links.map((link) => <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) => ` 
                   min-w-max rounded-48 px-16 py-8 cursor-pointer font-medium text-body5
                    active:scale-95 transition-transform
                    ${isActive ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                            // onClick={() => filterClicked(f.value)}
                            role='button'
                        >
                            {link.text}
                        </NavLink>)}
                    </div>
                </div>
                {/* <button className={`absolute text-body6 w-[28px] aspect-square flex justify-center items-center left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full bg-white text-gray-400 opacity-0 ${canScrollPrev && 'group-hover:opacity-100'} active:scale-90 transition-opacity border border-gray-200 shadow-md`} onClick={() => scrollSlides(-1)}>
                    {"<"}
                </button>
                <button className={`absolute text-body6 w-[28px] aspect-square flex justify-center items-center right-0 translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full bg-white text-gray-400  opacity-0 ${canScrollNext && 'group-hover:opacity-100'} active:scale-90 transition-opacity border border-gray-200 shadow-md`} onClick={() => scrollSlides(1)}>
                    {">"}
                </button> */}
            </div>
        </div>
    )
}
