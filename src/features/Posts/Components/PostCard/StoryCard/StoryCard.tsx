import VotesCount from "src/Components/VotesCount/VotesCount"
import { Story } from "src/features/Posts/types"
import Header from "../Header/Header"
import { BiComment } from 'react-icons/bi'

interface Props {
    story: Story
}
export default function StoryCard({ story }: Props) {
    return (
        <div className="bg-white rounded-12 overflow-hidden border">
            <img src={story.cover_image} className='h-[200px] w-full object-cover' alt="" />
            <div className="p-24">
                <Header author={story.author} date={story.date} />
                <h2 className="text-h5 font-bolder mt-16">{story.title}</h2>
                <p className="text-body4 text-gray-600 mt-8">{story.excerpt}</p>

                <hr className="my-16 bg-gray-200" />
                <div className="flex gap-24">
                    <VotesCount count={story.votes_count} />
                    <div className="text-gray-600">
                        <BiComment /> <span className="align-middle text-body5">{story.comments_count} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
