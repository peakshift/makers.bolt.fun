
import ProjectsRow from "../ProjectsRow/ProjectsRow";
import { MdLocalFireDepartment } from "react-icons/md";
import { useAllCategoriesProjectsQuery } from "src/generated/graphql";


export default function ProjectsSection() {

    const { data, loading } = useAllCategoriesProjectsQuery()

    if (loading || !data) return null;

    return (
        <div className='mt-32 lg:mt-48'>
            <ProjectsRow title={<>Hottest <MdLocalFireDepartment className='inline-block text-fire align-bottom scale-125 origin-bottom' /></>}
                categoryId={10101}
                projects={data.newProjects} />
            {data.allCategories.map(({ id, title, project, }) => {
                if (project)
                    return <ProjectsRow
                        key={id}
                        categoryId={id}
                        title={title}
                        projects={project.map(p => ({ ...p, category: { id, title } }))} />
                else return null
            })}
        </div>
    )
}
