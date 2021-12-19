import { motion } from "framer-motion";
import { ReactElement } from "react";


interface Props {
    onClose: () => void;

    children: ReactElement
    [key: string]: any;
}


export default function Modal({ onClose, children, ...props }: Props) {
    return (
        <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed w-full h-full items-center overflow-x-hidden no-scrollbar'
            {...props}
        >
            <div
                className='w-screen min-h-screen relative flex flex-col justify-center items-center md:py-64 md:px-16 overflow-x-hidden no-scrollbar'
            >

                <div
                    className={`absolute w-full h-full top-0 left-0 bg-gray-300 bg-opacity-50 ${props.isPageModal && "hidden md:block"}`}
                    onClick={onClose}
                ></div>
                {children}
            </div>
        </motion.div>
    )
}
