import { ReactNode, useCallback, useEffect, useRef, useState, } from "react";
import { ProjectCard } from "src/utils/interfaces";
import { MdDoubleArrow, } from 'react-icons/md';
import { useAppDispatch, useCarousel, useResizeListener } from "src/utils/hooks";
import { openModal } from "src/redux/features/modals.slice";
import { Link } from "react-router-dom";
import ProjectCardMini from "src/features/Projects/Components/ProjectCardMini/ProjectCardMini";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
    title: string | ReactNode,
    link?: string;
    projects: ProjectCard[]
}


function calcNumItems(width = Math.min(window.innerWidth - 32, 1440)) {
    const items = ((width / (296 + 20)));
    return items;
}




export default function ProjectsRow({ title, link, projects }: Props) {

    const [slidesToScroll, setSlidesToScroll] = useState(1)
    const rowRef = useRef<HTMLDivElement>(null)
    const { viewportRef, scrollSlides, canScrollNext, canScrollPrev, isClickAllowed } = useCarousel({ align: 'start', slidesToScroll })
    const dispatch = useAppDispatch()


    const recalcSlidesToScroll = useCallback(() => {
        if (rowRef.current)
            setSlidesToScroll(Math.floor(calcNumItems(rowRef.current.clientWidth)))
    }, [])

    useEffect(recalcSlidesToScroll, [recalcSlidesToScroll])
    useResizeListener(recalcSlidesToScroll);


    if (projects.length === 0)
        return <></>




    const handleClick = (projectId: number) => {
        if (isClickAllowed()) {
            dispatch(openModal({ Modal: "ProjectDetailsCard", props: { projectId } }))
        }
    }



    return (
        <div className='mb-48'>
            <h3 className="font-bolder text-body3 mb-24">
                <span className="align-middle">{title}</span>
                {link && <Link to={link}>
                    <MdDoubleArrow className='text-gray-200 ml-8 hover:cursor-pointer transform scale-y-110 scale-x-125 origin-left' />
                </Link>}
            </h3>
            <div className="relative group" ref={rowRef}>
                <div className="overflow-hidden" ref={viewportRef}>
                    <div className="w-full flex gap-16">
                        {projects.map((project, idx) =>
                            <div key={project.id} className='flex-[0_0_100%] max-w-[296px]' >
                                <ProjectCardMini project={project} onClick={handleClick} />
                            </div>
                        )}
                    </div>
                </div>
                <button
                    className={`absolute inset-y-0 w-64 left-0 opacity-0  transition-opacity 
                                rounded-l-12 bg-gradient-to-r from-gray-700 text-white
                                ${canScrollPrev ? "group-hover:opacity-100" : ""}
                                `}
                    onClick={() => scrollSlides(-1)}
                >
                    <FaChevronLeft />
                </button>
                <button
                    className={`absolute inset-y-0 w-64 right-0 opacity-0  transition-opacity 
                                rounded-r-12 bg-gradient-to-l from-gray-700 text-white
                                ${canScrollNext ? "group-hover:opacity-100" : ""}
                                `}
                    onClick={() => scrollSlides(1)}
                >
                    <FaChevronRight />
                </button>
            </div>
        </div >
    )
}
