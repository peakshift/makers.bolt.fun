import { motion } from 'framer-motion'
import { useAppSelector } from 'src/utils/hooks';
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import Button from 'src/Components/Button/Button'
import { IoClose } from 'react-icons/io5';
import NutImg from './nut.png'
import AlbyImg from './alby.png'

export default function NoWeblnModal({ onClose, direction, ...props }: ModalCard) {

    const isMobile = useAppSelector(s => s.ui.isMobileScreen);


    let content: JSX.Element;

    if (isMobile)
        content = <>
            <div className="flex justify-center my-24">
                <img
                    src={NutImg}
                    className='w-full max-w-[164px] aspect-square object-cover'
                    alt="Nut images" />
            </div>
            <h3 className="text-h4 font-bolder">
                Oops! Looks like you’re browsing on mobile.
            </h3>
            <p className="text-body4 text-gray-600 mt-8">
                In order to use  BOLT🔩FUN’s voting button, you need to use a lightning browser wallet like Alby. You can download the extension on your desktop and try again.
            </p>
        </>
    else
        content = <>
            <div className="flex justify-center my-24">
                <img
                    src={AlbyImg}
                    className='w-full max-w-[164px] aspect-square object-cover'
                    alt="Nut images" />
            </div>
            <h3 className="text-h4 font-bolder">
                Oops! Looks like you don’t have Alby installed
            </h3>
            <p className="text-body4 text-gray-600 mt-8">
                In order to use  BOLT🔩FUN’s voting button, you’ll need to use a lightning browser wallet like Alby. Download it to continue.
            </p>
            <Button
                color='black'
                fullWidth
                newTab
                className='mt-32'
                href='https://getalby.com'
            >Download Alby</Button>
        </>


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
            <h2 className='text-h5 font-bold'>No WebLN Detected</h2>
            {content}
        </motion.div>
    )
}
