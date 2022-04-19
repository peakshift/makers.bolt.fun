import Header from "src/features/Posts/Components/PostCard/Header/Header"
import { Bounty, } from "src/features/Posts/types"
import { marked } from 'marked';
import styles from './styles.module.css'
import Badge from "src/Components/Badge/Badge";
import { BiComment } from "react-icons/bi";
import VotesCount from "src/Components/VotesCount/VotesCount";
import Button from "src/Components/Button/Button";
import { FiGithub, FiShare2 } from "react-icons/fi";


interface Props {
    bounty: Bounty
}

export default function BountyPageContent({ bounty }: Props) {
    return (
        <div className="bg-white p-32 border rounded-16">

            {/* Header */}
            <div className="flex flex-col gap-24">
                <Header size="lg" showTimeAgo={false} author={bounty.author} date={bounty.date} />
                <h1 className="text-h2 font-bolder">{bounty.title} <Badge color="none" size="sm" className="bg-yellow-500 text-black">Bounty</Badge></h1>
                <div className="">
                    <span className="text-body4 text-gray-600 font-bolder">Reward: </span>
                    <span className="text-body4 text-purple-500 font-medium">{bounty.reward_amount} sats</span>
                </div>
                <div className="flex gap-24">
                    <VotesCount count={bounty.votes_count} />
                    <div className="text-black font-medium">
                        <BiComment /> <span className="align-middle text-body5">32 Comments</span>
                    </div>
                </div>
                <div className="flex gap-16">
                    <Button size='sm' color="black" className="!font-normal">
                        Express Interest
                    </Button>
                    <Button size='sm' color="none" className="bg-gray-500 text-white !font-normal">
                        <FiGithub className="text-body2" /> View On Github
                    </Button>
                    <Button size='sm' color="none" className="bg-gray-500 text-white !font-normal">
                        <FiShare2 className="text-body2" />  Share
                    </Button>
                </div>
            </div>
            <div className={`mt-42 ${styles.body}`} dangerouslySetInnerHTML={{ __html: marked.parse(bounty.body) }}>
            </div>
            {/* Body */}
            <div className="flex gap-8">
                {bounty.tags.map(tag => <Badge key={tag.id} size='sm'>
                    {tag.title}
                </Badge>)}
            </div>
            {/* Applicants */}
            <div className="border bg-white rounded-8 p-24 mt-16">
                <h4 className="text-body2 font-bolder">Applicants</h4>
                <ul className="flex flex-col gap-16 mt-16">
                    <li>
                        <Header author={bounty.author} size='sm' date={bounty.date} />
                        <div className="bg-gray-100 mt-10 p-16 rounded-8">
                            <p className="text-body5 font-medium mb-8">Work Plan</p>
                            <p className="text-body5 text-gray-600">I will create the widget using nextjs, react and typescript. and also convert it into a npm package.</p>
                        </div>
                    </li>
                    <li>
                        <Header author={bounty.author} size='sm' date={bounty.date} />
                        <div className="bg-gray-100 mt-10 p-16 rounded-8">
                            <p className="text-body5 font-medium mb-8">Work Plan</p>
                            <p className="text-body5 text-gray-600">I will create the widget using nextjs, react and typescript. and also convert it into a npm package.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
