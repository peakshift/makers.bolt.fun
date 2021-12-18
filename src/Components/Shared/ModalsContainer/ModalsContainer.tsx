import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { closeModal, Direction, ModalId, removeScheduledModal } from "../../../redux/features/modals.slice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import Claim_CopySignatureCard from "../../ClaimProject/Claim_CopySignatureCard";
import Claim_GenerateSignatureCard from "../../ClaimProject/Claim_GenerateSignatureCard";
import Login_ExternalWalletCard from "../../Login/Login_ExternalWalletCard";
import Login_NativeWalletCard from "../../Login/Login_NativeWalletCard";
import Login_SuccessCard from "../../Login/Login_SuccessCard";
import Login_ScanningWalletCard from "../../Login/Login_ScanningWalletCard";
import ProjectCard from "../../Project/ProjectCard";
import TipCard from "../../Tip/TipCard";
import Modal from "../Modal/Modal";
import { Portal } from "../Portal/Portal";
import Claim_SubmittedCard from "../../ClaimProject/Claim_SubmittedCard";
import Claim_FundWithdrawCard from "../../ClaimProject/Claim_FundWithdrawCard";

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
        case ModalId.Login_ScanWallet:
            return Login_ScanningWalletCard;
        case ModalId.Login_NativeWallet:
            return Login_NativeWalletCard;
        case ModalId.Login_Success:
            return Login_SuccessCard;
        case ModalId.Login_ExternalWallet:
            return Login_ExternalWalletCard;
        case ModalId.Tip:
            return TipCard;
        case ModalId.Claim_GenerateSignature:
            return Claim_GenerateSignatureCard;
        case ModalId.Claim_CopySignature:
            return Claim_CopySignatureCard;
        case ModalId.Claim_Submitted:
            return Claim_SubmittedCard;
        case ModalId.Claim_FundWithdraw:
            return Claim_FundWithdrawCard;



        default:
            return () => <></>
    }


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
                        className="w-screen fixed inset-0 overflow-x-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            transition: { ease: "easeInOut" },
                        }}
                    >
                        <AnimatePresence>
                            {openModals.map(modal => {
                                const Child = ModalsMap(modal.modalId);
                                return (
                                    <Modal key={modal.modalId} onClose={onClose} direction={direction}>
                                        <Child onClose={onClose} direction={direction} {...modal.propsToPass} />
                                    </Modal>)
                            })}
                        </AnimatePresence>
                    </motion.div>}
            </AnimatePresence>
        </Portal>
    )
}
