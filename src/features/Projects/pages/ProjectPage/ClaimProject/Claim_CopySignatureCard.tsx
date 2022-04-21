import { motion } from 'framer-motion'
import { Direction, replaceModal } from 'src/redux/features/modals.slice';
import { useAppDispatch, useAppSelector } from 'src/utils/hooks';
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import CopyToClipboard from 'src/Components/CopyToClipboard/CopyToClipboard'
import { useCallback } from 'react';
import { IoClose } from 'react-icons/io5';

export default function Claim_CopySignatureCard({ onClose, direction, ...props }: ModalCard) {

    const dispatch = useAppDispatch();
    const { projectName, image } = useAppSelector(state => ({ projectName: state.project.project?.title, image: state.project.project?.thumbnail_image, }))

    const generatedHash = '0x000330RaaSt302440zxc327jjiaswf19987183345pRReuBNksbaaueee'

    const handleNext = useCallback(() => {
        dispatch(replaceModal({
            Modal: 'Claim_SubmittedCard',
            direction: Direction.NEXT
        }))
    }, [dispatch])

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
                Good job! Now paste this on the webpage
                <a className="font-bold" href="www.projectname.com/"
                    target='_blank' rel='noreferrer'
                > www.projectname.com/</a>
            </p>
            <div className="input-wrapper mt-32">
                <input
                    className="input-text overflow-ellipsis"
                    type='text'
                    value={generatedHash}
                />

                <CopyToClipboard text={generatedHash} />
            </div>
            <div className="mt-32">
                <button className='btn btn-primary w-full' onClick={handleNext}>Submit for review</button>
            </div>

        </motion.div>
    )
}
