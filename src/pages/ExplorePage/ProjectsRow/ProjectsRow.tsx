import { ReactElement, useRef, useState } from "react";
import { ProjectCard } from "../../../utils/interfaces";
import Carousel from 'react-multi-carousel';
import { MdArrowRight, MdDoubleArrow, } from 'react-icons/md';
import { useAppDispatch } from "../../../utils/hooks";
import { openModal } from "../../../redux/features/modals.slice";
import ProjectCardMini from "../ProjectCardMini/ProjectCardMini";
import { useResizeListener } from 'src/utils/hooks'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import './style.css';



const responsive = {
    all: {
        breakpoint: { max: 5000, min: 0 },
        items: calcNumItems()
    }
}

// const calcNumItems = () => {
//     const items = (((window.innerWidth - 32 - 296) / (296 + 20)));
//     return items;
// }

function calcNumItems() {
    const items = (((window.innerWidth - 2 * 32) / (296 + 20)));
    return items;
}

interface Props { title: string | ReactElement, categoryId: string, projects: ProjectCard[] }

export default function ProjectsRow({ title, categoryId, projects }: Props) {

    const [carouselItmsCnt, setCarouselItmsCnt] = useState(calcNumItems);
    const dispatch = useAppDispatch()

    responsive.all.items = carouselItmsCnt

    let drag = useRef(false);

    document.addEventListener('mousedown', () => drag.current = false);
    document.addEventListener('mousemove', () => drag.current = true);

    const handleClick = (projectId: string) => {
        if (!drag.current)
            dispatch(openModal({ Modal: "ProjectCard", props: { projectId } }))
    }

    useResizeListener(() => {
        setCarouselItmsCnt(calcNumItems());
    }, [setCarouselItmsCnt])

    if (projects.length === 0)
        return <></>


    return (
        <div id={title.toString().toLowerCase()} className='mb-48'>
            <h3 className="font-bolder text-body3 mb-24 px-32">{title}
                <span>
                    <MdDoubleArrow className='text-gray-200 ml-8 hover:cursor-pointer align-bottom transform scale-y-110 scale-x-125 origin-left' onClick={() => {
                        console.log(categoryId);
                    }} />
                </span>
            </h3>
            <div className="px-32">
                <Carousel
                    showDots={false}
                    // arrows={false}
                    responsive={responsive}
                    // centerMode
                    itemClass='pb-[1px]'
                    containerClass='group'
                    customLeftArrow={
                        <button className='carousel-btns opacity-0 group-hover:opacity-100 transition-opacity  w-64 h-full absolute top-0 left-0 rounded-l-12 bg-gradient-to-r from-gray-700 text-white' >
                            <IoIosArrowBack className='scale-150' />
                        </button>
                    }
                    customRightArrow={
                        <button className='carousel-btns opacity-0 group-hover:opacity-100 transition-opacity  w-64 h-full absolute top-0 right-0 rounded-r-12 bg-gradient-to-l from-gray-700 text-white' >
                            <IoIosArrowForward className='scale-150' />
                        </button>
                    }
                >
                    {projects.map((project, idx) =>
                        <ProjectCardMini key={idx} project={project} onClick={handleClick} />
                    )}
                </Carousel>
            </div>


        </div>
    )
}
