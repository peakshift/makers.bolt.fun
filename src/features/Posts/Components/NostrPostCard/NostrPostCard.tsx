import { Link } from "react-router-dom";
import Badge from "src/Components/Badge/Badge";
import { createRoute } from "src/utils/routing";
import Card from "src/Components/Card/Card";
import { formatHashtag, trimText } from "src/utils/helperFunctions";
import { NostrEvent, NostrProfile } from "src/lib/nostr";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import dayjs from "dayjs";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  extractArticleFields,
  extractImageFromContent,
} from "src/lib/nostr/helpers";
import LinkDuo from "src/Components/LinkDuo/LinkDuo";
import { nip19 } from "nostr-tools";
import { calcTimeSincePosting } from "../PostCard/PostCardHeader/PostCardHeader";
import { FiMessageSquare } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";

dayjs.extend(relativeTime);

interface Props {
  post: NostrEvent;
  author: NostrProfile | null;

  comments?: {
    state: "fetching" | "fetched";
    data: NostrEvent[];
  };
}

export default function NostrPostCard({ post, author, comments }: Props) {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();

  const articleFields = extractArticleFields(post);

  const { image: contentImage, content } = extractImageFromContent(
    post.content
  );

  const isLoadingComments =
    comments === undefined || comments?.state === "fetching";

  const coverImage = articleFields.image || contentImage;

  const storyUrl = createRoute({ type: "nostr-story", id: post.id });

  return (
    <div>
      {/* <PostCardHeader
        author={story.author}
        project={story.project}
        date={story.createdAt}
      /> */}
      <div className="flex items-center gap-8">
        <LinkDuo
          to={
            author?.boltfun_id
              ? createRoute({
                  type: "profile",
                  id: author.boltfun_id,
                  username: author.name,
                })
              : `https://nostr.guru/p/${post.pubkey}`
          }
          className="shrink-0"
        >
          <Avatar
            width={32}
            src={
              author?.image ??
              `https://api.dicebear.com/7.x/identicon/svg?seed=${author?.pubkey}`
            }
          />
        </LinkDuo>
        <div className="overflow-hidden">
          <a href={author?.link} target="_blank" rel="noreferrer">
            <p className="text-body5 text-gray-700">
              {trimText(author?.name, 15)}
            </p>
          </a>
          <p className={`text-body6 text-gray-600`}>
            {dayjs(post.created_at * 1000).from(new Date())}
          </p>
        </div>
        {/* <a
          href={
            isMobile
              ? `nostr:${nip19.noteEncode(post.id)}`
              : `https://www.nostr.guru/e/${post.id}`
          }
          target="_blank"
          rel="noreferrer"
          className="ml-auto text-gray-400"
        >
          <IconButton ref={setTriggerRef}>
            <FiLink />
          </IconButton>
        </a> */}
        {visible && (
          <div
            ref={setTooltipRef}
            {...getTooltipProps({
              className:
                "tooltip-container !bg-gray-900 !text-white text-body5 !rounded-8",
            })}
          >
            <div
              {...getArrowProps({
                className: "tooltip-arrow",
              })}
            />
            note link on nostr
          </div>
        )}
      </div>
      <Card className="overflow-hidden mt-8 flex flex-col gap-12">
        <Link to={storyUrl}>
          {coverImage && (
            // <Link
            //   className="mb-16 block"
            //   to={createRoute({
            //     type: "story",
            //     id: story.id,
            //     title: story.title,
            //     username: story.author.name,
            //   })}
            // >
            <img
              src={coverImage}
              className="w-full max-h-[50vh] object-cover rounded-8 mb-16"
              alt=""
              loading="lazy"
            />
            // </Link>
          )}
          {articleFields.title && (
            <h2 className="text-h5 font-bolder">{articleFields.title}</h2>
          )}
          <p className="text-body4 text-gray-600 line-clamp-6 whitespace-pre-wrap">
            {articleFields.summary ?? content}
          </p>
        </Link>
        {articleFields.tags.length > 0 && (
          <div className="flex flex-wrap gap-8 mt-8">
            {articleFields.tags.map((tag, idx) => (
              <Badge key={idx} className="hover:bg-gray-200" size="sm">
                {formatHashtag(tag)}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex gap-24 items-center">
          <Link
            to={`${storyUrl}#comments`}
            className="text-gray-500 rounded-8 p-8 hover:bg-gray-100"
          >
            <FiMessageSquare />{" "}
            <span className="align-middle">
              {isLoadingComments ? (
                <Skeleton width="9ch" />
              ) : comments.data.length > 0 ? (
                `${comments.data.length} Comments`
              ) : (
                "Leave a comment!"
              )}
            </span>
          </Link>
        </div>

        {comments?.data && comments.data.length > 0 && (
          <div className=" bg-gray-100 p-24 rounded">
            <ul className="flex flex-col gap-16">
              {comments?.data.slice(0, 3).map((comment) => (
                <li key={comment.id}>
                  <p>
                    <span className="font-bold text-gray-900">
                      {nip19.npubEncode(comment.pubkey).slice(0, 10)}...
                    </span>{" "}
                    <span className="text-body5 text-gray-400 italic">
                      {calcTimeSincePosting(
                        new Date(comment.created_at * 1000).toISOString()
                      )}
                    </span>
                  </p>
                  <p className="text-gray-600 whitespace-pre-line">
                    {comment.content}
                  </p>
                </li>
              ))}
            </ul>
            {comments.data.length > 3 && (
              <Link
                to={`${storyUrl}#comments`}
                className="inline-block mt-24 text-gray-600 font-medium hover:underline "
              >
                See all {comments.data.length} comments
              </Link>
            )}
          </div>
        )}

        {/* <hr className="my-16 bg-gray-200" />
            <div className="flex gap-24 items-center">
              <VoteButton votes={story.votes_count} dense onVote={vote} />
            </div> */}
      </Card>
    </div>
  );
}
