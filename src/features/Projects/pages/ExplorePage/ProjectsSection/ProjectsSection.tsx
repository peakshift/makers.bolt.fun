
import ProjectsRow from "../ProjectsRow/ProjectsRow";
import ProjectsRowSkeleton from "../ProjectsRow/ProjectsRow.Skeleton";
import { MdLocalFireDepartment } from "react-icons/md";
import { useExploreProjectsQuery } from "src/graphql";


export default function ProjectsSection() {

    const { data, loading } = useExploreProjectsQuery();


    if (loading || !data) return <div className='mt-32 lg:mt-48'>
        {Array(3).fill(0).map((_, idx) => <ProjectsRowSkeleton key={idx} />)}
    </div>;

    const shockTheWebCategory = data.allCategories.find(c => c.id === 11);
    const restCategories = data.allCategories.filter(c => c.id !== 11)

    return (
        <div className='mt-32 lg:mt-48'>
            <ProjectsRow title={<><span className="align-middle mr-8">Hottest</span> <MdLocalFireDepartment className='inline-block text-fire scale-125 ' /></>}
                link='/apps/hottest'
                projects={data.hottestProjects} />

            <ProjectsRow title="Recently added"
                projects={data.newProjects} />

            {shockTheWebCategory &&
                <ProjectsRow title={shockTheWebCategory.title}
                    link={`/apps/category/${shockTheWebCategory.id}`}
                    projects={shockTheWebCategory.project!} />}
            {restCategories.map(({ id, title, project, }) => {
                if (project)
                    return <ProjectsRow
                        key={id}
                        link={`/apps/category/${id}`}
                        title={title}
                        projects={project} />
                else return null
            })}
        </div>
    )
}
