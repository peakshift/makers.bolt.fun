import { motion } from 'framer-motion'
import { BiArrowBack, BiWindowClose } from 'react-icons/bi'
import { BsJoystick } from 'react-icons/bs'
import { MdClose, MdLocalFireDepartment } from 'react-icons/md';
import { ModalCard, modalCardVariants } from '../Shared/ModalsContainer/ModalsContainer';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { ModalId, openModal, scheduleModal } from '../../redux/features/modals.slice';
import Button from 'src/Components/Shared/Button/Button';
import { useGetProjectQuery } from 'src/generated/graphql';


export default function ProjectCard({ onClose, direction, ...props }: ModalCard) {

    const { data, loading } = useGetProjectQuery({
        variables: {
            getProjectId: props.projectId
        }
    })

    const { isWalletConnected } = useAppSelector(state => ({ isWalletConnected: state.wallet.isConnected }))
    const dispatch = useAppDispatch();

    const project = data?.getProject;


    if (loading || !project) return <></>;


    const onTip = () => {

        if (!isWalletConnected) {
            dispatch(scheduleModal({ modalId: ModalId.Tip, propsToPass: { projectId: props.projectId } }))
            dispatch(openModal({
                modalId: ModalId.Login_ScanWallet
            }))
        } else
            dispatch(openModal({ modalId: ModalId.Tip, propsToPass: { projectId: props.projectId } }))
    }


    const onClaim = () => {
        if (!isWalletConnected) {
            dispatch(scheduleModal({
                modalId: ModalId.Claim_GenerateSignature,
                propsToPass: { projectId: props.projectId },
            }))
            dispatch(openModal({
                modalId: ModalId.Login_ScanWallet
            }))
        } else
            dispatch(openModal({
                modalId: ModalId.Claim_GenerateSignature,
                propsToPass: { projectId: props.projectId },
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
            <div className="relative h-[80px] lg:h-[152px]">
                <img className="w-full h-full object-cover" src={project.cover_image} alt="" />
                <button className="w-[48px] h-[48px] bg-white absolute top-1/2 left-32 -translate-y-1/2 rounded-full hover:bg-gray-200 text-center" onClick={onClose}><MdClose className=' inline-block text-body2 lg:text-body1' /></button>
            </div>
            <div className="p-24">
                <div className="flex gap-24 items-center h-[93px]">
                    <div className="flex-shrink-0 w-[93px] h-[93px] rounded-md overflow-hidden">
                        <img className="w-full h-full object-cover" src={project.thumbnail_image} alt="" />
                    </div>
                    <div className='flex flex-col items-start justify-between self-stretch'>
                        <h3 className="text-h3 font-regular">{project.title}</h3>
                        <a className="text-blue-400 font-regular text-body4" target='_blank' rel="noreferrer" href={project.website}>{project.website?.replace(/(^\w+:|^)\/\//, '')}</a>
                        <div>
                            <span className="chip-small font-light text-body5 py-4 px-12 mr-8"> {project.category.title}</span>

                            <span className="chip-small bg-warning-50 font-light text-body5 py-4 px-12"><MdLocalFireDepartment className='inline-block text-fire transform text-body4 align-middle' /> {project.votes_count}</span>

                        </div>
                    </div>
                    <div className="flex-shrink-0  hidden md:flex ml-auto gap-16">
                        <Button color='primary' size='md' className=" my-16">Play <BsJoystick /></Button>
                        <Button onClick={onTip} size='md' className="border border-warning-100 bg-warning-50 hover:bg-warning-50 active:bg-warning-100 my-16">Tip <MdLocalFireDepartment className='text-fire' /></Button>
                    </div>
                </div>
                <p className="mt-40 text-body4 leading-normal">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, iure dolorem quaerat ipsum dolores mollitia libero? Sit dolor saepe amet incidunt placeat. Iusto, expedita rerum
                </p>
                <div className="flex gap-16 mt-24 flex-wrap">
                    <span className="chip-small bg-red-100 text-red-800 font-regular"> payments </span>
                    <span className="chip-small bg-primary-100 text-primary-800 font-regular"> lightining </span>
                </div>
                <div className="md:hidden">
                    <Button color='primary' size='md' fullWidth className="w-full mt-24 mb-16">Play <BsJoystick /></Button>
                    <Button size='md' fullWidth className="border border-warning-100 bg-warning-50 hover:bg-warning-50 active:bg-warning-10050 mb-24" onClick={onTip}>Vote <MdLocalFireDepartment className='text-fire' /></Button>
                </div>
                <div className="mt-40">
                    <h3 className="text-h5 font-bold mb-16">Screenshots</h3>
                    <div className="grid grid-cols-2 gap-12 justify-items-center md:gap-24">
                        <div className="w-full relative pt-[56%]">
                            <div className="absolute inset-0 object-cover bg-gray-300 rounded-xl"></div>
                        </div>
                        <div className="w-full relative pt-[56%]">
                            <div className="absolute inset-0 object-cover bg-gray-300 rounded-xl"></div>
                        </div>
                        <div className="w-full relative pt-[56%]">
                            <div className="absolute inset-0 object-cover bg-gray-300 rounded-xl"></div>
                        </div>
                        <div className="w-full relative pt-[56%]">
                            <div className="absolute inset-0 object-cover bg-gray-300 rounded-xl"></div>
                        </div>
                    </div>
                </div>
                <hr className="my-40" />
                <div className="text-center">
                    <h3 className="text-body4 font-regular">Are you the creator of this project?</h3>
                    <Button color='gray' size='md' className="my-16" onClick={onClaim}>Claim 🖐</Button>
                </div>
            </div>
        </motion.div>
    )
}
