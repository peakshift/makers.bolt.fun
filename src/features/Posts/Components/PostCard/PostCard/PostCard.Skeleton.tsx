import Skeleton from "react-loading-skeleton"
import Badge from 'src/Components/Badge/Badge'
import Card from "src/Components/Card/Card"

export default function PostCardSkeleton() {
  return <div>
    <div className="flex gap-8 items-center mb-8">
      <Skeleton circle width={24} height={24} />
      <span className='flex gap-4 mt-4'>
        <p className="text-gray-900 text-body5 font-medium"><Skeleton width="12ch" /></p>
      </span>
    </div>
    <Card>
      <div className="relative h-[200px]">
        <Skeleton height='100%' className='!leading-inherit rounded-8' />
      </div>

      <h2 className="text-h4 font-bolder mt-16">
        <Skeleton width={'70%'} />
      </h2>
      <p className="text-body4 text-gray-600 mt-8">
        <Skeleton width={'100%'} />
        <Skeleton width={'40%'} />
      </p>

      <hr className="my-16 bg-gray-200" />
      <div className="flex gap-24 items-center">
        <Badge size="sm" isLoading />
        <div className="text-gray-600">
          <span className="align-middle text-body5"><Skeleton width={'10ch'} /></span>
        </div>
      </div>


    </Card>
  </div>
}
