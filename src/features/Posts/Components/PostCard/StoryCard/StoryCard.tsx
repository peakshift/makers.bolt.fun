import { Story } from "src/features/Posts/types";
import { Link } from "react-router-dom";
import VoteButton from "src/Components/VoteButton/VoteButton";
import { useVote } from "src/utils/hooks";
import { Author, Tag, Vote_Item_Type } from "src/graphql";
import Badge from "src/Components/Badge/Badge";
import { createRoute } from "src/utils/routing";
import Card from "src/Components/Card/Card";
import PostCardHeader, {
  calcTimeSincePosting,
} from "../PostCardHeader/PostCardHeader";
import { formatHashtag } from "src/utils/helperFunctions";
import { marked } from "marked";
import { purifyHtml } from "src/utils/validation";
import { MdChatBubble } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { NostrEvent, NostrProfile } from "src/lib/nostr";

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
  | "nostr_event_id"
> & {
  tags: Array<Pick<Tag, "id" | "title">>;
  author: Pick<Author, "id" | "name" | "avatar" | "join_date">;
};

interface Props {
  story: StoryCardType;
  comments?: {
    state: "fetching" | "fetched";
    data: NostrEvent[];
  };
  commentsProfilesData: Record<string, NostrProfile>;
}
export default function StoryCard({
  story,
  comments,
  commentsProfilesData,
}: Props) {
  const { vote } = useVote({
    itemId: story.id,
    itemType: Vote_Item_Type.Story,
  });

  const isLoadingComments =
    comments === undefined || comments?.state === "fetching";

  const storyUrl = createRoute({
    type: "story",
    id: story.id,
    title: story.title,
    username: story.author.name,
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
            to={storyUrl}
            aria-hidden="true"
            tabIndex={-1}
          >
            <img
              src={story.cover_image}
              className="h-[200px] w-full object-cover rounded-8"
              alt=""
            />
          </Link>
        )}
        <div>
          <h2 className="text-h4 font-bolder">
            <Link className="block" to={storyUrl}>
              {story.title}
            </Link>
          </h2>
          <div className="flex flex-wrap gap-8 mt-8">
            {story.tags.map((tag) => (
              <Link
                to={createRoute({ type: "tag-page", tag: tag.title })}
                key={tag.id}
              >
                <Badge className="hover:bg-gray-200" color="gray" size="sm">
                  {formatHashtag(tag.title)}
                </Badge>
              </Link>
            ))}
          </div>
          <hr className="my-16 h-0.5 bg-gray-200 border-0 rounded" />
          <div className="flex gap-24 items-center">
            <VoteButton votes={story.votes_count} dense onVote={vote} />

            <Link
              to={`${storyUrl}#comments`}
              className="text-gray-500 rounded-8 p-8 hover:bg-gray-100"
            >
              <MdChatBubble className="text-body2 text-gray-400 mr-4" />{" "}
              <span className="align-middle">
                {isLoadingComments ? (
                  <Skeleton width="9ch" />
                ) : comments.data.length === 1 ? (
                  `${comments.data.length} Reply`
                ) : comments.data.length > 1 ? (
                  `${comments.data.length} Replies`
                ) : (
                  "Give feedback!"
                )}
              </span>
            </Link>
          </div>
          {comments?.data && comments.data.length > 0 && (
            <div className=" bg-gray-100 p-24 mt-16 rounded">
              <ul className="flex flex-col gap-16">
                {comments?.data.slice(0, 3).map((comment) => (
                  <li key={comment.id}>
                    <p>
                      <span className="font-bold text-gray-900">
                        {commentsProfilesData[comment.pubkey]?.name ??
                          "Anonymous"}
                      </span>{" "}
                      <time
                        dateTime={new Date(
                          comment.created_at * 1000
                        ).toISOString()}
                        className="text-body5 text-gray-400 italic"
                      >
                        {calcTimeSincePosting(
                          new Date(comment.created_at * 1000).toISOString()
                        )}
                      </time>
                    </p>
                    <div
                      className="text-gray-600 prose line-clamp-6"
                      dangerouslySetInnerHTML={{
                        __html: purifyHtml(marked.parse(comment.content)),
                      }}
                    ></div>
                  </li>
                ))}
              </ul>
              {comments.data.length > 3 && (
                <Link
                  to={`${storyUrl}#comments`}
                  className="inline-block mt-24 text-gray-600 font-medium hover:bg-gray-200 p-8 rounded"
                >
                  See all {comments.data.length} comments
                </Link>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
