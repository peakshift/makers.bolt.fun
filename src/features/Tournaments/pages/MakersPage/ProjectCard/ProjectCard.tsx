import { GetProjectsInTournamentQuery, } from "src/graphql";
import Card from 'src/Components/Card/Card';
import Badge from 'src/Components/Badge/Badge';
import Button from "src/Components/Button/Button"
import { createRoute } from "src/utils/routing";
import { useAppDispatch } from "src/utils/hooks";
import { openModal } from "src/redux/features/modals.slice";

type ProjectType = GetProjectsInTournamentQuery['getProjectsInTournament']['projects'][number]

interface Props {
    project: ProjectType,
}

export default function ProjectCard({ project }: Props) {

    // const showLookingFor = project.recruit_roles.length > 0;
    const showLookingFor = false;

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
        <Card>
            <div className="flex flex-wrap gap-24 items-start">
                <img src={project.thumbnail_image!} className='shrink-0 w-64 md:w-80 aspect-square rounded-16 outline outline-2 outline-gray-200' alt="" />
                <div className="flex flex-col gap-4 flex-1 overflow-hidden">
                    <p className="text-body2 text-gray-900 font-bold">{project.title}</p>
                    <p className="text-body4 text-gray-600 font-medium">{project.category.icon} {project.category.title}</p>
                    <div className="hidden md:block">
                        <p className="text-body5 text-gray-400 line-clamp-2 max-w-[60ch]">{project.description} </p>
                    </div>
                </div>
                <span className="ml-auto hidden md:inline-block"><Button color='white' onClick={openProject} size='sm' className='ml-auto'>View Details</Button></span>

            </div>
            {showLookingFor && <hr className="hidden md:block bg-gray-200 mt-24"></hr>}
            <p className="md:hidden mt-24 text-body5 text-gray-400 line-clamp-2 max-w-[60ch]">{project.description} </p>
            {/* {showLookingFor && <div className="mt-24">
                <p className="text-body5 text-gray-900 font-medium mb-12">👀 Looking for</p>
                {project.recruit_roles.length ? <ul className="flex flex-wrap gap-8">
                    {project.recruit_roles.map(role => <li key={role.id}><Badge size='sm' className='!text-body5'>{role.icon} {role.title}</Badge> </li>)}
                </ul>
                    :
                    null
                }
            </div>} */}
            <Button fullWidth color='white' onClick={openProject} size='sm' className='mt-32 md:hidden'>View Details</Button>
        </Card>
    )
}
