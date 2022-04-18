import Avatar from 'src/features/Profiles/Components/Avatar/Avatar';
import dayjs from 'dayjs'

interface Props {
    author: {
        id: number,
        name: string,
        image: string
    }
    date: string;
    size?: 'sm' | 'md'
}

export default function Header({ size = 'md', ...props }: Props) {

    return (
        <div className='flex gap-8'>
            <Avatar width={size === 'md' ? 40 : 32} src={props.author.image} />
            <div>
                <p className={`${size === 'md' ? 'text-body4' : "text-body5"} text-black font-medium`}>{props.author.name}</p>
                <p className={`text-body6 text-gray-600`}>{dayjs(props.date).format('MMMM DD')}</p>
            </div>
            <p className={`${size === 'md' ? 'text-body4' : " text-body5"} text-gray-500 ml-auto `}>
                {dayjs().diff(props.date, 'hour') < 24 ? `${dayjs().diff(props.date, 'hour')}h ago` : undefined}
            </p>
        </div>
    )
}
