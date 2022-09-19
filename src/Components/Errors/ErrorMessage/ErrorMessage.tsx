import { Link } from "react-router-dom"

interface Props {
    message?: string | JSX.Element,
    type?: 'unknown' | 'fetching'
}

export default function ErrorMessage({
    message,
    type = 'unknown'
}: Props) {

    let messageToShow = message

    if (!message) {
        if (type === 'unknown')
            messageToShow = 'Opsss..., something wrong happened';
        if (type === 'fetching')
            messageToShow = 'Opsss..., something unexpected happened while fetching data';
    }


    return (
        <div className="bg-red-50 border border-red-500 rounded-12 text-gray-900 px-20 py-36 flex flex-col items-center ">
            <div >
                {messageToShow}
            </div>
            <a href='/' className='text-primary-500 mt-36 underline' >Back to home page</a>
        </div>
    )
}
