import Skeleton from 'react-loading-skeleton'


export default function StatCardSkeleton() {
    return (
        <div className="bg-white p-24 rounded-16 text-center" >
            <p className="text-body4">
                <Skeleton width={'10ch'} />
            </p>
            <p className="text-h2 mt-8">
                <Skeleton width={'4ch'} />
            </p>
        </div>
    )
}
