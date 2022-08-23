import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'src/Components/Button/Button'
import Card from 'src/Components/Card/Card'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar'
import { useProfileQuery } from 'src/graphql'
import { trimText } from 'src/utils/helperFunctions'
import { useAppSelector } from 'src/utils/hooks'
import { createRoute } from 'src/utils/routing'

interface Props {
    isLoading?: boolean;
    isDirty?: boolean;
    onSubmit?: () => void
    onCancel?: () => void;
}

export default function SaveChangesCard(props: Props) {

    const userId = useAppSelector(state => state.user.me?.id!)
    const profileQuery = useProfileQuery({
        variables: {
            profileId: userId,
        },
    })

    if (!profileQuery.data?.profile)
        return <></>


    const clickCancel = () => {
        if (window.confirm('You might lose some unsaved changes. Are you sure you want to continue?'))
            props.onCancel?.()
    }

    return (
        <Card onlyMd className='flex flex-col gap-24'>
            <div className='hidden md:flex gap-8'>
                <Link
                    className='shrink-0'
                    to={createRoute({ type: 'profile', id: profileQuery.data.profile.id, username: profileQuery.data.profile.name })}>
                    <Avatar width={48} src={profileQuery.data.profile.avatar!} />
                </Link>
                <div className='overflow-hidden'>
                    <p className={`text-body4 text-black font-medium overflow-hidden text-ellipsis`}>{profileQuery.data.profile ? trimText(profileQuery.data.profile.name, 30) : "Anonymouse"}</p>
                    {profileQuery.data.profile.jobTitle && <p className={`text-body6 text-gray-600`}>{profileQuery.data.profile.jobTitle}</p>}
                </div>
                {/* {showTimeAgo && <p className={`${nameSize[size]} text-gray-500 ml-auto `}>
                {dayjs().diff(props.date, 'hour') < 24 ? `${dayjs().diff(props.date, 'hour')}h ago` : undefined}
            </p>} */}
            </div>
            <p className="hidden md:block text-body5">{trimText(profileQuery.data.profile.bio, 120)}</p>
            <div className="flex flex-col gap-16">
                <Button
                    color="primary"
                    onClick={props.onSubmit}
                    disabled={!props.isDirty || props.isLoading}
                >
                    Save Changes
                </Button>
                <Button
                    color="gray"
                    onClick={clickCancel}
                    disabled={!props.isDirty || props.isLoading}
                >
                    Cancel
                </Button>
            </div>
        </Card>
    )
}
