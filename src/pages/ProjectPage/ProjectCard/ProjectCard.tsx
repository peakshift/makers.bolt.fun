import { motion } from 'framer-motion'
import { BsJoystick } from 'react-icons/bs'
import { MdClose, MdLocalFireDepartment } from 'react-icons/md';
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer';
import { useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from 'src/utils/hooks';
import { openModal, scheduleModal } from 'src/redux/features/modals.slice';
import { setProject } from 'src/redux/features/project.slice';
import { connectWallet } from 'src/redux/features/wallet.slice';
import Button from 'src/Components/Button/Button';
import { requestProvider } from 'webln';
import { PROJECT_BY_ID_QUERY, PROJECT_BY_ID_RES, PROJECT_BY_ID_VARS } from './query'
import { AiFillThunderbolt } from 'react-icons/ai';
import ProjectCardSkeleton from './ProjectCard.Skeleton'
import TipButton from 'src/Components/TipButton/TipButton';


interface Props extends ModalCard {
    projectId: string
}

export default function ProjectCard({ onClose, direction, projectId, ...props }: Props) {

    const dispatch = useAppDispatch();

    const { loading } = useQuery<PROJECT_BY_ID_RES, PROJECT_BY_ID_VARS>(
        PROJECT_BY_ID_QUERY,
        {
            variables: { projectId: parseInt(projectId) },
            onCompleted: data => {
                dispatch(setProject(data.getProject))
            },
        }
    );

    const { isWalletConnected, webln, project, isMobileScreen } = useAppSelector(state => ({
        isWalletConnected: state.wallet.isConnected,
        webln: state.wallet.provider,
        project: state.project.project,
        isMobileScreen: state.theme.isMobileScreen
    }));



    if (loading || !project)
        return <ProjectCardSkeleton onClose={onClose} direction={direction} isPageModal={props.isPageModal} />;

    const onConnectWallet = async () => {
        try {

            const webln = await requestProvider();
            if (webln) {
                dispatch(connectWallet(webln));
                alert("wallet connected!");
            }
            // Now you can call all of the webln.* methods
        }
        catch (err: any) {
            // Tell the user what went wrong
            alert(err.message);
        }
    }

    const onTip = (tip?: number) => {


        if (!isWalletConnected) {
            dispatch(scheduleModal({ Modal: 'TipCard', props: { tipValue: tip } }))
            dispatch(openModal({
                Modal: 'Login_ScanningWalletCard'
            }))
        } else
            dispatch(openModal({ Modal: 'TipCard', props: { tipValue: tip } }))
    }


    const onClaim = () => {
        if (!isWalletConnected) {
            dispatch(scheduleModal({
                Modal: 'Claim_GenerateSignatureCard',
            }))
            dispatch(openModal({
                Modal: 'Login_ScanningWalletCard'
            }))
        } else
            dispatch(openModal({
                Modal: 'Claim_GenerateSignatureCard',
            }))
    }

    return (
        <div
            className={`modal-card max-w-[768px] ${props.isPageModal && isMobileScreen && 'rounded-0 w-full min-h-screen'}`}
        >
            <div className="relative h-[80px] lg:h-[152px]">
                <img className="w-full h-full object-cover" src={project.cover_image} alt="" />
                <button className="w-[48px] h-[48px] bg-white absolute top-1/2 left-32 -translate-y-1/2 rounded-full hover:bg-gray-200 text-center" onClick={onClose}><MdClose className=' inline-block text-body2 lg:text-body1' /></button>
            </div>
            <div className="p-24">
                <div className="flex gap-24 items-center h-[93px]">
                    <div className="flex-shrink-0 w-[93px] h-[93px] rounded-md overflow-hidden">
                        <img className="w-full h-full object-cover" src={project?.thumbnail_image} alt="" />
                    </div>
                    <div className='flex flex-col items-start justify-between self-stretch'>
                        <h3 className="text-h3 font-regular">{project?.title}</h3>
                        <a className="text-blue-400 font-regular text-body4" target='_blank' rel="noreferrer" href={project?.website}>{project?.website?.replace(/(^\w+:|^)\/\//, '')}</a>
                        <div>
                            <span className="chip-small font-light text-body5 py-4 px-12 mr-8"> {project?.category.title}</span>

                            <span className="chip-small bg-warning-50 font-light text-body5 py-4 px-12"><MdLocalFireDepartment className='inline-block text-fire transform text-body4 align-middle' /> {project?.votes_count}</span>

                        </div>
                    </div>
                    <div className="flex-shrink-0  hidden md:flex ml-auto gap-16">
                        <Button color='primary' size='md' className=" my-16">Play <BsJoystick /></Button>
                        {isWalletConnected ?
                            <TipButton onTip={onTip} />
                            :
                            <Button onClick={onConnectWallet} size='md' className="border border-gray-200 bg-gray-100 hover:bg-gray-50 active:bg-gray-100 my-16">Connect Wallet to Vote</Button>
                        }
                    </div>
                </div>
                <p className="mt-40 text-body4 leading-normal">{project?.description}</p>
                <div className="md:hidden">
                    <Button color='primary' size='md' fullWidth className="w-full mt-24 mb-16">Play <BsJoystick /></Button>
                    {isWalletConnected ?
                        <TipButton fullWidth onTip={onTip} />
                        :
                        <Button size='md' fullWidth className="bg-gray-200 hover:bg-gray-100 mb-24" onClick={onConnectWallet}><AiFillThunderbolt className='inline-block text-thunder transform scale-125' /> Connect Wallet to Vote</Button>
                    }
                </div>
                <div className="mt-40">
                    <h3 className="text-h5 font-bold mb-16">Screenshots</h3>
                    <div className="grid grid-cols-2 gap-12 justify-items-center md:gap-24">
                        <div className="w-full relative pt-[56%]">
                            <div className="absolute top-0 left-0 w-full h-full object-cover bg-gray-300 rounded-xl"></div>
                        </div>
                        <div className="w-full relative pt-[56%]">
                            <div className="absolute top-0 left-0 w-full h-full object-cover bg-gray-300 rounded-xl"></div>
                        </div>
                        <div className="w-full relative pt-[56%]">
                            <div className="absolute top-0 left-0 w-full h-full object-cover bg-gray-300 rounded-xl"></div>
                        </div>
                        <div className="w-full relative pt-[56%]">
                            <div className="absolute top-0 left-0 w-full h-full object-cover bg-gray-300 rounded-xl"></div>
                        </div>
                    </div>
                </div>
                <hr className="my-40" />
                <div className="text-center">
                    <h3 className="text-body4 font-regular">Are you the creator of this project?</h3>
                    <Button color='gray' size='md' className="my-16" onClick={onClaim}>Claim 🖐</Button>
                </div>
            </div>
        </div>
    )
}
