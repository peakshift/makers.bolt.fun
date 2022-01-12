import { AnimatePresence, motion } from "framer-motion";
import { ComponentProps, useEffect } from "react";
import { ALL_MODALS, closeModal, Direction, removeScheduledModal } from "src/redux/features/modals.slice";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import Claim_CopySignatureCard from "src/pages/ProjectPage/ClaimProject/Claim_CopySignatureCard";
import Claim_GenerateSignatureCard from "src/pages/ProjectPage/ClaimProject/Claim_GenerateSignatureCard";
import Login_ExternalWalletCard from "src/Components/Modals/Login/Login_ExternalWalletCard";
import Login_NativeWalletCard from "src/Components/Modals/Login/Login_NativeWalletCard";
import Login_SuccessCard from "src/Components/Modals/Login/Login_SuccessCard";
import Login_ScanningWalletCard from "src/Components/Modals/Login/Login_ScanningWalletCard";
import ProjectCard from "src/pages/ProjectPage/ProjectCard/ProjectCard";
import TipCard from "src/pages/ProjectPage/Tip/TipCard";
import Modal from "../Modal/Modal";
import { Portal } from "../../Portal/Portal";
import Claim_SubmittedCard from "src/pages/ProjectPage/ClaimProject/Claim_SubmittedCard";
import Claim_FundWithdrawCard from "src/pages/ProjectPage/ClaimProject/Claim_FundWithdrawCard";

export interface ModalCard {
    onClose?: () => void;
    direction: number;
    isPageModal?: boolean;
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
        if (isOpen) document.body.style.overflowY = "hidden";
        else document.body.style.overflowY = "initial";
    }, [isOpen]);

    return (
        <Portal>

            <AnimatePresence exitBeforeEnter>
                {isOpen &&
                    <motion.div
                        className="w-screen fixed inset-0 overflow-x-hidden z-[2020]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            transition: { ease: "easeInOut" },
                        }}
                    >
                        <AnimatePresence>
                            {openModals.map((modal, idx) => {
                                const Child = ALL_MODALS[modal.Modal];
                                return (
                                    <Modal key={idx} onClose={onClose} direction={direction} isPageModal={modal.props?.isPageModal}>
                                        <Child onClose={onClose} direction={direction} isPageModal={modal.props?.isPageModal} {...modal.props} />
                                    </Modal>)
                            })}
                        </AnimatePresence>
                    </motion.div>}
            </AnimatePresence>
        </Portal>
    )
}
