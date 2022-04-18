import VotesCount from "src/Components/VotesCount/VotesCount"
import { Bounty } from "src/features/Posts/types"
import Header from "../Header/Header"
import { FiUsers } from "react-icons/fi"
import Badge from "src/Components/Badge/Badge"
import Button from "src/Components/Button/Button"

interface Props {
    bounty: Bounty
}
export default function BountyCard({ bounty }: Props) {
    return (
        <div className="bg-white rounded-12 overflow-hidden border">
            <img src={bounty.cover_image} className='h-[200px] w-full object-cover bg-gray-100' alt="" />
            <div className="p-24">
                <Header author={bounty.author} date={bounty.date} />
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-h5 font-bolder mt-16 flex items-center gap-8">
                            <Badge color="none" size="sm" className="bg-yellow-500 text-black">Bounty</Badge>
                            <span>{bounty.title}</span>
                        </h2>

                    </div>
                    <Button color="black" className="self-center !py-10 !px-36 flex-shrink-0 ">
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
                <div className="flex gap-24">
                    <VotesCount count={bounty.votes_count} />
                    <div className="text-gray-600">
                        <FiUsers /> <span className="align-middle text-body5">{bounty.applicants_count} Applicants</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
