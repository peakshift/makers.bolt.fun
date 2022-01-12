import { motion } from 'framer-motion'
import { useAppDispatch } from 'src/utils/hooks';
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { useCallback, useEffect } from 'react';
import { closeModal, openSceduledModal } from 'src/redux/features/modals.slice';

export default function Login_SuccessCard({ onClose, direction, ...props }: ModalCard) {

    const dispatch = useAppDispatch();

    const handleNext = useCallback(() => {
        dispatch(closeModal())
        dispatch(openSceduledModal())
    }, [dispatch])


    useEffect(() => {
        //dispatch(connectWallet());
        const timeout = setTimeout(handleNext, 3000)
        return () => clearTimeout(timeout)
    }, [handleNext, dispatch])

    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[343px] p-24 rounded-xl relative"

        >
            <h2 className='text-h5 font-bold'>Login success</h2>

            <div className="flex justify-center my-32">
                <img
                    src="assets/icons/success-icon.svg"
                    className='w-80 h-80'
                    alt="success" />
            </div>
            <p className="text-body4 text-center">
                Welcome <span className="font-bold">bc104NhPs...2oGnSKTs</span>
            </p>


        </motion.div>
    )
}
