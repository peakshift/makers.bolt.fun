import { motion } from 'framer-motion'
import { useMediaQuery, useWindowSize } from 'src/utils/hooks';
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import Button from 'src/Components/Button/Button'
import { IoClose } from 'react-icons/io5';
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar';
import { createRoute } from 'src/utils/routing';
import Confetti from 'react-confetti'
import { Portal } from 'src/Components/Portal/Portal';
import { Project, Tournament } from 'src/graphql';


interface Props extends ModalCard {
    project: Pick<Project, 'id' | 'title' | 'thumbnail_image'>
    tournament: Pick<Tournament, 'id' | 'title'>
}

export default function ProjectAddedModal({ onClose, direction, project, tournament, ...props }: Props) {

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
            <h2 className='text-h5 font-bold text-center'>Project added!</h2>
            <div className="flex flex-col gap-16 justify-center items-center my-24">
                <Avatar src={project.thumbnail_image} width={80} />
                <p className="text-body3 font-medium">{project.title}</p>
            </div>
            <p className="text-body4 font-light text-gray-600 mt-24 text-center">
                Nice work, you successfully listed <span className="text-gray-800 font-bold">{project.title}</span> for <span className="text-gray-800 font-bold">{tournament.title}</span>
            </p>

            <div className="flex flex-col gap-16 my-32">
                <div className='!flex items-center gap-16'>
                    <div className={`rounded-8 w-48 h-48 text-center py-12 shrink-0 bg-gray-100`}>
                        🤝️️️
                    </div>
                    <div>
                        <p className="font-medium self-center">
                            Find makers to team up with
                        </p>
                        <p className="text-body5 text-gray-500">
                            Recruit or find makers to team up with.
                        </p>
                    </div>
                </div>
                <div className='!flex items-center gap-16'>
                    <div className={`rounded-8 w-48 h-48 text-center py-12 shrink-0 bg-gray-100`}>
                        ✍️
                    </div>
                    <div>
                        <p className="font-medium self-center">
                            #BuildInPublic
                        </p>
                        <p className="text-body5 text-gray-500">
                            Give updates on your project with stories.
                        </p>
                    </div>
                </div>
            </div>
            <Button
                color='primary'
                fullWidth
                newTab
                href={createRoute({ type: "tournament", id: tournament.id, tab: "makers" })}
            >🤝 Recruit your team</Button>
        </motion.div>
    )
}
