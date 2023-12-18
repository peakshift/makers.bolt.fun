import VotesCount from "src/Components/VotesCount/VotesCount";
import { Question } from "src/features/Posts/types";
import Header from "../Header/Header";
import { FiUsers } from "react-icons/fi";
import Badge from "src/Components/Badge/Badge";
import { Link } from "react-router-dom";
import VoteButton from "src/Components/VoteButton/VoteButton";
import { Author, Tag } from "src/graphql";

export type QuestionCardType = Pick<
  Question,
  "id" | "type" | "title" | "createdAt" | "excerpt" | "votes_count"
> & {
  // comments: Array<Pick<Question['comments'][number],
  //     | 'id'
  //     | 'author'
  //     | 'body'
  //     | 'createdAt'
  // >>
  tags: Array<Pick<Tag, "id" | "title">>;
  author: Pick<Author, "id" | "name" | "avatar" | "join_date"> | null;
};
interface Props {
  question: QuestionCardType;
}
export default function QuestionCard({ question }: Props) {
  return (
    <div className="bg-white rounded-12 overflow-hidden  border-2">
      {/* <img src={question.cover_image} className='h-[200px] w-full object-cover' alt="" /> */}
      <div className="p-24">
        {question.author && (
          <Header author={question.author} date={question.createdAt} />
        )}
        <div className="flex justify-between">
          <Link to={`/blog/post/Question/${question.id}`}>
            <h2 className="text-h5 font-bolder mt-16">{question.title}</h2>
          </Link>
        </div>
        <p className="text-body4 text-gray-600 mt-8">{question.excerpt}</p>

        <div className="flex gap-8 mt-8">
          <Badge
            key={"991199"}
            size="sm"
            color="none"
            className="bg-red-200 text-red-600"
          >
            Help
          </Badge>
          {question.tags.map((tag) => (
            <Badge key={tag.id} size="sm">
              {tag.title}
            </Badge>
          ))}
        </div>

        <hr className="my-16 bg-gray-200" />
        <div className="flex gap-24 items-center">
          <VoteButton votes={question.votes_count} dense />
          {/* <div className="text-gray-600">
                        <FiUsers /> <span className="align-middle text-body5">{question.answers_count} Answers</span>
                    </div> */}
        </div>

        <div className="flex p-16 mt-16 flex-col gap-10 bg-gray-50">
          <div className="flex flex-col gap-10">
            {/* {question.comments.slice(0, 2).map(comment => <div key={comment.id} className="border-b last-of-type:border-b-0 pb-8 " >
                            <Header author={comment.author} size='sm' date={comment.createdAt} />
                            <p className="text-body5 text-gray-600 mt-8">{trimText(comment.body, 80)}</p>
                        </div>)} */}
          </div>

          {/* <div className="flex">
                        <Link to={`/blog/post/Question/${question.id}`} className="text-black font-medium p-8 hover:bg-gray-100 rounded">
                            See all {question.answers_count} comments
                        </Link>
                    </div> */}
        </div>
      </div>
    </div>
  );
}
