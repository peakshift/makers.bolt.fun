import { ReactElement, useEffect, useRef, useState } from "react";
import { ProjectCard } from "../../../utils/interfaces";
import Carousel from 'react-multi-carousel';
import { MdDoubleArrow, MdLocalFireDepartment } from 'react-icons/md';
import { useAppDispatch } from "../../../utils/hooks";
import { ModalId, openModal } from "../../../redux/features/modals.slice";
import _throttle from 'lodash.throttle'
import ProjectCardMini from "./ProjectCardMini";

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

interface Props { title: string | ReactElement, categoryId: string, projects: ProjectCard[] }

export default function ProjectsRow({ title, categoryId, projects }: Props) {

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
            <h3 className="font-bolder text-body3 mb-24 px-32">{title}
                <span>
                    <MdDoubleArrow className='text-gray-200 ml-8 hover:cursor-pointer align-bottom transform scale-y-110 scale-x-125 origin-left' onClick={() => {
                        console.log(categoryId);
                    }} />
                </span>
            </h3>
            <Carousel
                containerClass='pl-32 pr-[-32px]'
                showDots={false}
                arrows={false}
                responsive={responsive}
                centerMode
                itemClass='pb-[1px]'
            >
                {projects.map((project, idx) =>
                    <ProjectCardMini key={idx} project={project} onClick={handleClick} />
                )}
            </Carousel>

        </div>
    )
}
