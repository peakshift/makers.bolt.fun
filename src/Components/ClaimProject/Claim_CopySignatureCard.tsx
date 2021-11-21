import { motion } from 'framer-motion'
import { Direction, ModalId, replaceModal } from '../../redux/features/modals.slice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { ModalCard, modalCardVariants } from '../Shared/ModalsContainer/ModalsContainer'
import { useCallback, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoIosCopy } from 'react-icons/io'
import CopyToClipboard from 'react-copy-to-clipboard';

export default function Claim_CopySignatureCard({ onClose, direction, ...props }: ModalCard) {

    const dispatch = useAppDispatch();
    const { projectName, image } = useAppSelector(state => ({ projectName: state.project.project?.title, image: state.project.project?.thumbnail_image, }))

    const generatedHash = '0x000330RaaSt302440zxc327jjiaswf19987183345pRReuBNksbaaueee'

    const handleNext = useCallback(() => {
        dispatch(replaceModal({
            modalId: ModalId.Claim_Submitted,
            direction: Direction.NEXT
        }))
    }, [dispatch])

    const onCopy = () => {
        // Copy to Clipboard 
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
                    src={image}
                    className='w-80 h-80 object-cover rounded-2xl'
                    alt="" />
            </div>
            <p className="text-body4 text-center px-16">
                Good job! Now paste this on the webpage
                <a className="font-bold" href="www.projectname.com/"
                    target='_blank' rel='noreferrer'
                >www.projectname.com/</a>
            </p>
            <div className="input-wrapper mt-32">
                <input
                    className="input-field overflow-ellipsis"
                    value={generatedHash}
                />
                <CopyToClipboard text={generatedHash} >
                    <IoIosCopy onClick={onCopy} className='input-icon hover:cursor-pointer' />
                </CopyToClipboard>

            </div>
            <div className="mt-32">
                <button className='btn btn-primary w-full' onClick={handleNext}>Submit for review</button>
            </div>

        </motion.div>
    )
}
