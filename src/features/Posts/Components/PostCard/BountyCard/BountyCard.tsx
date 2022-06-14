import VotesCount from "src/Components/VotesCount/VotesCount"
import { Bounty } from "src/features/Posts/types"
import Header from "../Header/Header"
import { FiUsers } from "react-icons/fi"
import Badge from "src/Components/Badge/Badge"
import Button from "src/Components/Button/Button"
import { Link } from "react-router-dom"
import VoteButton from "src/Components/VoteButton/VoteButton"
import { Tag } from "src/graphql"

export type BountyCardType = Pick<Bounty,
    | 'id'
    | 'type'
    | 'title'
    | 'cover_image'
    | 'createdAt'
    | 'author'
    | 'excerpt'
    | 'votes_count'
    | "reward_amount"
    | "applicants_count"
> & {
    tags: Array<Pick<Tag, 'id' | "title">>
};
interface Props {
    bounty: BountyCardType
}
export default function BountyCard({ bounty }: Props) {

    const handleApply = () => {

    }

    return (
        <div className="bg-white rounded-12 overflow-hidden  border-2">
            <img src={bounty.cover_image} className='h-[200px] w-full object-cover bg-gray-100' alt="" />
            <div className="p-24">
                <Header author={bounty.author} date={bounty.createdAt} />
                <div className="flex flex-col gap-8 md:gap-0 md:flex-row justify-between">
                    <div>
                        <Link to={`/blog/post/Bounty/${bounty.id}`}>
                            <h2 className="text-h5 font-bolder mt-16 flex items-center gap-8">
                                <span><Badge color="none" size="sm" className="bg-warning-500 text-black">Bounty</Badge> {bounty.title}</span>
                            </h2>
                        </Link>

                    </div>
                    <Button color="black" onClick={handleApply} className="self-center !py-10 !px-36 flex-shrink-0 hidden md:block ">
                        Apply
                    </Button>
                </div>
                <div className=" mt-16">
                    <span className="text-body4 text-gray-600 font-bolder">Reward: </span>
                    <span className="text-body4 text-purple-500 font-medium">{bounty.reward_amount} sats</span>
                </div>
                <p className="text-body4 text-gray-600 mt-8">{bounty.excerpt}</p>

                <div className="flex gap-8 mt-8">
                    {bounty.tags.map(tag => <Badge key={tag.id} size='sm'>
                        {tag.title}
                    </Badge>)}
                </div>

                <hr className="my-16 bg-gray-200" />
                <div className="flex gap-24 items-center">
                    <VoteButton votes={bounty.votes_count} dense />
                    <div className="text-gray-600">
                        <FiUsers /> <span className="align-middle text-body5">{bounty.applicants_count} Applicants</span>
                    </div>
                </div>


                <Button color="black" onClick={handleApply} fullWidth className="mt-16 !py-10 !px-36 md:hidden ">
                    Apply
                </Button>
            </div>
        </div>
    )
}
