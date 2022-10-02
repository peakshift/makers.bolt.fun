import { motion } from 'framer-motion'
import { useAppSelector, useMediaQuery, useWindowSize } from 'src/utils/hooks';
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import Button from 'src/Components/Button/Button'
import { IoClose } from 'react-icons/io5';
import NutImg from './nut.png'
import AlbyImg from './alby.png'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar';
import { createRoute } from 'src/utils/routing';
import Confetti from 'react-confetti'
import { Portal } from 'src/Components/Portal/Portal';


interface Props extends ModalCard {
    project: {
        id: number,
        img: string,
        name: string,
        tagline: string,
    }
}

export default function ProjectListedModal({ onClose, direction, project, ...props }: Props) {

    const size = useWindowSize();

    const isSmallScreen = useMediaQuery('screen and (max-width: 680px)')

    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[442px] p-24 rounded-xl relative"
        >
            <Portal id='confetti'>
                <Confetti recycle={false} width={size.width} height={size.height} numberOfPieces={isSmallScreen ? 200 : 400} />
            </Portal>
            <IoClose className='absolute text-body2 top-24 right-24 hover:cursor-pointer' onClick={onClose} />
            <h2 className='text-h5 font-bold text-center'>Product listed!</h2>
            <div className="flex flex-col gap-16 justify-center items-center my-24">
                <Avatar src={project.img} width={80} />
                <p className="text-body3 font-medium">{project.name}</p>
            </div>
            <p className="text-body4 font-light text-gray-600 mt-24 text-center">
                Nice work, you successfully listed your product! Here are a few ideas to get your started.
            </p>

            <div className="flex flex-col gap-16 my-32">
                <div className='!flex items-center gap-16'>
                    <div className={`rounded-8 w-48 h-48 text-center py-12 shrink-0 bg-gray-100`}>
                        ✍️
                    </div>
                    <div>
                        <p className="font-medium self-center">
                            Stories
                        </p>
                        <p className="text-body5 text-gray-500">
                            Tell the maker community about your product.
                        </p>
                    </div>
                </div>
                <div className='!flex items-center gap-16'>
                    <div className={`rounded-8 w-48 h-48 text-center py-12 shrink-0 bg-gray-100`}>
                        ⚔️
                    </div>
                    <div>
                        <p className="font-medium self-center">
                            Start hacking
                        </p>
                        <p className="text-body5 text-gray-500">
                            Kickstart your hacking journey with a tournament.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-16" >
                <Button
                    color='primary'
                    fullWidth
                    newTab
                    href={createRoute({ type: "write-story" })}
                >✍️ Write a story</Button>
                <Button
                    color='white'
                    fullWidth
                    newTab
                    href='/tournaments'
                >⚔️ Explore tournaments</Button>
            </div>
        </motion.div>
    )
}
