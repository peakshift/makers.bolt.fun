import { motion } from 'framer-motion'
import { Direction, replaceModal } from 'src/redux/features/modals.slice';
import { useAppDispatch } from 'src/utils/hooks';
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { AiFillThunderbolt } from 'react-icons/ai';
import { Rings } from 'react-loader-spinner';
import { useCallback, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

export default function Login_ScanningWalletCard({ onClose, direction, ...props }: ModalCard) {

    const dispatch = useAppDispatch();

    const handleNext = useCallback(() => {
        dispatch(replaceModal({
            Modal: 'Login_NativeWalletCard',
            direction: Direction.NEXT
        }))
    }, [dispatch])

    useEffect(() => {

        const timeout = setTimeout(handleNext, 3000)
        return () => clearTimeout(timeout)
    }, [handleNext])

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
            <div className="mt-24 py-24 ">
                <div className="flex justify-center">
                    <Rings
                        color="black"
                        height={60}
                        width={60}
                    />
                </div>
                <p className="text-body5 text-center mt-24">
                    Scanning browser for native wallet...
                </p>
            </div>
        </motion.div>
    )
}
