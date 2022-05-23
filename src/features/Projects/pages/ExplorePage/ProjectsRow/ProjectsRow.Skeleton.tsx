
import Skeleton from "react-loading-skeleton";
import ProjectCardMiniSkeleton from "src/features/Projects/Components/ProjectCardMini/ProjectCardMini.Skeleton";

export default function ProjectsRowSkeleton() {

    return (
        <div className='mb-48'>
            <h3 className="font-bolder text-body3 mb-24">
                <Skeleton width='10ch' />
            </h3>
            <div className=" flex gap-20">
                {Array(5).fill(0).map((_, idx) => (
                    <ProjectCardMiniSkeleton key={idx} />
                ))}
            </div>


        </div>
    )
}
