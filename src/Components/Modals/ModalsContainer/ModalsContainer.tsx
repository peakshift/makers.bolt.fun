import { useEffect } from "react";
import { ALL_MODALS, closeModal, Direction, removeScheduledModal } from "src/redux/features/modals.slice";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import Modal from "../Modal/Modal";

export interface ModalCard {
    onClose?: () => void;
    direction?: number;
    isPageModal?: boolean;
}


export const modalCardVariants = {
    initial: (direction: any) => {
        if (direction === Direction.START) return { opacity: 0, y: 300 };
        else if (direction === Direction.NEXT) return { opacity: 0, x: 300 };
        else if (direction === Direction.PREVIOUS) return { opacity: 0, x: -300 };
        return {

        }
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




export default function ModalsContainer() {

    const { isOpen, openModals, direction } = useAppSelector(state => ({
        isOpen: state.modals.isOpen,
        openModals: state.modals.openModals,
        direction: state.modals.direction
    }))

    const dispatch = useAppDispatch();
    const onClose = () => {
        dispatch(removeScheduledModal());
        dispatch(closeModal());
    }

    useEffect(() => {
        // let prevOverflow = document.body.style.overflow;

        // if (isOpen) {
        //     const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        //     prevOverflow = document.body.style.overflow;
        //     console.log(prevOverflow);
        //     document.body.style.overflow = 'hidden';
        //     if (scrollbarWidth) {
        //         document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
        //     }
        // }
        // else {
        //     document.body.style.overflow = prevOverflow;
        //     document.documentElement.style.paddingRight = "";
        // }
    }, [isOpen]);

    return (
        <div className="z-[2020]">
            {openModals.map((modal, idx) => {
                const Child = ALL_MODALS[modal.Modal];
                return (
                    <Modal
                        key={modal.id}
                        isOpen={modal.isOpen}
                        onClose={onClose}
                        direction={direction}
                        id={modal.id}
                        isPageModal={modal.props?.isPageModal}
                    >
                        <Child onClose={onClose} direction={direction} isPageModal={modal.props?.isPageModal} {...modal.props} />
                    </Modal>)
            })}
        </div>
    )
}
