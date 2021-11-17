import { motion } from 'framer-motion'
import { Direction, ModalId, replaceModal } from '../../redux/features/modals.slice';
import { useAppDispatch } from '../../utils/hooks';
import { ModalCard, modalCardVariants } from '../Shared/ModalsContainer/ModalsContainer'

export default function LoginCard_1({ onClose, direction, ...props }: ModalCard) {

    const dispatch = useAppDispatch();

    const handleNext = () => {
        dispatch(replaceModal({
            modalId: ModalId.Login2,
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
            className="modal-card max-w-[400px] h-[400px]"

        >
            <div className="p-24 h-full flex flex-col items-center justify-center">
                <h3 className="text-h2  font-bold">Login Modal Step 1</h3>
                <p className="text-body2 mt-40">WIP</p>
                <button className="btn btn-primary mx-auto py-12 px-24 rounded-lg mt-48 mb-16" onClick={handleNext}>Continue</button>

            </div>
        </motion.div>
    )
}
