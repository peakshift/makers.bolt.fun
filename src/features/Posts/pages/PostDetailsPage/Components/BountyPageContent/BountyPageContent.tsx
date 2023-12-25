import Header from "src/features/Posts/Components/PostCard/Header/Header";
import { Bounty } from "src/features/Posts/types";
import { marked } from "marked";
import styles from "../PageContent/styles.module.scss";
import Badge from "src/Components/Badge/Badge";
import { BiComment } from "react-icons/bi";
import VotesCount from "src/Components/VotesCount/VotesCount";
import Button from "src/Components/Button/Button";
import { FiGithub, FiShare2 } from "react-icons/fi";
import BountyApplicants from "./BountyApplicants";
import VoteButton from "src/Components/VoteButton/VoteButton";
import { RiFlashlightLine } from "react-icons/ri";
import { numberFormatter } from "src/utils/helperFunctions";

interface Props {
  bounty: Bounty;
}

export default function BountyPageContent({ bounty }: Props) {
  return (
    <div
      id="content"
      className="bg-white p-32 border-2 border-gray-200 rounded-16"
    >
      {/* Header */}
      <div className="flex flex-col gap-24">
        {bounty.author && (
          <Header
            size="lg"
            showTimeAgo={false}
            author={bounty.author}
            date={bounty.createdAt}
          />
        )}
        <h1 className="text-h2 font-bolder">
          {bounty.title}{" "}
          <Badge color="none" size="sm" className="bg-warning-500 text-black">
            Bounty
          </Badge>
        </h1>
        <div className="">
          <span className="text-body4 text-gray-600 font-bolder">Reward: </span>
          <span className="text-body4 text-purple-500 font-medium">
            {bounty.reward_amount} sats
          </span>
        </div>
        <div className="flex gap-24 items-center">
          <div className="text-black font-medium">
            <RiFlashlightLine />{" "}
            <span className="align-middle text-body5">
              {numberFormatter(bounty.votes_count)} votes
            </span>
          </div>
          <div className="text-black font-medium">
            <BiComment />{" "}
            <span className="align-middle text-body5">32 Comments</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-16">
          <Button size="sm" color="black" className="!font-normal">
            Express Interest
          </Button>
          <Button
            size="sm"
            color="none"
            className="bg-gray-500 text-white !font-normal"
          >
            <FiGithub className="text-body2" /> View On Github
          </Button>
          <Button
            size="sm"
            color="none"
            className="bg-gray-500 text-white !font-normal"
          >
            <FiShare2 className="text-body2" /> Share
          </Button>
        </div>
      </div>
      <div
        className={`mt-42 ${styles.body}`}
        dangerouslySetInnerHTML={{ __html: marked.parse(bounty.body) }}
      ></div>
      {/* Body */}
      <div className="flex gap-8">
        {bounty.tags.map((tag) => (
          <Badge key={tag.id} size="sm">
            {tag.title}
          </Badge>
        ))}
      </div>
      {/* Applicants */}
      <BountyApplicants applications={bounty.applications} />
    </div>
  );
}
