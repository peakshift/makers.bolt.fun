import { motion } from 'framer-motion'
import { Direction, replaceModal } from 'src/redux/features/modals.slice';
import { useAppDispatch, useAppSelector } from 'src/utils/hooks';
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { useCallback, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

export default function Claim_GenerateSignatureCard({ onClose, direction, ...props }: ModalCard) {

    const dispatch = useAppDispatch();
    const { projectName, image } = useAppSelector(state => ({ projectName: state.project.project?.title, image: state.project.project?.thumbnail_image, }))



    const handleNext = useCallback(() => {
        dispatch(replaceModal({
            Modal: 'Claim_CopySignatureCard',
            direction: Direction.NEXT
        }))
    }, [dispatch])

    useEffect(() => {

        // const timeout = setTimeout(handleNext, 3000)
        // return () => clearTimeout(timeout)
    }, [handleNext])

    //const onCopy = () => {
    //    // Copy to Clipboard
    //    setTimeout(handleNext, 2000)
    //}

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
                    src={image}
                    className='w-80 h-80 object-cover rounded-2xl'
                    alt="" />
            </div>
            <p className="text-body4 text-center px-16">
                To claim ownership of <span className="font-bold">{projectName}</span> and its tips, you need to sign a message and paste this on the project website so we can verify you are the real ownership
            </p>
            <div className="mt-32">
                <button className='btn btn-primary w-full' onClick={handleNext}>Generate Signature</button>
            </div>

        </motion.div>
    )
}
