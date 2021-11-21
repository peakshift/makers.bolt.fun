import { useQuery } from "react-query";
import { getLatestProjects } from "../../../api"
import ProjectsRow from "./ProjectsRow";
import { AiFillThunderbolt } from 'react-icons/ai';


export default function ProjectsSection() {

    const { data, isLoading } = useQuery("latest-projects", getLatestProjects)

    if (isLoading || !data) return null;

    return (
        <div className='mt-32 lg:mt-48'>
            <ProjectsRow title={<>Hottest <AiFillThunderbolt className='inline-block text-thunder transform scale-125' /> apps</>}
                projects={data[0].projects} />
            {data.slice(1).map(({ title, projects }) => <ProjectsRow key={title} title={title} projects={projects} />)}
        </div>
    )
}
