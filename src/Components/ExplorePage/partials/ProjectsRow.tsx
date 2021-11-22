import { ReactElement, useEffect, useRef, useState } from "react";
import { ProjectCard } from "../../../utils/interfaces";
import Carousel from 'react-multi-carousel';
import { MdLocalFireDepartment } from 'react-icons/md';
import { useAppDispatch } from "../../../utils/hooks";
import { ModalId, openModal } from "../../../redux/features/modals.slice";
import _throttle from 'lodash.throttle'

const responsive = {
    all: {
        breakpoint: { max: 5000, min: 0 },
        items: (((window.innerWidth - 64) / (296 + 48))),
    }
}

const calcNumItems = () => {
    const items = (((window.innerWidth - 32 - 296) / (296 + 20)));
    return items;
}

interface Props { title: string | ReactElement, projects: ProjectCard[] }

export default function ProjectsRow({ title, projects }: Props) {

    const dispatch = useAppDispatch()
    const [carouselItmsCnt, setCarouselItmsCnt] = useState(calcNumItems);

    responsive.all.items = carouselItmsCnt

    let drag = useRef(false);

    document.addEventListener('mousedown', () => drag.current = false);
    document.addEventListener('mousemove', () => drag.current = true);

    const handleClick = (projectId: string) => {
        projectId = '123123123';
        if (!drag.current)
            dispatch(openModal({ modalId: ModalId.Project, propsToPass: { projectId } }))
    }

    useEffect(() => {
        const listener = _throttle(() => {
            setCarouselItmsCnt(calcNumItems());
        }, 1000);

        window.addEventListener('resize', listener)
        return () => {
            window.removeEventListener('resize', listener)
        }
    }, [])

    return (
        <div className='mb-48'>
            <h3 className="font-bolder text-body3 mb-24 px-32">{title}</h3>
            <Carousel
                containerClass='pl-32 pr-[-32px]'
                showDots={false}
                arrows={false}
                responsive={responsive}
                centerMode
            >
                {projects.map((project, idx) => <div key={idx} className="bg-gray-25 select-none px-16 py-16 flex w-[296px] gap-16 border-gray-200 shadow-md border-2 rounded-10 hover:cursor-pointer hover:bg-gray-100" onClick={() => handleClick(project.id)}>
                    <img src={project.img} draggable="false" className="flex-shrink-0 w-80 h-80 bg-gray-200 border-0 rounded-8"></img>
                    <div className="justify-around items-start min-w-0">
                        <p className="text-body4 w-full font-bold overflow-ellipsis overflow-hidden whitespace-nowrap">{project.title}</p>
                        <p className="text-body5 text-gray-600 font-light my-[5px]">{project.category.title}</p>
                        <span className="chip-small bg-yellow-100 text-yellow-700 font-light text-body5 py-[3px] px-10"> <MdLocalFireDepartment className='inline-block text-fire transform text-body4 align-middle' /> {project.votes_count} </span>
                    </div>

                </div>)}
            </Carousel>

        </div>
    )
}
