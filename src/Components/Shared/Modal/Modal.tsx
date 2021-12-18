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
            className='fixed w-screen h-screen items-center overflow-x-hidden no-scrollbar'
            {...props}
        >
            <div
                className='w-screen min-h-screen relative flex flex-col justify-center items-center py-32 px-16 md:py-64 overflow-x-hidden no-scrollbar'
            >

                <div
                    className="absolute w-full h-full top-0 left-0 bg-gray-300 bg-opacity-50 "
                    onClick={onClose}
                ></div>
                {children}
            </div>
        </motion.div>
    )
}
