import { useEffect, useState } from 'react'
import { MdLocalFireDepartment } from 'react-icons/md';
import { ModalCard } from 'src/Components/Modals/ModalsContainer/ModalsContainer';
import { useAppDispatch, useAppSelector, useMediaQuery } from 'src/utils/hooks';
import { openModal, scheduleModal } from 'src/redux/features/modals.slice';
import { setProject } from 'src/redux/features/project.slice';
import Button from 'src/Components/Button/Button';
import ProjectCardSkeleton from './ProjectDetailsCard.Skeleton'
// import VoteButton from 'src/features/Projects/pages/ProjectPage/VoteButton/VoteButton';
import { NotificationsService, Wallet_Service } from 'src/services'
import { ProjectLaunchStatusEnum, ProjectPermissionEnum, useProjectDetailsQuery } from 'src/graphql';
import Lightbox from 'src/Components/Lightbox/Lightbox'
import linkifyHtml from 'linkify-html';
import ErrorMessage from 'src/Components/Errors/ErrorMessage/ErrorMessage';
import { setVoteAmount } from 'src/redux/features/vote.slice';
import { numberFormatter } from 'src/utils/helperFunctions';
import { MEDIA_QUERIES } from 'src/utils/theme';
import { FaDiscord, } from 'react-icons/fa';
import { FiEdit2, FiGithub, FiGlobe, FiTwitter } from 'react-icons/fi';
import CopyToClipboard from 'react-copy-to-clipboard';
import Badge from 'src/Components/Badge/Badge';
import { Link } from 'react-router-dom';
import { createRoute } from 'src/utils/routing';
import { IoMdClose } from 'react-icons/io';


interface Props extends ModalCard {
    projectId: string;
}

export default function ProjectDetailsCard({ direction, projectId, ...props }: Props) {

    const dispatch = useAppDispatch();
    const [screenshotsOpen, setScreenshotsOpen] = useState(-1);


    const { isWalletConnected } = useAppSelector(state => ({
        isWalletConnected: state.wallet.isConnected,
    }));
    const isMdScreen = useMediaQuery(MEDIA_QUERIES.isMedium)

    const { data, loading, error } = useProjectDetailsQuery({
        variables: {
            projectsId: projectId!,
        },
        onCompleted: data => {
            dispatch(setProject((data.projects?.[0] as any) ?? null))
        },
        onError: () => {
            dispatch(setProject(null));
        },
        skip: !Boolean(projectId)
    });



    const closeModal = () => {
        props.onClose?.();
    }




    if (error)
        return <div
            className={`modal-card max-w-[768px] ${props.isPageModal && !isMdScreen && 'rounded-0 w-full min-h-screen'}`}
        >
            <div className="p-64">
                <ErrorMessage type='fetching' message='Something Wrong happened while fetching project details, please try refreshing the page' />
            </div>
        </div>

    if (loading)
        return <ProjectCardSkeleton onClose={closeModal} direction={direction} isPageModal={props.isPageModal} />;


    const project = data?.projects?.[0];

    if (!project) return <p>404</p>

    const links = [
        {
            value: project.discord,
            text: project.discord,
            icon: FaDiscord,
            colors: "bg-violet-100 text-violet-900",
        },
        {
            value: project.website,
            text: project.website?.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, ""),
            icon: FiGlobe,
            colors: "bg-gray-100 text-gray-900",
            url: project.website
        },
        {
            value: project.twitter,
            text: project.twitter,
            icon: FiTwitter,
            colors: "bg-blue-100 text-blue-500",
            url: project.twitter
        },
        {
            value: project.repository,
            text: project.repository,
            icon: FiGithub,
            colors: "bg-pink-100 text-pink-600",
            url: project.repository
        },
    ];

    const onVote = (votes?: number) => {
        dispatch(setVoteAmount(votes ?? 10));
        // dispatch(openModal({
        //     Modal: 'VoteCard', props: {
        //         projectId: project.id,
        //         title: project.title,
        //         initVotes: votes
        //     }
        // }))
    }

    return (
        <div
            className={`modal-card max-w-[676px] ${(props.isPageModal && !isMdScreen) && '!rounded-0 w-full min-h-screen'}`}
        >
            {/* Cover Image */}
            <div className="relative h-[120px] lg:h-[80px]">
                <img className="w-full h-full object-cover" src={project.cover_image} alt="" />
                <div className="absolute w-full px-16 md:px-24 top-16 md:top-24 flex justify-between items-center">
                    <div className="flex gap-8 bg-gray-800 bg-opacity-60 text-white rounded-48 py-4 px-12 text-body6 font-medium">
                        {project.launch_status === ProjectLaunchStatusEnum.Launched && `🚀 Launched`}
                        {project.launch_status === ProjectLaunchStatusEnum.Wip && `🔧 WIP`}
                    </div>
                    <div className="flex gap-8">
                        {project.permissions.includes(ProjectPermissionEnum.UpdateInfo) &&
                            <Link className="w-32 h-32  bg-gray-800 bg-opacity-60 text-white rounded-full hover:bg-opacity-40 text-center flex flex-col justify-center items-center" onClick={() => props.onClose?.()} to={createRoute({ type: "edit-project", id: project.id })}><FiEdit2 /></Link>}
                        <button className="w-32 h-32  bg-gray-800 bg-opacity-60 text-white rounded-full hover:bg-opacity-40 text-center flex flex-col justify-center items-center" onClick={closeModal}><IoMdClose className=' inline-block' /></button>
                    </div>
                </div>
            </div>
            <div className="p-24 flex flex-col gap-24">

                {/* Title & Basic Info */}
                <div className="flex flex-col mt-[-80px] md:flex-row md:mt-0 gap-24 md:items-center relative">
                    <div className="flex-shrink-0 w-[108px] h-[108px]">
                        <img className="w-full h-full border-2 border-white rounded-24" src={project.thumbnail_image} alt="" />
                    </div>
                    <div className='flex flex-col gap-8 items-start justify-between'>
                        <a href={project.website} target='_blank' rel="noreferrer"><h3 className="text-body1 font-bold">{project.title}</h3></a>
                        <p className="text-body4 text-gray-600">{project.tagline}</p>
                        <div>
                            <span className="font-medium text-body4 text-gray-600">{project.category} {project.category.title}</span>
                        </div>
                    </div>
                    <div className="flex-shrink-0 w-full md:w-auto  md:flex ml-auto gap-16 self-stretch">
                        {/* <Button color='primary' size='md' className=" my-16" href={project.website} newTab >Visit <BsJoystick /></Button> */}
                        {/* <VoteButton  onVote={onVote} /> */}
                        {/* <VoteButton fullWidth votes={project.votes_count} direction='vertical' onVote={onVote} /> */}
                        {/* {isWalletConnected ?
                            :
                            <Button onClick={onConnectWallet} size='md' className="border border-gray-200 bg-gray-100 hover:bg-gray-50 active:bg-gray-100 my-16"><AiFillThunderbolt className='inline-block text-thunder transform scale-125' /> Connect Wallet to Vote</Button>
                        } */}
                        <Button fullWidth variant='outline' color='gray' className='!px-8' onClick={() => onVote()}>
                            <div className="flex justify-center items-center gap-8 md:flex-col ">
                                <MdLocalFireDepartment />{<span className="align-middle w-[4ch]"> {numberFormatter(project.votes_count)}</span>}
                            </div>
                        </Button>
                    </div>
                </div>


                {/* About */}
                <div>
                    <p className="text-body6 uppercase font-medium text-gray-400 mb-8">About</p>
                    <div className=" text-body4 text-gray-600 leading-normal whitespace-pre-line" dangerouslySetInnerHTML={{
                        __html: linkifyHtml(project.description, {
                            className: ' text-blue-500 underline',
                            defaultProtocol: 'https',
                            target: "_blank",
                            rel: 'noreferrer'
                        })
                    }}></div>

                    {/* Links */}
                    <div className="mt-16 flex flex-wrap gap-16">
                        {links.filter(link => !!link.value).map((link, idx) =>
                        (link.url ? <a
                            key={idx}
                            href={link.url!}
                            className={`w-40 aspect-square rounded-full flex justify-center items-center ${link.colors}`}
                            target='_blank'
                            rel="noreferrer">
                            <link.icon className="scale-125" />
                        </a>
                            :
                            <CopyToClipboard
                                text={link.value!}
                                onCopy={() => NotificationsService.info(" Copied to clipboard", { icon: "📋" })}
                            >
                                <button
                                    key={idx}
                                    onClick={() => { }}
                                    className={`w-40 aspect-square rounded-full flex justify-center items-center ${link.colors}`}
                                >
                                    <link.icon className="scale-125" />
                                </button>
                            </CopyToClipboard>
                        ))}
                    </div>
                </div>
                {project.screenshots.length > 0 && <>
                    <div className="">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
                            {project.screenshots.slice(0, 4).map((screenshot, idx) => <div
                                key={idx}
                                className="w-full relative pt-[56%] cursor-pointer bg-gray-100 border rounded-10 overflow-hidden"
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

                {project.capabilities.length > 0 &&
                    <div>
                        <p className="text-body6 uppercase font-medium text-gray-400 mb-8">CAPABILITIES</p>
                        <div className="flex flex-wrap gap-8">
                            {project.capabilities.map(cap => <Badge key={cap.id} size='sm'>{cap.icon} {cap.title}</Badge>)}
                        </div>
                    </div>}

                {project.members.length > 0 &&
                    <div className='relative'>
                        <p className="text-body6 uppercase font-medium text-gray-400 mb-8">MAKERS</p>
                        <div className="flex flex-wrap gap-8">
                            {sortMembersByRole(project.members).map(m => <Link key={m.user.id} to={createRoute({ type: "profile", id: m.user.id, username: m.user.name })}>
                                <Avatar
                                    width={40}
                                    src={m.user.avatar}
                                    renderTooltip={() => <div className='bg-white px-12 py-8 border border-gray-200 rounded-12 flex flex-wrap gap-12 shadow-lg relative z-10'>
                                        <Avatar width={48} src={m.user.avatar} />
                                        <div className='overflow-hidden'>
                                            <p className={`text-black font-medium overflow-hidden text-ellipsis`}>{m.user.name}</p>
                                            <p className={`text-body6 text-gray-600`}>{m.user.jobTitle}</p>
                                        </div>
                                    </div>}
                                />
                            </Link>)}
                        </div>
                    </div>}

                <Button color='white' fullWidth href={createRoute({ type: "project", tag: project.hashtag })} onClick={props.onClose}>View project details</Button>

                <div className="text-center">
                    <h3 className="text-body4 font-regular">Want to suggest any changes to this project?</h3>
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
