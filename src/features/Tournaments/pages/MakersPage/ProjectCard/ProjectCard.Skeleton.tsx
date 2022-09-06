import Card from 'src/Components/Card/Card';
import Badge from 'src/Components/Badge/Badge';
import Skeleton from 'react-loading-skeleton';


export default function ProjectCardSkeleton() {


    return (
        <Card>
            <div className="flex flex-wrap gap-24 items-start">
                <div className="shrink-0 w-64 md:w-80 aspect-square">
                    <Skeleton borderRadius={16} width={"100%"} height={'100%'} />
                </div>
                <div className="flex flex-col gap-4 flex-1">
                    <p className="text-body2 text-gray-900 font-bold"><Skeleton width={"15ch"} /> </p>
                    <p className="text-body4 text-gray-600 font-medium"><Skeleton width={"8ch"} /> </p>
                    <p className="text-body5 text-gray-600 font-medium"><Skeleton width={"35ch"} /> </p>
                </div>
            </div>
            <hr className="hidden md:block bg-gray-200 mt-24"></hr>

            <div className="md:hidden mt-24">
                <p className="text-body5 text-gray-900 font-medium"><Skeleton width={"7ch"} /></p>
                <ul className="flex flex-wrap gap-8 mt-4">
                    {Array(3).fill(0).map((_, idx) => <li key={idx}><Badge size='sm' className='!text-body5'> <span className="opacity-0">Loading role</span> </Badge> </li>)}
                </ul>
            </div>

            <div className="mt-24">
                <p className="text-body5 text-gray-900 font-medium"><Skeleton width={"7ch"} /></p>
                <ul className="flex flex-wrap gap-8 mt-12">
                    {Array(3).fill(0).map((_, idx) => <li key={idx}><Badge size='sm' className='!text-body5'> <span className="opacity-0">Loading role</span> </Badge> </li>)}                </ul>
            </div>
        </Card>
    )
}
