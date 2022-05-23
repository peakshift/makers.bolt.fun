import { motion } from 'framer-motion'
import { Direction, replaceModal } from 'src/redux/features/modals.slice';
import { useAppDispatch } from 'src/utils/hooks';
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { AiFillThunderbolt } from 'react-icons/ai';
import CopyToClipboard from 'src/Components/CopyToClipboard/CopyToClipboard';
import { useCallback, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

export default function Login_ExternalWalletCard({ onClose, direction, ...props }: ModalCard) {

    const dispatch = useAppDispatch();


    const handleNext = useCallback(() => {
        dispatch(replaceModal({
            Modal: 'Login_SuccessCard',
            direction: Direction.NEXT
        }))
    }, [dispatch])

    useEffect(() => {
    }, [handleNext])

    const onCopy = () => {
        // Copy to Clipboard
        setTimeout(handleNext, 1000)
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
            <h2 className='text-h5 font-bold'>Log in with Lightning  <AiFillThunderbolt className='inline-block text-thunder transform scale-125' /></h2>
            <div className='flex justify-center mt-32'>
                <img
                    onClick={onCopy}
                    className='w-full max-w-[160px]'
                    src="assets/images/barcode.jpg"
                    alt="barcode" />
            </div>
            <p className="text-body4 text-center mt-16">
                Scan this code or copy the address below to login using Inurl-auth
            </p>
            <div className="input-wrapper mt-16 relative">
                <input
                    className="input-text overflow-ellipsis"
                    type={'text'}
                    value={"Inurldp-3234234-ahhsdfm-dssdf-uooiRS-TTRASssa-334Qaas-UUI"}
                />
                <CopyToClipboard text='Inurldp-3234234-ahhsdfm-dssdf-uooiRS-TTRASssa-334Qaas-UUI' direction='top' />
            </div>

        </motion.div>
    )
}
