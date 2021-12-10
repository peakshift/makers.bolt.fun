
import ProjectsRow from "../ProjectsRow/ProjectsRow";
import { MdLocalFireDepartment } from "react-icons/md";
import { useQuery } from "@apollo/client";
import { ALL_CATEGORIES_PROJECTS_QUERY, ALL_CATEGORIES_PROJECTS_RES } from "./query";


export default function ProjectsSection() {

    const { data, loading } = useQuery<ALL_CATEGORIES_PROJECTS_RES>(ALL_CATEGORIES_PROJECTS_QUERY);

    if (loading || !data) return null;

    return (
        <div className='mt-32 lg:mt-48'>
            <ProjectsRow title={<>Hottest <MdLocalFireDepartment className='inline-block text-fire align-bottom scale-125 origin-bottom' /></>}
                categoryId="133123"
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
