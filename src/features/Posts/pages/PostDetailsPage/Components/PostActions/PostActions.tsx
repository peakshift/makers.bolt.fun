import { BsBookmark } from "react-icons/bs"
import { MdIosShare, MdLocalFireDepartment } from "react-icons/md"



export default function PostActions() {

    const actions = [
        {
            icon: MdLocalFireDepartment,
            value: 123,
            classes: ''
        },
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
        <ul className="bg-white rounded-12 p-16 border   flex flex-col gap-32">
            {actions.map((action, idx) => <li
                className={`py-4 px-16 text-body5 flex flex-col items-center cursor-pointer rounded-24 
                ${idx === 0 ? 'bg-warning-50 hover:bg-warning-100 active:bg-warning-200 text-gray-900 font-medium' : 'text-gray-500 hover:bg-gray-50 active:bg-gray-100'}`}>
                <action.icon className={idx === 0 ? "text-fire text-body4 scale-125 mb-4" : "text-body4 mb-8"}></action.icon>
                <span>{action.value}</span>
            </li>)}
        </ul>
    )
}
