import { ReactElement, useRef } from "react";
import { ProjectCard } from "../../../utils/interfaces";
import Carousel from 'react-multi-carousel';
import { MdLocalFireDepartment } from 'react-icons/md';
import { useAppDispatch } from "../../../utils/hooks";
import { ModalId, openModal } from "../../../redux/features/modals.slice";

const responsive = {
    all: {
        breakpoint: { max: 5000, min: 0 },
        items: (((window.innerWidth - 64) / (296 + 24))),
    }
}



interface Props { title: string | ReactElement, projects: ProjectCard[] }

export default function ProjectsRow({ title, projects }: Props) {

    const dispatch = useAppDispatch()

    let drag = useRef(false);

    document.addEventListener('mousedown', () => drag.current = false);
    document.addEventListener('mousemove', () => drag.current = true);

    const handleClick = (projectId: string) => {
        projectId = '123123123';
        if (!drag.current)
            dispatch(openModal({ modalId: ModalId.Project, propsToPass: { projectId } }))
    }

    return (
        <div className='mb-40 overflow-hidden'>
            <h3 className="font-bolder text-body3 mb-20 px-32">{title}</h3>
            <Carousel
                containerClass='py-10 pl-32'
                showDots={false}
                arrows={false}
                responsive={responsive}
                infinite
            >
                {projects.map((project, idx) => <div key={idx} className="select-none px-16 py-16  flex w-[296px] gap-16 border-gray-200 shadow-md border-2 rounded-10 transform transition-transform hover:cursor-pointer hover:scale-105" onClick={() => handleClick(project.id)}>
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
