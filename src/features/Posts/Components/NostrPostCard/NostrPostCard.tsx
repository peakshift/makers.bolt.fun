import { Story } from "src/features/Posts/types";
import { Link } from "react-router-dom";
import { useAppSelector } from "src/utils/hooks";
import Badge from "src/Components/Badge/Badge";
import { createRoute } from "src/utils/routing";
import { BiComment } from "react-icons/bi";
import Card from "src/Components/Card/Card";
import {
  formatHashtag,
  isMobileDevice,
  trimText,
} from "src/utils/helperFunctions";
import { NostrToolsEventWithId } from "nostr-relaypool/event";
import { NostrProfile } from "src/utils/nostr";
import IconButton from "src/Components/IconButton/IconButton";
import { FiLink } from "react-icons/fi";
import { Kind, nip19 } from "nostr-tools";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import dayjs from "dayjs";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface Props {
  post: NostrToolsEventWithId;
  author: NostrProfile | null;
}

const EXTRACT_IMAGE_FROM_CONTENT_REGEX = /https?:\/\/(\S+?(?:jpe?g|png|gif))$/i;

export default function NostrPostCard({ post, author }: Props) {
  const isMobile = useAppSelector((s) => s.ui.isMobileDevice);

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();

  const articleFields = extractArticleFields(post);

  return (
    <div>
      {/* <PostCardHeader
        author={story.author}
        project={story.project}
        date={story.createdAt}
      /> */}
      <div className="flex items-center gap-8">
        <a
          href={
            isMobile
              ? `nostr:${nip19.npubEncode(post.pubkey)}`
              : `https://www.nostr.guru/p/${post.pubkey}`
          }
          target="_blank"
          rel="noreferrer"
          className="shrink-0"
        >
          <Avatar
            width={32}
            src={
              author?.image ??
              `https://avatars.dicebear.com/api/identicon/${author?.pubkey}.svg`
            }
          />
        </a>
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
        <Link to={createRoute({ type: "nostr-story", id: post.id })}>
          {articleFields.image && (
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
              src={articleFields.image}
              className="w-full max-h-[50vh] object-cover rounded-8 mb-16"
              alt=""
              loading="lazy"
            />
            // </Link>
          )}
          {articleFields.title && (
            <h2 className="text-h5 font-bolder">{articleFields.title}</h2>
          )}
          <p className="text-body4 text-gray-600 line-clamp-4">
            {articleFields.summary ?? articleFields.content}
          </p>
        </Link>
        <div className="flex flex-wrap gap-8 mt-8">
          {articleFields.tags.map((tag, idx) => (
            <Badge key={idx} className="hover:bg-gray-200" size="sm">
              {formatHashtag(tag)}
            </Badge>
          ))}
        </div>

        {/* <hr className="my-16 bg-gray-200" />
            <div className="flex gap-24 items-center">
              <VoteButton votes={story.votes_count} dense onVote={vote} />
            </div> */}
      </Card>
    </div>
  );
}

export function extractArticleFields(event: NostrToolsEventWithId) {
  const title = event.tags.find((t) => t[0] === "title")?.[1];
  const summary =
    event.tags.find((t) => t[0] === "summary")?.[1] ??
    event.content.slice(0, 150);
  let image = event.tags.find((t) => t[0] === "image")?.[1];
  let content = event.content;
  const tags = event.tags.filter((t) => t[0] === "t").map((t) => t[1]);

  if (!image) {
    const imgIdx = event.content.search(EXTRACT_IMAGE_FROM_CONTENT_REGEX);
    image = imgIdx !== -1 ? event.content.slice(imgIdx) : undefined;
    content = imgIdx !== -1 ? event.content.slice(0, imgIdx) : event.content;
  }

  return {
    title,
    image,
    summary,
    content,
    tags,
  };
}
