import { useQuery } from "react-query";
import { getLatestProjects } from "../../../api"
import ProjectsRow from "./ProjectsRow";
import { MdLocalFireDepartment } from "react-icons/md";


export default function ProjectsSection() {

    const { data, isLoading } = useQuery("latest-projects", getLatestProjects)

    if (isLoading || !data) return null;

    return (
        <div className='mt-32 lg:mt-48'>
            <ProjectsRow title={<>Hottest <MdLocalFireDepartment className='inline-block text-fire align-bottom scale-125 origin-bottom' /></>}
                categoryId='hottest'
                projects={data[0].projects} />
            {data.slice(1).map(({ category, projects, }) => <ProjectsRow
                key={category.id}
                categoryId={category.id}
                title={category.title}
                projects={projects} />)}
        </div>
    )
}
