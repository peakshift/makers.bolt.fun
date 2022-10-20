import { useEffect, useState } from 'react'
import { MdLocalFireDepartment } from 'react-icons/md';
import { ModalCard } from 'src/Components/Modals/ModalsContainer/ModalsContainer';
import { useAppDispatch, useAppSelector, useMediaQuery } from 'src/utils/hooks';
import { openModal, scheduleModal } from 'src/redux/features/modals.slice';
import { setProject } from 'src/redux/features/project.slice';
import Button from 'src/Components/Button/Button';
import ProjectCardSkeleton from './ProjectDetailsCard.Skeleton'
import { NotificationsService, Wallet_Service } from 'src/services'
import { useProjectDetailsQuery } from 'src/graphql';
import Lightbox from 'src/Components/Lightbox/Lightbox'
import linkifyHtml from 'linkify-html';
import ErrorMessage from 'src/Components/Errors/ErrorMessage/ErrorMessage';
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
            value: project?.discord,
            text: project?.discord,
            icon: FaDiscord,
            colors: "bg-violet-100 text-violet-900",
        },
        {
            value: project?.website,
            text: project?.website?.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, ""),
            icon: FiGlobe,
            colors: "bg-gray-100 text-gray-900",
            url: project?.website
        },
        {
            value: project?.twitter,
            text: project?.twitter,
            icon: FiTwitter,
            colors: "bg-blue-100 text-blue-500",
            url: project?.twitter
        },
        {
            value: project?.repository,
            text: project?.repository,
            icon: FiGithub,
            colors: "bg-pink-100 text-pink-600",
            url: project?.repository
        },
    ];

    return (
        <div
            className={`modal-card max-w-[676px] ${(props.isPageModal && !isMdScreen) && '!rounded-0 w-full min-h-screen'}`}
        >
            {/* Cover Image */}
            <div className="relative h-[120px] lg:h-[80px]">
                {/* <img className="w-full h-full object-cover" src={project?.cover_image} alt="" /> */}
                <div className="absolute w-full px-16 md:px-24 top-16 md:top-24 flex justify-between items-center">
                    <div className="flex gap-8 bg-gray-800 bg-opacity-60 text-white rounded-48 py-4 px-12 text-body6 font-medium">
                        {project?.yearFounded && `Year founded ${project.yearFounded}`}
                    </div>
                    <div className="flex gap-8">
                        <button className="w-32 h-32  bg-gray-800 bg-opacity-60 text-white rounded-full hover:bg-opacity-40 text-center flex flex-col justify-center items-center" onClick={closeModal}><IoMdClose className=' inline-block' /></button>
                    </div>
                </div>
            </div>
            <div className="p-24 flex flex-col gap-24">

                {/* Title & Basic Info */}
                <div className="flex flex-col mt-[-80px] md:flex-row md:mt-0 gap-24 md:items-center relative">
                    <div className="flex-shrink-0 w-[108px] h-[108px]">
                        <img className="w-full h-full border-2 border-white rounded-24 object-cover" src={project?.logo?.[0]['thumbnails']['large'].url} alt="" />
                    </div>
                    <div className='flex flex-col gap-8 items-start justify-between'>
                        <a href={project?.website!} target='_blank' rel="noreferrer"><h3 className="text-body1 font-bold">{project?.title}</h3></a>
                        <div>
                            <span className="font-medium text-body4 text-gray-600">{project?.category}</span>
                        </div>
                    </div>
                </div>


                {/* About */}
                <div>
                    <p className="text-body6 uppercase font-medium text-gray-400 mb-8">About</p>
                    <div className=" text-body4 text-gray-600 leading-normal whitespace-pre-line">
                        {project?.description}
                    </div>

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

                {/*project?.capabilities.length > 0 &&
                    <div>
                        <p className="text-body6 uppercase font-medium text-gray-400 mb-8">CAPABILITIES</p>
                        <div className="flex flex-wrap gap-8">
                            {project?.capabilities.map(cap => <Badge key={cap.id} size='sm'>{cap.icon} {cap.title}</Badge>)}
                        </div>
                    </div>*/}

                <div className="text-center">
                    <h3 className="text-body4 font-regular">Want to suggest any changes to this project?</h3>
                    <Button
                        color='gray'
                        size='md'
                        className="my-16"
                        href={`https://airtable.com/shr67F20KG9Gdok6d?prefill_app_name=${project?.title}&prefill_app_link=${project?.website}`}
                        newTab
                    // onClick={onClaim}
                    >Request Edit 📝</Button>
                </div>
            </div>
        </div>
    )
}
