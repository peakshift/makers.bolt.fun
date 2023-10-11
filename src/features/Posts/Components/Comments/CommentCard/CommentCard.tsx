import { marked } from "marked";
import { BiComment } from "react-icons/bi";
import Card from "src/Components/Card/Card";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import dayjs from "dayjs";
import { trimText } from "src/utils/helperFunctions";
import IconButton from "src/Components/IconButton/IconButton";
import { nip19 } from "nostr-tools";
import { FiLink } from "react-icons/fi";
import "react-popper-tooltip/dist/styles.css";
import { useAppSelector } from "src/utils/hooks";
import { replaceMentionsWithLinks } from "src/features/Posts/pages/NostrPostDetailsPage/NostrPostDetailsPage";
import { extractImageFromContent } from "src/lib/nostr/helpers";
import { Tooltip } from "react-tooltip";
import LinkDuo from "src/Components/LinkDuo/LinkDuo";
import { NostrEvent, NostrProfile } from "src/lib/nostr";
import { createRoute } from "src/utils/routing";
import { purifyHtml } from "src/utils/validation";

interface Props {
  comment: NostrEvent;
  canReply?: boolean;
  onReply?: () => void;
  author: NostrProfile;
}

export default function CommentCard({
  comment,
  canReply,
  onReply,
  author,
}: Props) {
  // const [votesCount, setVotesCount] = useState(comment.votes_count);

  //   const { vote } = useVote({
  //       itemId: comment.id,
  //       itemType: Vote_Item_Type.PostComment,
  //   });

  const isMobile = useAppSelector((s) => s.ui.isMobileDevice);

  const { image, content } = extractImageFromContent(comment.content);
  const contentWithMentionsLinks = replaceMentionsWithLinks(
    content,
    comment.tags
  );

  return (
    <Card className="relative">
      <div className="flex gap-8">
        <LinkDuo
          to={
            author.boltfun_id
              ? createRoute({
                  type: "profile",
                  id: author.boltfun_id,
                  username: author.name,
                })
              : `https://nostr.guru/p/${author.pubkey}`
          }
          className="shrink-0"
        >
          <Avatar
            width={32}
            src={
              author.image ??
              `https://api.dicebear.com/7.x/identicon/svg?seed=${author.pubkey}`
            }
          />
        </LinkDuo>
        <div className="overflow-hidden">
          <a href={author.link} target="_blank" rel="noreferrer">
            <p className="text-body5 text-gray-700">
              {trimText(author.name, 15)}
            </p>
          </a>
          <p className={`text-body6 text-gray-600`}>
            {dayjs(comment.created_at * 1000).from(new Date())}
          </p>
        </div>
        <a
          href={
            isMobile
              ? `nostr:${nip19.noteEncode(comment.id)}`
              : `https://www.nostr.guru/e/${comment.id}`
          }
          target="_blank"
          rel="noreferrer"
          className="ml-auto text-gray-400"
          data-tooltip-id="nostr-link"
          data-tooltip-content="view nostr event"
        >
          <IconButton>
            <FiLink />
          </IconButton>
          <Tooltip id="nostr-link" />
        </a>
      </div>
      {image && (
        <div>
          <img src={image} alt="" className="max-h-[50vh]" />
        </div>
      )}
      <div
        className="text-body4 mt-16 whitespace-pre-line break-words [&_a]:text-blue-400 [&_a]:underline"
        dangerouslySetInnerHTML={{
          __html: purifyHtml(marked.parse(contentWithMentionsLinks)),
        }}
      ></div>
      <div className="flex gap-24 items-center">
        {/* <VoteButton
          votes={-1}
          hideVotesCoun
          onVote={vote}
         /> */}

        <button
          className={`text-gray-600 font-medium hover:bg-gray-100 py-8 px-12 rounded-8 ${
            !canReply && "pointer-events-none opacity-60"
          }`}
          onClick={onReply}
        >
          <BiComment /> <span className="align-middle text-body5">Reply</span>
        </button>
      </div>
    </Card>
  );
}
