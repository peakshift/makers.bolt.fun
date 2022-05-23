import Skeleton from 'react-loading-skeleton'


export default function ProjectCardMiniSkeleton() {
    return (
        <div className="bg-gray-25 select-none px-16 py-16 flex min-w-[296px] gap-16 border border-gray-200 rounded-10 items-center" >
            <Skeleton width={80} height={80} containerClassName='flex-shrink-0' />
            <div className="justify-around items-start min-w-0">
                <p className="text-body4 w-full font-bold overflow-ellipsis overflow-hidden whitespace-nowrap"><Skeleton width="15ch" /></p>
                <p className="text-body5 text-gray-600 font-light my-[5px]"><Skeleton width="10ch" /></p>
                <span className="font-light text-body5"> <Skeleton width="5ch"></Skeleton> </span>
            </div>
        </div>
    );
}
