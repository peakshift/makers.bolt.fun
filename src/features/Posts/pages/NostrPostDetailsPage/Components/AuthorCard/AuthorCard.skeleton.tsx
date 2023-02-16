import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Button from "src/Components/Button/Button";
import { Author } from "src/features/Posts/types";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { trimText } from "src/utils/helperFunctions";
import { createRoute } from "src/utils/routing";
import Skeleton from 'react-loading-skeleton';


export default function AuthorCardSkeleton() {
    return (
        <div className="bg-white p-16 border-2 border-gray-200 rounded-12">
            <div className='flex gap-8'>
                <Skeleton circle width={48} height={48} />
                <div className="overflow-hidden">
                    <p className={`'text-body4' text-black font-medium overflow-hidden text-ellipsis whitespace-nowrap`}><Skeleton width={'15ch'} /></p>
                    <p className={`text-body6 text-gray-600`}><Skeleton width={'20ch'} /></p>
                </div>
            </div>
            <Button
                fullWidth
                color="gray"
                className="mt-16">
                <div className="opacity-0">Hidden</div>
            </Button>
        </div>
    )
}
