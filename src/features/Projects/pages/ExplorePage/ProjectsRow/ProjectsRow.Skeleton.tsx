
import Skeleton from "react-loading-skeleton";
import ProjectCardMiniSkeleton from "src/features/Projects/Components/ProjectCardMini/ProjectCardMini.Skeleton";

export default function ProjectsRowSkeleton() {

    return (
        <div className='mb-48'>
            <h3 className="font-bolder text-body3 mb-24 px-32">
                <Skeleton width='10ch' />
            </h3>
            <div className="p-32 flex gap-20">
                {Array(5).fill(0).map((_, idx) => (
                    <ProjectCardMiniSkeleton key={idx} />
                ))}
            </div>


        </div>
    )
}
