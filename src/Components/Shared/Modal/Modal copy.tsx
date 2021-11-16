import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useEffect, useRef } from "react";
import { Direction } from "../../../redux/features/modals.slice";
import { Portal } from "../Portal/Portal";

export interface ModalCard {
    onClose?: () => void;
    direction: number;
    modalCard: ReactElement
}

export const modalCardVariants = {
    initial: (direction: any) => {
        if (direction === Direction.START) return { opacity: 0, y: 300 };
        else if (direction === Direction.NEXT) return { opacity: 0, x: 300 };
        else if (direction === Direction.PREVIOUS) return { opacity: 0, x: -300 };
        return {}
    },
    animate: {
        x: 0, y: 0, opacity: 1, transition: { type: "spring" }
    },
    exit: (direction: Direction) => {
        const transition = { ease: "easeIn" }
        if (direction === Direction.EXIT) return { transition, opacity: 0, y: 300 };
        else if (direction === Direction.NEXT) return { transition, opacity: 0, x: -300 };
        else if (direction === Direction.PREVIOUS) return { transition, opacity: 0, x: 300 };
        return {}
    },

}

interface Props {
    isOpen?: boolean;
    onClose?: () => void,
    maxWidth?: string;
    children: ReactElement
}

export default function Modal({ children, isOpen = true, onClose = () => { }, maxWidth = "max-w-[600px]" }: Props) {

    const ref = useRef<HTMLDivElement>(null);
    const handleOutsideClick = (e: any) => {
        if (e.target === ref.current) onClose();
    }

    useEffect(() => {
        if (isOpen) document.body.style.overflowY = "hidden";
        else document.body.style.overflowY = "initial";
    }, [isOpen])


    return (
        <Portal>
            <AnimatePresence exitBeforeEnter>
                {isOpen && <motion.div
                    ref={ref}
                    onClick={handleOutsideClick}
                    className={`fixed overscroll-y-none inset-0 bg-gray-300 bg-opacity-70 overflow-y-auto h-full w-full`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { ease: "easeInOut" },
                    }}
                >
                    <div
                        className={`w-full ${maxWidth} mx-auto py-64`}
                    >
                        {children}
                    </div>
                </motion.div>}
            </AnimatePresence>
        </Portal>
    )
}
