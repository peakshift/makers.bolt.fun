import Avatar from 'src/features/Profiles/Components/Avatar/Avatar';
import dayjs from 'dayjs'
import { UnionToObjectKeys } from 'src/utils/types/utils';

interface Props {
    author: {
        id: number,
        name: string,
        image: string
    }
    date: string;
    size?: 'sm' | 'md' | 'lg';
    showTimeAgo?: boolean;
}

const avatarSize: UnionToObjectKeys<Props, 'size', number> = {
    sm: 32,
    md: 40,
    lg: 48
}

const nameSize: UnionToObjectKeys<Props, 'size'> = {
    sm: 'text-body5',
    md: 'text-body4',
    lg: 'text-body4'
}

export default function Header({
    size = 'md',
    showTimeAgo = true,
    ...props }: Props) {

    return (
        <div className='flex gap-8'>
            <Avatar width={avatarSize[size]} src={props.author.image} />
            <div>
                <p className={`${nameSize[size]} text-black font-medium`}>{props.author.name}</p>
                <p className={`text-body6 text-gray-600`}>{dayjs(props.date).format('MMMM DD')}</p>
            </div>
            {showTimeAgo && <p className={`${nameSize[size]} text-gray-500 ml-auto `}>
                {dayjs().diff(props.date, 'hour') < 24 ? `${dayjs().diff(props.date, 'hour')}h ago` : undefined}
            </p>}
        </div>
    )
}
