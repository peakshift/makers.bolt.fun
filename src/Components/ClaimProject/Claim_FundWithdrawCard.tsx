import { motion } from 'framer-motion'
import { Direction, ModalId, replaceModal } from '../../redux/features/modals.slice';
import { useAppDispatch } from '../../utils/hooks';
import { ModalCard, modalCardVariants } from '../Shared/ModalsContainer/ModalsContainer'
import { useCallback, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoIosCopy } from 'react-icons/io'

export default function Claim_FundWithdrawCard({ onClose, direction, ...props }: ModalCard) {

    const dispatch = useAppDispatch();




    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[270px] py-16 px-24 rounded-xl relative"
        >
            <div className="flex justify-center my-16">
                <img
                    src="assets/icons/lightning-small.svg"
                    className='w-64 h-64'
                    alt="" />
            </div>
            <p className="text-h4 text-center font-bold">
                2,220 sats
            </p>
            <p className="text-body4 text-center text-gray-400">
                2.78$
            </p>
            <div className="mt-32 flex flex-col gap-16">
                <button className='btn btn-primary w-full' >Fund</button>
                <button className='btn border-2 w-full' >Withdraw</button>
            </div>

        </motion.div>
    )
}
