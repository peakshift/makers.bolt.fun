import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import DatePicker from 'src/Components/Inputs/DatePicker/DatePicker'
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'

export default function Login_SuccessCard({ onClose, direction, ...props }: ModalCard) {


    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[774px] p-32 rounded-xl relative !bg-white"

        >
            <IoClose className='absolute text-body2 top-32 right-32 hover:cursor-pointer' onClick={onClose} />
            <h2 className='text-h5 font-bolder'>Submit a plan</h2>
            <p className="text-body4 mt-8">
                Please provide an action plan & ask any initial questions you have for this ticket
            </p>
            <div className="input-wrapper mt-24 relative">
                <textarea
                    rows={6}
                    className="input-field !p-20"
                    placeholder='What steps will you take to complete this task? '
                />
            </div>
            <div className="grid sm:grid-cols-2 gap-24 mt-16">
                <div>
                    <label className='text-body5 text-gray-600 font-medium' htmlFor="">First Draf</label>
                    <DatePicker className='mt-8' />
                </div>
                <div>
                    <label className='text-body5 text-gray-600 font-medium' htmlFor="">Completion Date</label>
                    <DatePicker className='mt-8' />
                </div>
            </div>

            <div>
                <div className="mt-16">
                    <input className="appearance-none h-16 w-16 border border-gray-300 rounded-sm bg-gray-200 checked:bg-primary-600 checked:border-primary-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckChecked" />
                    <label className=" inline-block text-gray-800" htmlFor="flexCheckChecked">
                        Checked checkbox
                    </label>
                </div>
            </div>


        </motion.div>
    )
}
