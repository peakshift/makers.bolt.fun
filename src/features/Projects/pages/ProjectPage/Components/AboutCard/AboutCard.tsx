import linkifyHtml from 'linkifyjs/lib/linkify-html'
import { useState } from 'react'
import { MdLocalFireDepartment } from 'react-icons/md'
import Button from 'src/Components/Button/Button'
import Card from 'src/Components/Card/Card'
import Lightbox from 'src/Components/Lightbox/Lightbox'
import { ProjectDetailsQuery, ProjectLaunchStatusEnum, ProjectPermissionEnum, } from 'src/graphql'
import { openModal } from 'src/redux/features/modals.slice'
import { setVoteAmount } from 'src/redux/features/vote.slice'
import { numberFormatter } from 'src/utils/helperFunctions'
import { useAppDispatch } from 'src/utils/hooks'
import { createRoute } from 'src/utils/routing'
import LinksCard from '../LinksCard/LinksCard'

interface Props {
    project: Pick<ProjectDetailsQuery['getProject'],
        | "id"
        | "cover_image"
        | "thumbnail_image"
        | "title"
        | "category"
        | "permissions"
        | "launch_status"
        | "description"
        | "screenshots"
        | "tagline"
        | "website"
        | "votes_count"
        | 'discord'
        | 'website'
        | 'github'
        | 'twitter'
        | 'slack'
        | 'telegram'
    >
}


export default function AboutCard({ project }: Props) {

    const dispatch = useAppDispatch();

    const [screenshotsOpen, setScreenshotsOpen] = useState(-1);

    const onVote = (votes?: number) => {
        dispatch(setVoteAmount(votes ?? 10));
        dispatch(openModal({
            Modal: 'VoteCard', props: {
                projectId: project.id,
                title: project.title,
                initVotes: votes
            }
        }))
    }


    const canEdit = project.permissions.includes(ProjectPermissionEnum.UpdateInfo);

    return (
        <Card defaultPadding={false} onlyMd>
            {/* Cover Image */}
            <div className="hidden md:block relative rounded-t-12 md:rounded-t-16 h-[120px] lg:h-[160px]">
                <img className="w-full h-full object-cover rounded-12 md:rounded-0 md:rounded-t-16" src={project.cover_image} alt="" />
                <div className="absolute top-16 md:top-24 left-24 flex gap-8 bg-gray-800 bg-opacity-60 text-white rounded-48 py-4 px-12 text-body6 font-medium">
                    {project.launch_status === ProjectLaunchStatusEnum.Launched && `🚀 Launched`}
                    {project.launch_status === ProjectLaunchStatusEnum.Wip && `🔧 WIP`}
                </div>
                <div className="absolute left-24 bottom-0 translate-y-1/2 w-[108px] aspect-square">
                    <img className="w-full h-full border-2 border-white rounded-24" src={project.thumbnail_image} alt="" />
                </div>
            </div>
            <div className="md:p-24 md:pt-0 flex flex-col gap-24">
                {/* Title & Basic Info */}
                <div className="flex flex-col gap-24 relative">
                    <div className="flex flex-wrap justify-end items-center gap-16 min-h-[40px] mt-12">
                        {/* {canEdit && <Button size="sm" color="gray" href={createRoute({ type: "edit-project", id: project.id })}>Edit Project</Button>} */}
                        <Button size="sm" variant='outline' color='gray' className='hidden md:block hover:!text-red-500 hover:!border-red-200 hover:!bg-red-50' onClick={() => onVote()}>
                            <MdLocalFireDepartment />{<span className="align-middle w-[4ch]"> {numberFormatter(project.votes_count)}</span>}
                        </Button>
                    </div>
                    <div className='flex flex-col gap-8 items-start justify-between -mt-12'>
                        <a href={project.website} target='_blank' rel="noreferrer"><h3 className="text-body1 font-bold">{project.title}</h3></a>
                        <p className="text-body4 text-gray-600">{project.tagline}</p>
                        <div>
                            <span className="font-medium text-body5 text-gray-900">{project.category.icon} {project.category.title}</span>
                        </div>
                    </div>
                    <Button size="sm" fullWidth variant='outline' color='gray' className='md:hidden hover:!text-red-500 hover:!border-red-200 hover:!bg-red-50' onClick={() => onVote()}>
                        <MdLocalFireDepartment />{<span className="align-middle w-[4ch]"> {numberFormatter(project.votes_count)}</span>}
                    </Button>
                </div>
                <div className="md:hidden">
                    <LinksCard links={project} />
                </div>

                {/* About */}
                <div>
                    <div className="text-body4 text-gray-600 leading-normal whitespace-pre-line" dangerouslySetInnerHTML={{
                        __html: linkifyHtml(project.description, {
                            className: ' text-blue-500 underline',
                            defaultProtocol: 'https',
                            target: "_blank",
                            rel: 'noreferrer'
                        })
                    }}></div>

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
            </div>
        </Card>
    )
}
