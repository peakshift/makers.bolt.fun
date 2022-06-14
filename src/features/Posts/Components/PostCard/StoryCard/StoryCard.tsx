import { Story } from "src/features/Posts/types"
import Header from "../Header/Header"
import { BiComment } from 'react-icons/bi'
import { Link } from "react-router-dom"
import VoteButton from "src/Components/VoteButton/VoteButton"
import { useVote } from "src/utils/hooks"
import { Tag, Vote_Item_Type } from 'src/graphql';
import Badge from "src/Components/Badge/Badge"

export type StoryCardType = Pick<Story,
    | 'id'
    | 'type'
    | 'title'
    | 'cover_image'
    | 'createdAt'
    | 'author'
    | 'excerpt'
    | 'votes_count'
    | 'comments_count'
> & {
    tags: Array<Pick<Tag, 'id' | "title">>
};

interface Props {
    story: StoryCardType
}
export default function StoryCard({ story }: Props) {

    const { vote } = useVote({
        itemId: story.id,
        itemType: Vote_Item_Type.Story
    });

    return (
        <div className="bg-white rounded-12 overflow-hidden border-2 border-gray-200">
            <img src={story.cover_image} className='h-[200px] w-full object-cover' alt="" />
            <div className="p-24">
                <Header author={story.author} date={story.createdAt} />
                <Link to={`/blog/post/Story/${story.id}`}>
                    <h2 className="text-h5 font-bolder mt-16">{story.title}</h2>
                </Link>
                <p className="text-body4 text-gray-600 mt-8">{story.excerpt}...</p>
                <div className="flex gap-8 mt-8">
                    {story.tags.map(tag => <Badge key={tag.id} size='sm'>
                        {tag.title}
                    </Badge>)}
                </div>

                <hr className="my-16 bg-gray-200" />
                <div className="flex gap-24 items-center">
                    <VoteButton votes={story.votes_count} dense onVote={vote} />
                    <div className="text-gray-600">
                        <BiComment /> <span className="align-middle text-body5">{story.comments_count} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
