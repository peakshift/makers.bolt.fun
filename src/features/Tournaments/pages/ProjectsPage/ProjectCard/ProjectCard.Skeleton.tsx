import Card from 'src/Components/Card/Card';
import Skeleton from 'react-loading-skeleton';
import Button from 'src/Components/Button/Button';


export default function ProjectCardSkeleton() {


    return (
        <Card>
            <div className="flex flex-wrap gap-24 items-start">
                <div className='bg-gray-100 shrink-0 w-64 md:w-80 aspect-square rounded-full outline outline-2 outline-gray-200' />
                <div className="flex flex-col gap-4 flex-1 overflow-hidden">
                    <p className="text-body2 text-gray-900 font-bold"><Skeleton width={'13ch'} /></p>
                    <p className="text-body4 text-gray-600 font-medium"><Skeleton width={'8ch'} /></p>
                </div>
            </div>
            <p className="mt-24 text-body5 text-gray-400 line-clamp-2 max-w-[60ch]"><Skeleton width={'100%'} /><Skeleton width={'70%'} />  </p>
            <div className="mt-24">
                <p className="text-body5 text-gray-900 font-medium mb-12"><Skeleton width={'7ch'} /> </p>
                <span className='align-middle'><Skeleton width={'12ch'} /> </span>

            </div>
            <Button fullWidth color='primary' size='sm' className='mt-24 invisible' hidden>View Details</Button>
        </Card>
    )
}
