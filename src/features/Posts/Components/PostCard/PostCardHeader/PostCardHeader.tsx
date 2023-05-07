import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import dayjs from "dayjs";
import { UnionToObjectKeys } from "src/utils/types/utils";
import { trimText } from "src/utils/helperFunctions";
import { Link } from "react-router-dom";
import { createRoute } from "src/utils/routing";
import { Project, User } from "src/graphql";

interface Props {
  author?: Pick<User, "id" | "name" | "avatar">;
  project?: Pick<
    Project,
    "id" | "title" | "thumbnail_image" | "hashtag"
  > | null;
  date: string;
}

export default function PostCardHeader(props: Props) {
  if (!props.author) return null;

  return (
    <div className="flex gap-8 items-center mb-8">
      <span className="flex">
        <Link
          to={createRoute({
            type: "profile",
            id: props.author.id,
            username: props.author.name,
          })}
          aria-hidden="true"
          tabIndex={-1}
        >
          <Avatar width={32} src={props.author.avatar} />
        </Link>
        {props.project && (
          <Link
            className="-ml-12"
            to={createRoute({ type: "project", tag: props.project.hashtag })}
            aria-hidden="true"
            tabIndex={-1}
          >
            <Avatar src={props.project.thumbnail_image!} width={32} />
          </Link>
        )}
      </span>
      <span className="flex gap-4">
        <Link
          className="hover:underline"
          to={createRoute({
            type: "profile",
            id: props.author.id,
            username: props.author.name,
          })}
        >
          <p className="text-gray-900 text-body5 font-medium">
            {trimText(props.author.name, 20)}
          </p>
        </Link>
        {props.project && (
          <>
            <span className="text-body5 text-gray-500 font-medium">for</span>
            <Link
              className="hover:underline"
              to={createRoute({ type: "project", tag: props.project.hashtag })}
            >
              <p className="text-gray-900 text-body5 font-medium">
                {trimText(props.project.title, 20)}
              </p>
            </Link>
          </>
        )}
      </span>
      <time
        dateTime={props.date}
        className="text-body6 text-gray-500 font-medium"
      >
        {calcTimeSincePosting(props.date)}
      </time>
    </div>
  );
}

export function calcTimeSincePosting(date: string) {
  const passedTimeHrs = dayjs().diff(date, "hour");
  const passedTimesDays = Math.ceil(passedTimeHrs / 24);
  if (passedTimeHrs === 0) return "now";
  if (passedTimeHrs < 24) return `${dayjs().diff(date, "hour")}h ago`;
  if (passedTimesDays < 29) return `${passedTimesDays} days`;
  return dayjs(date).format("DD MMM");
}
