import { BsBookmark } from "react-icons/bs"
import { MdIosShare } from "react-icons/md"
import VoteButton from "src/Components/VoteButton/VoteButton"

interface Props {
    votes_count: number
}

export default function PostActions(props: Props) {

    const actions = [
        {
            icon: BsBookmark,
            value: 27
        },
        {
            icon: MdIosShare,
            value: 72
        },
    ]

    return (
        <ul className="bg-white rounded-12 p-16 border flex justify-around md:flex-col gap-32">
            <VoteButton initVotes={props.votes_count} direction='vertical' fillType="upDown" />
            {actions.map((action, idx) => <li
                className={`py-8 px-20 text-body5 flex flex-col justify-center items-center cursor-pointer rounded-8 
                ${'text-gray-500 hover:bg-gray-50 active:bg-gray-100'}`}>
                <action.icon className={"text-body4 mb-8"}></action.icon>
                <span>{action.value}</span>
            </li>)}
        </ul>
    )
}
