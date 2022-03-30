
import { openModal } from 'src/redux/features/modals.slice';
import { openProject } from 'src/redux/features/project.slice';
import { toggleSearch } from 'src/redux/features/ui.slice';
import { useAppDispatch } from 'src/utils/hooks';
import { ProjectSearchItem } from '../Search';
import SearchProjectCard from '../SearchProjectCard/SearchProjectCard';
import styles from './styles.module.css'

interface Props {
    isLoading?: boolean;
    projects: ProjectSearchItem[] | undefined,
}

export default function SearchResults({ projects, isLoading }: Props) {

    const dispatch = useAppDispatch();

    const handleOpenProject = (projectId: number) => {
        dispatch(toggleSearch(false))
        dispatch(openProject(projectId));
        dispatch(openModal({ Modal: "ProjectDetailsCard" }))
    }

    return (
        <div className={`
        max-h-[360px] rounded-10 bg-white border border-gray-200 px-8 py-16 overflow-y-scroll shadow-2xl
        ${styles['search-results']}
        `}>
            {
                isLoading && !projects ?
                    Array(3).fill(0).map((_, idx) => <SearchProjectCard key={idx} loading />)
                    :
                    <>
                        <p className="text-gray-600 text-body5 px-16 py-8">
                            {projects?.length} search results
                        </p>
                        {
                            projects?.map(project => <SearchProjectCard key={project.id} project={project} onClick={handleOpenProject} />)
                        }
                    </>
            }

        </div>
    )
}
