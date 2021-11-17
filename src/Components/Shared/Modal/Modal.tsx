import { ReactElement } from "react";


interface Props {
    onClose: () => void;
    children: ReactElement
}


export default function Modal(props: Props) {
    return (
        <div className='w-full h-full fixed inset-0 py-32 md:py-64 flex justify-center overflow-x-hidden overflow-y-scroll no-scrollbar'>
            <div
                className="w-full h-full bg-gray-300 bg-opacity-50 absolute inset-0"
                onClick={props.onClose}
            ></div>
            {props.children}
        </div>
    )
}
