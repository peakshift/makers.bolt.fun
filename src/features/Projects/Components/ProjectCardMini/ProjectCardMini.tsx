import { MdLocalFireDepartment } from "react-icons/md";
import { numberFormatter } from "src/utils/helperFunctions";
import { ProjectCard } from "src/utils/interfaces";


interface Props {
    project: ProjectCard
    onClick: (projectId: string) => void
}

export default function ProjectCardMini({ project, onClick }: Props) {

    return (
        <div
            className="py-16 select-none px-16 flex items-center gap-16 border-2 border-gray-100 rounded-16  bg-white hover:bg-gray-50"
            onKeyDown={e => {
                e.key !== 'Enter' || onClick(project?.id!)
            }}
            onClick={(e) => { e.currentTarget.focus(); onClick(project?.id!) }}
            tabIndex={0}
            role='button'
        >
            <img src={project?.logo?.[0]['thumbnails']['large'].url} alt={project?.project ?? ''} draggable="false" className="flex-shrink-0 w-64 h-64 bg-gray-200 border-0 rounded-full hover:cursor-pointer"></img>
            <div className="justify-around items-start min-w-0 flex-1 hover:cursor-pointer"
            >
                <p className="text-body4 w-full font-bold overflow-ellipsis overflow-hidden whitespace-nowrap">{project?.category}</p>
                {/* <p className="text-body5 text-gray-600 font-light my-[5px]">{project?.category.title}</p> */}
                {/* <span className="chip-small bg-warning-50 text-yellow-700 font-light text-body5 py-[3px] px-10"> <MdLocalFireDepartment className='inline-block text-fire transform text-body4 align-middle' /> {numberFormatter(project?.votes_count)} </span> */}
            </div>
            {/* <VoteButton votes={project?.votes_count} direction='vertical' dense onVote={vote}></VoteButton> */}
            {/* <div className="flex flex-col text-gray-400 items-center">
                <MdLocalFireDepartment />
                <span className="text-body6">{numberFormatter(project?.votes_count)}</span>
            </div> */}
        </div>
    );
}
