import { motion } from 'framer-motion'
import { ModalCard, modalCardVariants } from '../Shared/ModalsContainer/ModalsContainer'
import { IoClose } from 'react-icons/io5';

export default function Claim_SubmittedCard({ onClose, direction, ...props }: ModalCard) {


    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[343px] p-24 rounded-xl relative"

        >
            <IoClose
                className='absolute text-body2 top-24 right-24 hover:cursor-pointer'
                onClick={onClose} />

            <h2 className='text-h5 font-bold'>Submitted For Review</h2>
            <div className="flex justify-center my-32">
                <img
                    src="assets/icons/flag-icon.svg"
                    className='w-80 h-80'
                    alt="success" />
            </div>
            <p className="text-body4 text-center">
                Great work! your claim to <span className="font-bold">Application Name</span> has been submitted for review.
                <br />
                Check back soon to see if it was successful.
            </p>



        </motion.div>
    )
}
