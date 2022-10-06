
import ProjectCardMini from "src/features/Projects/Components/ProjectCardMini/ProjectCardMini";
import ProjectCardMiniSkeleton from 'src/features/Projects/Components/ProjectCardMini/ProjectCardMini.Skeleton';
import { openModal } from 'src/redux/features/modals.slice';
import { useAppDispatch } from 'src/utils/hooks';
import { ProjectCard } from 'src/utils/interfaces';

interface Props {
    isLoading?: boolean;
    projects: ProjectCard[]
}

export default function ProjectsGrid({ isLoading, projects }: Props) {

    const dispatch = useAppDispatch();

    const handleClick = (projectId: string) => {
        // dispatch(openModal({
        //     Modal: "ProjectDetailsCard",
        //     isPageModal: true,
        //     props: {
        //         projectId
        //     }
        // }))
    }

    return (
        <div style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(296px, 1fr) )',
            display: 'grid',
            gridGap: '24px',
        }}>
            {isLoading && Array(12).fill(0).map((_, idx) => <ProjectCardMiniSkeleton key={idx} />)}
            {!isLoading && projects.map((project) => <ProjectCardMini key={project.id} project={project} onClick={handleClick} />)}
        </div>
    )
}
