import { ReactElement } from "react";


interface Props {
    onClose: () => void;
    children: ReactElement
}


export default function Modal(props: Props) {
    return (
        <div className='w-screen h-full fixed inset-0 py-32 md:py-64 flex flex-col justify-center items-center overflow-x-hidden overflow-y-hidden no-scrollbar'>
            <div
                className="w-screen h-full bg-gray-300 bg-opacity-50 absolute inset-0"
                onClick={props.onClose}
            ></div>
            {props.children}
        </div>
    )
}
