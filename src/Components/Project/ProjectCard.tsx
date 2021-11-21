import { motion } from 'framer-motion'
import { BiArrowBack } from 'react-icons/bi'
import { BsJoystick } from 'react-icons/bs'
import { MdLocalFireDepartment } from 'react-icons/md';
import { ModalCard, modalCardVariants } from '../Shared/ModalsContainer/ModalsContainer';
import { useQuery } from 'react-query';
import { getProjectById } from '../../api';
import { useAppDispatch } from '../../utils/hooks';
import { ModalId, openModal } from '../../redux/features/modals.slice';


export default function ProjectCard({ onClose, direction, ...props }: ModalCard) {


    const { data: project, isLoading } = useQuery(['get-project', props.projectId], () => getProjectById(props.projectId))

    const dispatch = useAppDispatch();

    if (isLoading || !project) return <></>;


    const onVote = () => {

        dispatch(openModal({ modalId: ModalId.Vote, initialModalProps: { projectId: props.projectId } }))
    }

    const onClaim = () => {
        dispatch(openModal({
            modalId: ModalId.Login_ScanWallet,
            initialModalProps: { projectId: props.projectId },
        }))
    }

    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[710px]"

        >
            <div className="relative h-[152px]">
                <img className="w-full h-full object-cover" src={project.cover_image} alt="" />
                <button className="w-[48px] h-[48px] bg-white absolute top-1/2 left-32 -translate-y-1/2 rounded-full hover:bg-gray-200 text-center" onClick={onClose}><BiArrowBack className=' inline-block text-body1' /></button>
            </div>
            <div className="p-24">
                <div className="flex gap-24 items-center">
                    <div className="flex-shrink-0 w-[93px] h-[93px] rounded-md overflow-hidden">
                        <img className="w-full h-full object-cover" src={project.thumbnail_image} alt="" />
                    </div>
                    <div>
                        <h3 className="text-h3 font-regular">{project.title}</h3>
                        <a className="text-blue-400 font-regular text-body4" target='_blank' rel="noreferrer" href={project.website}>{project.website}</a>
                    </div>
                    <div className="flex-shrink-0  hidden md:flex ml-auto gap-16">
                        <button className="btn btn-primary py-12 px-24 rounded-lg my-16">Play <BsJoystick /></button>
                        <button onClick={onVote} className="btn bg-yellow-100 hover:bg-yellow-50 py-12 px-24 rounded-lg my-16">Vote <MdLocalFireDepartment className='text-fire' /></button>
                    </div>
                </div>
                <p className="mt-40 text-body4 leading-normal">{project.description}</p>
                <div className="flex gap-24 mt-24 flex-wrap">
                    <span className="chip-small bg-red-100 text-red-800 font-regular"> payments </span>
                    <span className="chip-small bg-primary-100 text-primary-800 font-regular"> lightining </span>
                </div>
                <div className="md:hidden">
                    <button className="btn btn-primary w-full py-12 px-24 rounded-lg mt-24 mb-16">Play <BsJoystick /></button>
                    <button onClick={onVote} className="btn w-full bg-yellow-100 hover:bg-yellow-50 py-12 px-24 rounded-lg mb-24">Vote <MdLocalFireDepartment className='text-fire' /></button>
                </div>
                <div className="mt-40">
                    <h3 className="text-h5 font-bold">Screenshots</h3>
                    <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-x-24 gap-y-20">
                        <div className="w-full max-w-[310px] self-center h-[130px] bg-gray-300 rounded-xl"></div>
                        <div className="w-full max-w-[310px] self-center h-[130px] bg-gray-300 rounded-xl"></div>
                        <div className="w-full max-w-[310px] self-center h-[130px] bg-gray-300 rounded-xl"></div>
                        <div className="w-full max-w-[310px] self-center h-[130px] bg-gray-300 rounded-xl"></div>
                    </div>
                </div>
                <hr className="my-40" />
                <div className="text-center">
                    <h3 className="text-body4 font-regular">Are you the creator of this project?</h3>
                    <button className="btn btn-gray py-12 px-24 rounded-lg my-16" onClick={onClaim}>Claim 🖐</button>
                </div>
            </div>
        </motion.div>
    )
}
