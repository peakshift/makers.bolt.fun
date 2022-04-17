import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar'
import { Author } from '../../types'

const data = [
    {
        id: 1,
        title: 'How to collect donations within lightning network?',
        author: {
            id: 2,
            name: "John Doe",
            image: "https://i.pravatar.cc/150?img=2"
        } as Author
    },
    {
        id: 2,
        title: 'How to implement the RSMC part of Lightning network?',
        author: {
            id: 2,
            name: "John Doe",
            image: "https://i.pravatar.cc/150?img=2"
        } as Author
    },
    {
        id: 3,
        title: 'c-lightning public node data on explorers',
        author: {
            id: 2,
            name: "John Doe",
            image: "https://i.pravatar.cc/150?img=2"
        } as Author
    },
    {
        id: 4,
        title: 'How to find all nodes and connections in LN?',
        author: {
            id: 2,
            name: "John Doe",
            image: "https://i.pravatar.cc/150?img=2"
        } as Author
    },
]

export default function TrendingCard() {
    return (
        <div className="bg-white rounded-8 border p-16">
            <h3 className="text-body2 font-bolder mb-16">Trending on BOLT.FUN</h3>
            <ul className='flex flex-col gap-16'>
                {data.map(post =>
                    <Link key={post.id} to={`/post-details-page/${post.id}`} className="border-b pb-4 last-of-type:border-b-0">
                        <li className="flex items-start gap-8">
                            <Avatar width={24} src={post.author.image} />
                            <p className="text-body5 font-medium">{post.title}</p>
                        </li>
                    </Link>
                )}
            </ul>
        </div>
    )
}
