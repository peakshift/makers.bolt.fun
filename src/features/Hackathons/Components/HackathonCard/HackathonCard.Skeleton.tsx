import { Hackathon } from "src/features/Hackathons/types"
import { IoLocationOutline } from 'react-icons/io5'
import Button from "src/Components/Button/Button"
import Skeleton from "react-loading-skeleton"


export default function HackathonCardSkeleton() {
    return (
        <div className="rounded-16 bg-white overflow-hidden">
            <div className="w-full h-[120px] bg-gray-200" />
            <div className="p-16">
                <div className="flex flex-col gap-8">
                    <h3 className="text-body1 font-bold text-gray-900">
                        <Skeleton width={'100%'} />
                    </h3>
                    <p className="text-body3 font-medium text-gray-900">
                        <Skeleton width={'100%'} />
                    </p>
                    <p className="text-body4 font-medium text-gray-600">
                        <Skeleton width={'50%'} />
                    </p>
                    <p className="text-body4 text-gray-600">
                        <Skeleton width={'100%'} />
                        <Skeleton width={'40%'} />
                    </p>
                </div>
                <div className="mt-16 flex flex-wrap gap-8">
                    <div className="p-8 bg-gray-50 rounded-8 w-[92px] h-36">
                    </div>
                    <div className="p-8 bg-gray-50 rounded-8 w-[92px] h-36">
                    </div>
                </div>
                <div className="bg-gray-100 h-[56px] mt-16 rounded-lg">
                </div>
            </div>
        </div>
    )
}
