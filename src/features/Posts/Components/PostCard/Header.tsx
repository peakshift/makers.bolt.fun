import React from 'react'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar';

interface Props {
    name: string;
    avatar: string;
    date: string
}

export default function Header(props: Props) {
    return (
        <div className='flex gap-8'>
            <Avatar width={40} src={props.avatar} />
            <div>
                <p className='text-body4 text-black font-medium'>{props.name}</p>
                <p className='text-body6 text-gray-600'>{props.date}</p>
            </div>
            <p className="text-body5 text-gray-500 ml-auto ">
                3h ago
            </p>
        </div>
    )
}
