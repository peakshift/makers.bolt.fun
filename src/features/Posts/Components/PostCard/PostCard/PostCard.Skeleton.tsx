import Skeleton from "react-loading-skeleton"
import HeaderSkeleton from "../Header/Header.Skeleton"
import Badge from 'src/Components/Badge/Badge'

export default function PostCardSkeleton() {
  return <div className="bg-white rounded-12 overflow-hidden border">
    <div className="relative h-[200px]">
      <Skeleton height='100%' className='!leading-inherit' />
    </div>
    <div className="p-24">
      <HeaderSkeleton />
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
    </div>
  </div>
}
