import { BsBookmark } from "react-icons/bs"
import { FiArrowLeft } from "react-icons/fi"
import { MdIosShare } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import VoteButton from "src/Components/VoteButton/VoteButton"
import { Post } from "src/features/Posts/types"
import { Vote_Item_Type } from "src/graphql"
import { useVote } from "src/utils/hooks"

interface Props {
    post: Pick<Post,
        | 'id'
        | 'votes_count'
        | '__typename'
    >,
    isPreview?: boolean;
}

export default function PostActions({ post, isPreview }: Props) {

    const actions = [
        {
            icon: MdIosShare,
            value: '--'
        },
    ];




    const navigate = useNavigate();
    const { vote } = useVote({
        itemId: post.id,
        itemType: Vote_Item_Type[post.__typename!]
    });


    return (
        <div>
            <button className={`
            hidden md:flex w-full aspect-square bg-white rounded-12 border-2 border-gray-200 justify-around items-center text-gray-500 hover:bg-gray-50 active:bg-gray-100
            `}
                onClick={() => isPreview ? navigate(-1) : navigate('/blog')}
            >
                <FiArrowLeft className={"text-body1"} />
            </button>
            {/* <ul className="bg-white rounded-12 p-16 border-2 border-gray-200 flex justify-around md:flex-col gap-32">
                <li
                    className={`py-8 px-20 text-body5 flex flex-col justify-center items-center cursor-pointer rounded-8 
                ${'text-gray-500 hover:bg-gray-50 active:bg-gray-100'}`}>
                    <FiArrowLeft className={"text-body4 mb-8"} />
                </li>
            </ul> */}
            <ul className="bg-white rounded-12 p-16 border-2 border-gray-200 flex justify-around md:flex-col gap-32 mt-32">
                <VoteButton votes={post.votes_count} onVote={vote} direction='vertical' fillType="upDown" />
                {actions.map((action, idx) => <li
                    key={idx}
                    className={`py-8 px-20 text-body5 flex flex-col justify-center items-center cursor-pointer rounded-8 
                ${'text-gray-500 hover:bg-gray-50 active:bg-gray-100'}`}>
                    <action.icon className={"text-body4 mb-8"}></action.icon>
                    <span>{action.value}</span>
                </li>)}
            </ul>
        </div>
    )
}
