
import Skeleton from 'react-loading-skeleton';

interface Props {
    size?: 'sm' | 'md'
}

export default function HeaderSkeleton({ size = 'md', }: Props) {

    return (
        <div className='flex gap-8 items-center'>
            <Skeleton circle width={size === 'md' ? 40 : 32} height={size === 'md' ? 40 : 32} />
            <div>
                <p className={`${size === 'md' ? 'text-body4' : "text-body5"} text-black font-medium`}>
                    <Skeleton width={'12ch'} />
                </p>
                <p className={`text-body6 text-gray-600`}>
                    <Skeleton width={'7ch'} />
                </p>
            </div>
        </div>
    )
}
