import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'src/Components/Button/Button'
import Card from 'src/Components/Card/Card'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar'
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

    const user = useAppSelector(state => state.user.me)


    if (!user)
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
                    to={createRoute({ type: 'profile', id: user.id, username: user.name })}>
                    <Avatar width={48} src={user.avatar!} />
                </Link>
                <div className='overflow-hidden'>
                    <p className={`text-body4 text-black font-medium overflow-hidden text-ellipsis`}>{user ? trimText(user.name, 30) : "Anonymouse"}</p>
                    {user.jobTitle && <p className={`text-body6 text-gray-600`}>{user.jobTitle}</p>}
                </div>
                {/* {showTimeAgo && <p className={`${nameSize[size]} text-gray-500 ml-auto `}>
                {dayjs().diff(props.date, 'hour') < 24 ? `${dayjs().diff(props.date, 'hour')}h ago` : undefined}
            </p>} */}
            </div>
            <p className="hidden md:block text-body5">{trimText(user.bio, 120)}</p>
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
