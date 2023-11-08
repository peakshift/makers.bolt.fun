import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Button from "src/Components/Button/Button";
import Card from "src/Components/Card/Card";
import { Author } from "src/features/Posts/types";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { trimText } from "src/utils/helperFunctions";
import { createRoute } from "src/utils/routing";

interface Props {
  author: Pick<Author, "id" | "name" | "avatar" | "join_date">;
}

export default function AuthorCard({ author }: Props) {
  return (
    <Card>
      <Link
        to={createRoute({
          type: "profile",
          id: author.id,
          username: author.name,
        })}
        className="flex gap-8"
      >
        <Avatar width={48} src={author.avatar} />
        <div className="overflow-hidden">
          <p
            className={`'text-body4' text-black font-medium overflow-hidden text-ellipsis whitespace-nowrap`}
          >
            {trimText(author.name, 333)}
          </p>
          <p className={`text-body6 text-gray-600`}>
            Joined on {dayjs(author.join_date).format("MMMM DD, YYYY")}
          </p>
        </div>
      </Link>
      <Button
        fullWidth
        href={createRoute({
          type: "profile",
          id: author.id,
          username: author.name,
        })}
        color="primary"
        className="mt-16"
      >
        Maker's Profile
      </Button>
    </Card>
  );
}
