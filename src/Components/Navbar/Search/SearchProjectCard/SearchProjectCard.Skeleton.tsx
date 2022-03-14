import Skeleton from 'react-loading-skeleton'

export default function SearchProjectCardSkeleton() {
    return <div
        className='p-12 rounded-12  flex items-start gap-16 cursor-pointer'
    >
        <Skeleton width={40} height={40} containerClassName='flex-shrink-0' />
        <div className="min-w-0">
            <p className="text-body4 text-black w-full font-bold overflow-ellipsis overflow-hidden whitespace-nowrap"><Skeleton width="15ch" /></p>
            <p className="text-body6 text-gray-600 font-light mt-4"><Skeleton width="10ch" /></p>
        </div>

    </div>
}
