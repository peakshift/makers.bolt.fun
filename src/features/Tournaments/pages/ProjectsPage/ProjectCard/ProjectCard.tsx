import { GetProjectsInTournamentQuery, } from "src/graphql";
import Card from 'src/Components/Card/Card';
import Button from "src/Components/Button/Button"
import { useAppDispatch } from "src/utils/hooks";
import { openModal } from "src/redux/features/modals.slice";
import { FaUsers } from "react-icons/fa";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";

type ProjectType = GetProjectsInTournamentQuery['getProjectsInTournament']['projects'][number]

interface Props {
    project: ProjectType,
}

export default function ProjectCard({ project }: Props) {


    const dispatch = useAppDispatch();

    const openProject = () => {
        dispatch(openModal({
            Modal: "ProjectDetailsCard",
            isPageModal: true,
            props: {
                projectId: project.id
            }
        }))
    }

    return (
        <Card className="flex flex-col gap-24">
            <div className="flex flex-wrap gap-24 items-start">
                <img src={project.thumbnail_image} className='shrink-0 w-64 aspect-square rounded-12 object-cover outline outline-2 outline-gray-200' alt="" />
                <div className="flex flex-col gap-4 flex-1 overflow-hidden">
                    <p className="text-body2 text-gray-900 font-bold" role='button' onClick={openProject}>{project.title}</p>
                    <p className="text-body4 text-gray-600 font-medium">{project.category.icon} {project.category.title}</p>
                </div>
            </div>
            <p className=" text-body5 text-gray-400 line-clamp-2 max-w-[60ch]">{project.description} </p>
            <div className="mt-auto">
                <p className="text-body5 text-gray-900 font-medium mb-12">👾 Makers</p>
                <p className="text-body5 text-gray-600 flex mb-16">
                    {project.members.map(({ user: { avatar: img } }, idx) => <div className='w-[18px] h-32 relative'><Avatar key={idx} src={img} width={32} className='absolute top-0 left-0 min-w-[32px] !border-white' /></div>)}
                    {project.members_count > project.members.length && <span className='text-gray-400 font-medium self-center ml-24 '>+ {project.members_count - project.members.length} others</span>}
                </p>
            </div>
            <Button fullWidth size="sm" color='white' onClick={openProject} className=''>View Details</Button>
        </Card>
    )
}
