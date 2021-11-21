import { motion } from 'framer-motion'
import { Direction, ModalId, replaceModal } from '../../redux/features/modals.slice';
import { useAppDispatch } from '../../utils/hooks';
import { ModalCard, modalCardVariants } from '../Shared/ModalsContainer/ModalsContainer'
import { IoLockClosed, } from 'react-icons/io5'

export default function Login_NativeWalletCard({ onClose, direction, ...props }: ModalCard) {

    const dispatch = useAppDispatch();

    const handleNext = () => {
        dispatch(replaceModal({
            modalId: ModalId.Login_Success,
            direction: Direction.NEXT
        }))
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
            <div className="flex justify-center">
                <img
                    src="assets/icons/lightning-big.svg"
                    className='w-80 h-80'
                    alt="lightning" />
            </div>
            <p className="text-body4 text-center mt-16">
                <IoLockClosed className='align-middle' /> bolt.fun/maker
            </p>

            <div className="mt-32 text-center">
                <h3 className="text-h4 font-bold">Login to this site?</h3>
                <p className='text-body4 mt-8'>By clicking login, you allow ALBY wallet to anonymously login into bolt.fun/makers</p>
            </div>

            <div className="grid gap-16 grid-cols-2 mt-32">
                <button className='btn border-2' onClick={onClose}>Cancel</button>
                <button className='btn btn-primary' onClick={handleNext}>Login</button>

            </div>
        </motion.div>
    )
}
