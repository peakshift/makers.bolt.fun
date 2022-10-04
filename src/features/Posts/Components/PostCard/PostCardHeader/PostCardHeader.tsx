import Avatar from 'src/features/Profiles/Components/Avatar/Avatar';
import dayjs from 'dayjs'
import { UnionToObjectKeys } from 'src/utils/types/utils';
import { trimText } from 'src/utils/helperFunctions';
import { Link } from 'react-router-dom';
import { createRoute } from 'src/utils/routing';
import { Project, User } from 'src/graphql';

interface Props {
    author?: Pick<User, 'id' | 'name' | 'avatar'>
    project?: Pick<Project, 'id' | 'title' | "thumbnail_image" | 'hashtag'> | null
    date: string;
}


export default function PostCardHeader(props: Props) {


    const dateToShow = () => {
        const passedTime = dayjs().diff(props.date, 'hour');
        if (passedTime === 0) return 'now';
        if (passedTime < 24) return `${dayjs().diff(props.date, 'hour')}h ago`
        return dayjs(props.date).format('MMMM DD');
    }

    if (!props.author) return null

    return (
        <div className="flex gap-8 items-center mb-8">
            <span className='flex'>
                <Link to={createRoute({ type: 'profile', id: props.author.id, username: props.author.name })}>
                    <Avatar width={24} src={props.author.avatar} />
                </Link>
                {props.project && <Link className='-ml-12' to={createRoute({ type: "project", tag: props.project.hashtag })}>
                    <Avatar src={props.project.thumbnail_image} width={24} />
                </Link>}
            </span>
            <span className='flex gap-4'>
                <Link className='hover:underline' to={createRoute({ type: 'profile', id: props.author.id, username: props.author.name })}>
                    <p className="text-gray-900 text-body5 font-medium">{trimText(props.author.name, 20)}</p>
                </Link>
                {props.project && <>
                    <span className="text-body5 text-gray-500 font-medium">for</span>
                    <Link className='hover:underline' to={createRoute({ type: "project", tag: props.project.hashtag })}>
                        <p className="text-gray-900 text-body5 font-medium">{trimText(props.project.title, 15)}</p>
                    </Link>
                </>}
            </span>
            <p className="text-body6 text-gray-500 font-medium">{dateToShow()}</p>
        </div>
    )
}
