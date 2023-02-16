import { BsBookmark } from "react-icons/bs"
import { FiArrowLeft } from "react-icons/fi"
import { MdIosShare } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import VoteButton from "src/Components/VoteButton/VoteButton"
import { Post } from "src/features/Posts/types"
import { Vote_Item_Type } from "src/graphql"
import { useVote } from "src/utils/hooks"


export default function PostActionsSkeleton() {

    const actions = [
        {
            icon: MdIosShare,
            value: '--'
        },
    ];




    const navigate = useNavigate();


    return (
        <div>
            <button className={`
            hidden md:flex w-full aspect-square bg-white rounded-12 border-2 border-gray-200 justify-around items-center text-gray-500 hover:bg-gray-50 active:bg-gray-100
            `}
                onClick={() => navigate(-1)}
            >
                <FiArrowLeft className={"text-body1"} />
            </button>

        </div>
    )
}
