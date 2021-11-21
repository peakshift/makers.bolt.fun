import { motion } from 'framer-motion'
import { Direction, ModalId, replaceModal } from '../../redux/features/modals.slice';
import { useAppDispatch } from '../../utils/hooks';
import { ModalCard, modalCardVariants } from '../Shared/ModalsContainer/ModalsContainer'
import { useCallback, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoIosCopy } from 'react-icons/io'

export default function Claim_CopySignatureCard({ onClose, direction, ...props }: ModalCard) {

    const dispatch = useAppDispatch();


    const handleNext = useCallback(() => {
        dispatch(replaceModal({
            modalId: ModalId.Login_NativeWallet,
            direction: Direction.NEXT
        }))
    }, [dispatch])

    useEffect(() => {

        // const timeout = setTimeout(handleNext, 3000)
        // return () => clearTimeout(timeout)
    }, [handleNext])

    const onCopy = () => {
        // Copy to Clipboard
        setTimeout(handleNext, 2000)
    }

    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[343px] p-24 rounded-xl relative"
        >
            <IoClose className='absolute text-body2 top-24 right-24 hover:cursor-pointer' onClick={onClose} />
            <h2 className='text-h5 font-bold'>Claim this project</h2>
            <div className="flex justify-center my-32">
                <img
                    src="assets/icons/lightning-big.svg"
                    className='w-80 h-80'
                    alt="" />
            </div>
            <p className="text-body4 text-center px-16">
                To claim ownership of <span className="font-bold">Application Name</span> and its tips, copy the signature hash below and paste it on the following URL:
            </p>
            <p className="font-bold text-primary-500 text-center mt-16">
                <a href="projectname.com/well-known/bolt.fun.json"
                    target='_blank' rel='noreferrer'
                >projectname.com/well-known/bolt.fun.json</a>
            </p>
            <div className="input-wrapper mt-16">
                <input
                    className="input-field overflow-ellipsis"
                    value={"Inurldp-3234234-ahhsdfm-dssdf-uooiRS-TTRASssa-334Qaas-UUI"}
                />
                <IoIosCopy onClick={onCopy} className='input-icon hover:cursor-pointer' />
            </div>

        </motion.div>
    )
}
