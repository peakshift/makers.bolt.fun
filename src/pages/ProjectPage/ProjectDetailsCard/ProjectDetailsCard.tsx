import { useEffect, useState } from 'react'
import { BsJoystick } from 'react-icons/bs'
import { MdClose, MdLocalFireDepartment } from 'react-icons/md';
import { ModalCard } from 'src/Components/Modals/ModalsContainer/ModalsContainer';
import { useAppDispatch, useAppSelector } from 'src/utils/hooks';
import { openModal, scheduleModal } from 'src/redux/features/modals.slice';
import { setProject } from 'src/redux/features/project.slice';
import Button from 'src/Components/Button/Button';
import { AiFillThunderbolt } from 'react-icons/ai';
import ProjectCardSkeleton from './ProjectDetailsCard.Skeleton'
import VoteButton from 'src/pages/ProjectPage/VoteButton/VoteButton';
import { Wallet_Service } from 'src/services'
import { useProjectDetailsQuery } from 'src/graphql';
import Lightbox from 'src/Components/Lightbox/Lightbox'
import linkifyHtml from 'linkify-html';
import ErrorMessage from 'src/Components/ErrorMessage/ErrorMessage';


interface Props extends ModalCard {
    projectId: number
}

export default function ProjectDetailsCard({ onClose, direction, projectId, ...props }: Props) {

    const dispatch = useAppDispatch();
    const [screenshotsOpen, setScreenshotsOpen] = useState(-1);




    const { loading, error } = useProjectDetailsQuery({
        variables: { projectId: projectId },
        onCompleted: data => {
            dispatch(setProject(data.getProject))
        },
    });

    useEffect(() => {
        return () => {
            dispatch(setProject(null))
        }
    }, [dispatch])




    const { isWalletConnected, project, isMobileScreen } = useAppSelector(state => ({
        isWalletConnected: state.wallet.isConnected,
        project: state.project.project,
        isMobileScreen: state.ui.isMobileScreen
    }));


    if (error)
        return <div
            className={`modal-card max-w-[768px] ${props.isPageModal && isMobileScreen && 'rounded-0 w-full min-h-screen'}`}
        >
            <div className="p-64">
                <ErrorMessage type='fetching' message='Something Wrong happened while fetching project details, please try refreshing the page' />
            </div>
        </div>

    if (loading || !project)
        return <ProjectCardSkeleton onClose={onClose} direction={direction} isPageModal={props.isPageModal} />;

    const onConnectWallet = async () => {
        Wallet_Service.connectWallet()
    }

    const onVote = (votes?: number) => {

        if (!isWalletConnected) {
            dispatch(scheduleModal({ Modal: 'VoteCard', props: { initVotes: votes, projectId: project.id } }))
            dispatch(openModal({
                Modal: 'Login_ScanningWalletCard'
            }))
        } else
            dispatch(openModal({ Modal: 'VoteCard', props: { initVotes: votes, projectId: project.id } }))
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
                <div className="flex gap-24 items-start">
                    <div className="flex-shrink-0 w-[93px] h-[93px] rounded-md overflow-hidden border">
                        <img className="w-full h-full" src={project?.thumbnail_image} alt="" />
                    </div>
                    <div className='flex flex-col items-start justify-between self-stretch'>
                        <h3 className="text-h3 font-regular">{project?.title}</h3>
                        <a className="text-blue-400 font-regular text-body4 truncate max-w-[20ch]" target='_blank' rel="noreferrer" href={project?.website}>{project?.website?.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, "")}</a>
                        <div>
                            <span className="chip-small font-light text-body5 py-4 px-12 mr-8"> {project?.category.title}</span>

                            <span className="chip-small bg-warning-50 font-light text-body5 py-4 px-12"><MdLocalFireDepartment className='inline-block text-fire transform text-body4 align-middle' /> {project?.votes_count}</span>

                        </div>
                    </div>
                    <div className="flex-shrink-0  hidden md:flex ml-auto gap-16">
                        <Button color='primary' size='md' className=" my-16" href={project.website} newTab >Visit <BsJoystick /></Button>
                        {isWalletConnected ?
                            <VoteButton onVote={onVote} />
                            :
                            <Button onClick={onConnectWallet} size='md' className="border border-gray-200 bg-gray-100 hover:bg-gray-50 active:bg-gray-100 my-16"><AiFillThunderbolt className='inline-block text-thunder transform scale-125' /> Connect Wallet to Vote</Button>
                        }
                    </div>
                </div>
                <p className="mt-40 text-body4 leading-normal" dangerouslySetInnerHTML={{
                    __html: linkifyHtml(project?.description, {
                        className: ' text-blue-500 underline',
                        defaultProtocol: 'https',
                        target: "_blank",
                        rel: 'noreferrer'
                    })
                }}></p>
                <div className="md:hidden">
                    <Button color='primary' size='md' fullWidth href={project.website} newTab className="w-full mt-24 mb-16">Visit <BsJoystick /></Button>
                    {isWalletConnected ?
                        <VoteButton fullWidth onVote={onVote} />
                        :
                        <Button size='md' fullWidth className="bg-gray-200 hover:bg-gray-100 mb-24" onClick={onConnectWallet}><AiFillThunderbolt className='inline-block text-thunder transform scale-125' /> Connect Wallet to Vote</Button>
                    }
                </div>
                {project.screenshots.length > 0 && <>
                    <div className="mt-40">
                        <h3 className="text-h5 font-bold mb-16">Screenshots</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
                            {project.screenshots.slice(0, 4).map((screenshot, idx) => <div
                                key={idx}
                                className="w-full relative pt-[56%] cursor-pointer bg-gray-300 shadow-sm rounded-10 overflow-hidden"
                                onClick={() => setScreenshotsOpen(idx)}
                            >
                                <img src={screenshot} className="absolute top-0 left-0 w-full h-full object-cover" alt='' />
                            </div>)}
                        </div>
                    </div>
                    <Lightbox
                        images={project.screenshots}
                        isOpen={screenshotsOpen !== -1}
                        initOpenIndex={screenshotsOpen}
                        onClose={() => setScreenshotsOpen(-1)}
                    />
                </>}
                <hr className="my-40" />
                <div className="text-center">
                    <h3 className="text-body4 font-regular">Are you the creator of this project?</h3>
                    <Button
                        color='gray'
                        size='md'
                        className="my-16"
                        href={`https://airtable.com/shr67F20KG9Gdok6d?prefill_app_name=${project.title}&prefill_app_link=${project.website}`}
                        newTab
                    // onClick={onClaim}
                    >Claim 🖐</Button>
                </div>
            </div>
        </div>
    )
}
