import React from 'react'
import { Link } from 'react-router-dom'
import Badge from 'src/Components/Badge/Badge'
import Button from 'src/Components/Button/Button'
import Card from 'src/Components/Card/Card'
import { Story } from 'src/features/Posts/types'
import { getDateDifference } from 'src/utils/helperFunctions'
import { Tag } from 'src/utils/interfaces'
import { createRoute } from 'src/utils/routing'

interface Props {
    isOwner?: boolean;
    stories: Array<
        Pick<Story,
            | 'id'
            | 'title'
            | 'createdAt'
        >
        &
        {
            tags: Array<Pick<Tag, 'id' | 'icon' | 'title'>>
        }
    >
}

export default function StoriesCard({ stories, isOwner }: Props) {
    return (
        <Card>
            <p className="text-body2 font-bold">Stories ({stories.length})</p>
            {stories.length > 0 &&
                <ul className="">
                    {stories.map(story =>
                        <li key={story.id} className='py-24 border-b-[1px] border-gray-200 last-of-type:border-b-0  ' >
                            <Link
                                className="hover:underline text-body3 font-medium"
                                role={'button'}
                                to={createRoute({ type: "story", id: story.id, title: story.title })}
                            >
                                {story.title}
                            </Link>
                            <div className="flex flex-wrap items-center gap-8 text-body5 mt-8">
                                <p className="text-gray-600 mr-12">{getDateDifference(story.createdAt, { dense: true })} ago</p>
                                {story.tags.slice(0, 3).map(tag => <Badge key={tag.id} size='sm'>
                                    {tag.icon} {tag.title}
                                </Badge>)}
                                {story.tags.length > 3 && <Badge size='sm'>
                                    +{story.tags.length - 3}
                                </Badge>}
                            </div>
                        </li>)}
                </ul>}
            {stories.length === 0 &&
                <div className="flex flex-col gap-16 mt-24">
                    <p className="text-body3 font-medium">
                        😐 No Stories Added Yet
                    </p>
                    <p className="text-body5 text-gray-500">
                        The maker have not written any stories yet
                    </p>
                    {isOwner && <Button
                        href='/blog/create-post'
                        color='primary'
                    >
                        Write your first story
                    </Button>}
                </div>
            }
        </Card>
    )
}
