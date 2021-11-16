import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { closeModal, Direction, ModalId } from "../../../redux/features/modals.slice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import LoginCard_1 from "../../Login/LoginCard-1";
import ProjectCard from "../../Project/ProjectCard";
import { Portal } from "../Portal/Portal";

export interface ModalCard {
    onClose?: () => void;
    direction: number;
    [key: string]: any;
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



const ModalsMap = (modalId: ModalId) => {
    switch (modalId) {
        case ModalId.Project:
            return ProjectCard;
        case ModalId.Login1:
            return LoginCard_1;
        default:
            return () => <></>
    }

}


export default function Modal() {

    const { isOpen, modalId, direction, initialModalProps } = useAppSelector(state => ({ isOpen: state.modals.isOpen, modalId: state.modals.openModalId, direction: state.modals.direction, initialModalProps: state.modals.initialModalProps }))

    const ref = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const onClose = () => dispatch(closeModal());

    const handleOutsideClick = (e: any) => {
        console.log(e.target);

        if (e.target === ref.current) onClose();
    }

    useEffect(() => {
        if (isOpen) document.body.style.overflowY = "hidden";
        else document.body.style.overflowY = "initial";
    }, [isOpen]);


    const Child = ModalsMap(modalId);


    return (
        <Portal>
            <AnimatePresence exitBeforeEnter>
                {isOpen && <motion.div

                    onClick={handleOutsideClick}
                    className={`fixed overscroll-y-none overflow-x-hidden inset-0 bg-gray-300 bg-opacity-70 overflow-y-auto h-full w-full`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { ease: "easeInOut" },
                    }}
                >
                    <div
                        ref={ref}
                        className={`w-screen min-h-screen flex justify-center items-center py-64`}
                    >
                        <AnimatePresence exitBeforeEnter>
                            <Child onClose={onClose} direction={direction} {...initialModalProps} />
                        </AnimatePresence>
                    </div>
                </motion.div>}
            </AnimatePresence>
        </Portal>
    )
}
