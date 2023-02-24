import { Story } from "src/features/Posts/types";
import { Link } from "react-router-dom";
import VoteButton from "src/Components/VoteButton/VoteButton";
import { useVote } from "src/utils/hooks";
import { Author, Tag, Vote_Item_Type } from "src/graphql";
import Badge from "src/Components/Badge/Badge";
import { createRoute } from "src/utils/routing";
import Card from "src/Components/Card/Card";
import PostCardHeader from "../PostCardHeader/PostCardHeader";
import { formatHashtag } from "src/utils/helperFunctions";

export type StoryCardType = Pick<
  Story,
  | "id"
  | "type"
  | "title"
  | "cover_image"
  | "createdAt"
  | "excerpt"
  | "votes_count"
  | "comments_count"
  | "project"
> & {
  tags: Array<Pick<Tag, "id" | "title">>;
  author: Pick<Author, "id" | "name" | "avatar" | "join_date">;
};

interface Props {
  story: StoryCardType;
}
export default function StoryCard({ story }: Props) {
  const { vote } = useVote({
    itemId: story.id,
    itemType: Vote_Item_Type.Story,
  });

  return (
    <div>
      <PostCardHeader
        author={story.author}
        project={story.project}
        date={story.createdAt}
      />
      <Card className="overflow-hidden mt-8">
        {story.cover_image && (
          <Link
            className="mb-16 block"
            to={createRoute({
              type: "story",
              id: story.id,
              title: story.title,
              username: story.author.name,
            })}
          >
            <img
              src={story.cover_image}
              className="h-[200px] w-full object-cover rounded-8"
              alt=""
            />
          </Link>
        )}
        <div>
          <Link
            to={createRoute({
              type: "story",
              id: story.id,
              title: story.title,
              username: story.author.name,
            })}
          >
            <h2 className="text-h5 font-bolder">{story.title}</h2>
          </Link>
          <p className="text-body4 text-gray-600 mt-8">{story.excerpt}...</p>
          <div className="flex flex-wrap gap-8 mt-8">
            {story.tags.map((tag) => (
              <Link
                to={createRoute({ type: "tag-page", tag: tag.title })}
                key={tag.id}
              >
                <Badge className="hover:bg-gray-200" size="sm">
                  {formatHashtag(tag.title)}
                </Badge>
              </Link>
            ))}
          </div>

          <hr className="my-16 bg-gray-200" />
          <div className="flex gap-24 items-center">
            <VoteButton votes={story.votes_count} dense onVote={vote} />
          </div>
        </div>
      </Card>
    </div>
  );
}
