import Button from 'src/Components/Button/Button'
import Card from 'src/Components/Card/Card'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar'
import { useFormContext } from "react-hook-form"
import { IListProjectForm } from "../FormContainer/FormContainer";
import { useMemo } from 'react'
import { tabs } from '../../ListProjectPage'
import { NotificationsService } from 'src/services'
import { useAppDispatch } from 'src/utils/hooks';
import { openModal } from 'src/redux/features/modals.slice';
import { useCreateProjectMutation, useUpdateProjectMutation, UpdateProjectInput } from 'src/graphql'

interface Props {
    currentTab: keyof typeof tabs
    onNext: () => void
    onBackToFirstPage: () => void
}

export default function SaveChangesCard(props: Props) {

    const { handleSubmit, formState: { isDirty, }, reset, getValues, watch } = useFormContext<IListProjectForm>();
    const dispatch = useAppDispatch();

    const isUpdating = useMemo(() => !!getValues('id'), [getValues]);

    const [update, updatingStatus] = useUpdateProjectMutation();
    const [create, creatingStatus] = useCreateProjectMutation()

    const isLoading = updatingStatus.loading || creatingStatus.loading


    const [img, name, tagline] = watch(['thumbnail_image', 'title', 'tagline',])

    const clickCancel = () => {
        if (window.confirm('You might lose some unsaved changes. Are you sure you want to continue?'))
            reset();
    }

    const clickSubmit = handleSubmit<IListProjectForm>(async data => {
        try {

            const input: UpdateProjectInput = {
                ...data,
                members: data.members.map(m => ({ id: m.id, role: m.role })),
                screenshots: data.screenshots.map(s => ({ id: s.id, name: s.name, url: s.url }))
            }

            await (isUpdating ?
                update({ variables: { input } })
                : create({ variables: { input } })
            )
        } catch (error) {
            NotificationsService.error("A network error happened...");
            return;
        }
        if (isUpdating)
            NotificationsService.success("Saved changes successfully")
        else {
            dispatch(openModal({
                Modal: "ProjectListedModal", props: {
                    project: {
                        id: data.id!,
                        name: data.title,
                        img: data.thumbnail_image.url || "https://picsum.photos/id/870/150/150.jpg",
                        tagline: data.tagline,
                    }
                }
            }))
        }
    }, (errors) => {
        NotificationsService.error("Please fill all the required fields");
        props.onBackToFirstPage()
    })



    let ctaBtn = useMemo(() => {
        if (isUpdating)
            return <Button
                color="primary"
                fullWidth
                onClick={clickSubmit}
                disabled={!isDirty || isLoading}
            >
                Save Changes
            </Button>
        else if (props.currentTab === 'project-details')
            return <Button
                color="primary"
                fullWidth
                onClick={props.onNext}
            >
                Next step: {tabs.team.text}
            </Button>
        else if (props.currentTab === 'team')
            return <Button
                color="primary"
                fullWidth
                onClick={props.onNext}
            >
                Next step: {tabs.extras.text}
            </Button>
        else
            return <Button
                color="primary"
                fullWidth
                onClick={clickSubmit}
                disabled={!isDirty || isLoading}
            >
                List your product
            </Button>
    }, [clickSubmit, isDirty, isLoading, isUpdating, props.currentTab, props.onNext])


    return (
        <Card className='flex flex-col gap-24'>
            <div className='flex gap-8 items-center'>
                {img ?
                    <Avatar width={48} src={img.url} /> :
                    <div className="bg-gray-50 border border-gray-200 rounded-full w-48 h-48 shrink-0"></div>
                }
                <div className='overflow-hidden'>
                    <p className={`text-body4 text-black font-medium overflow-hidden text-ellipsis`}>{name || "Product preview"}</p>
                    {<p className={`text-body6 text-gray-600 text-ellipsis overflow-hidden whitespace-nowrap`}>{tagline || "Provide some more details."}</p>}
                </div>
            </div>
            <div className="border-b border-gray-200"></div>
            {/* <p className="hidden md:block text-body5">{trimText(profileQuery.data.profile.bio, 120)}</p> */}
            <div className="flex flex-col gap-16">
                {ctaBtn}
                <Button
                    color="gray"
                    onClick={clickCancel}
                    disabled={!isDirty || isLoading}
                >
                    Cancel
                </Button>
            </div>
        </Card>
    )
}
