import { useNavigate } from 'react-router-dom'
import Button from 'src/Components/Button/Button'
import Card from 'src/Components/Card/Card'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar'
import { useFormContext } from "react-hook-form"
import { IListProjectForm } from "../FormContainer/FormContainer";
import { useMemo, useState } from 'react'
import { tabs } from '../../ListProjectPage'
import { NotificationsService } from 'src/services'

interface Props {
    currentTab: keyof typeof tabs
}

export default function SaveChangesCard(props: Props) {

    const { handleSubmit, formState: { errors, isDirty, }, reset, getValues, watch } = useFormContext<IListProjectForm>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const isUpdating = useMemo(() => !!getValues('id'), [getValues]);


    const [img, name, tagline] = watch(['thumbnail_image', 'name', 'tagline'])

    const clickCancel = () => {
        if (window.confirm('You might lose some unsaved changes. Are you sure you want to continue?'))
            // props.onCancel?.() 
            alert("Canceled")
    }

    const clickSubmit = handleSubmit<IListProjectForm>(data => {
        NotificationsService.success("Submitted successfully")
        console.log(data);
    }, () => {
        NotificationsService.error("Please fill all the required fields");
        navigate(tabs['project-details'].path)
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
                href={tabs.team.path}
            >
                Next step: {tabs.team.text}
            </Button>
        else if (props.currentTab === 'team')
            return <Button
                color="primary"
                fullWidth
                href={tabs.extras.path}
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
    }, [clickSubmit, isDirty, isLoading, isUpdating, props.currentTab])


    return (
        <Card onlyMd className='flex flex-col gap-24'>
            <div className='hidden md:flex gap-8'>
                {img ?
                    <Avatar width={48} src={img} /> :
                    <div className="bg-gray-100 rounded-full w-48 h-48 shrink-0"></div>
                }
                <div className='overflow-hidden'>
                    <p className={`text-body4 text-black font-medium overflow-hidden text-ellipsis`}>{name || "Product preview"}</p>
                    {<p className={`text-body6 text-gray-600`}>{tagline || "Provide some more details."}</p>}
                </div>
            </div>
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
