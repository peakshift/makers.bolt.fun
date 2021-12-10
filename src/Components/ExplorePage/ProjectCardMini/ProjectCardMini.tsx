import { MdLocalFireDepartment } from "react-icons/md";
import { ProjectCard } from "../../../utils/interfaces";


interface Props {
    project: ProjectCard
    onClick: (projectId: number) => void
}

export default function ProjectCardMini({ project, onClick }: Props) {
    return (
        <div className="bg-gray-25 select-none px-16 py-16 flex w-[296px] gap-16 border border-gray-200 rounded-10 hover:cursor-pointer hover:bg-gray-100" onClick={() => onClick(project.id)}>
            <img src={project.img} alt={project.title} draggable="false" className="flex-shrink-0 w-80 h-80 bg-gray-200 border-0 rounded-8"></img>
            <div className="justify-around items-start min-w-0">
                <p className="text-body4 w-full font-bold overflow-ellipsis overflow-hidden whitespace-nowrap">{project.title}</p>
                <p className="text-body5 text-gray-600 font-light my-[5px]">{project.category.title}</p>
                <span className="chip-small bg-warning-50 text-yellow-700 font-light text-body5 py-[3px] px-10"> <MdLocalFireDepartment className='inline-block text-fire transform text-body4 align-middle' /> {project.votes_count} </span>
            </div>
        </div>
    );
}
