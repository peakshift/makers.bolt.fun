import { marked } from "marked";
import { BiComment } from "react-icons/bi";
import DOMPurify from "dompurify";
import Card from "src/Components/Card/Card";
import { NostrToolsEventWithId } from "nostr-relaypool/event";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import dayjs from "dayjs";
import { trimText } from "src/utils/helperFunctions";
import IconButton from "src/Components/IconButton/IconButton";
import { nip19 } from "nostr-tools";
import { FiLink } from "react-icons/fi";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import { useAppSelector } from "src/utils/hooks";

interface Props {
  comment: NostrToolsEventWithId;
  canReply?: boolean;
  onReply?: () => void;
  author: {
    pubkey: string;
    name: string;
    image: string | null;
    link: string;
  };
}

export default function CommentCard({
  comment,
  canReply,
  onReply,
  author,
}: Props) {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();
  // const [votesCount, setVotesCount] = useState(comment.votes_count);

  //   const { vote } = useVote({
  //       itemId: comment.id,
  //       itemType: Vote_Item_Type.PostComment,
  //   });

  const isMobile = useAppSelector((s) => s.ui.isMobileDevice);

  return (
    <Card className="relative">
      <div className="flex gap-8">
        <a
          href={
            isMobile
              ? `nostr:${nip19.npubEncode(comment.pubkey)}`
              : `https://www.nostr.guru/p/${comment.pubkey}`
          }
          target="_blank"
          rel="noreferrer"
          className="shrink-0"
        >
          <Avatar
            width={32}
            src={
              author.image ??
              `https://avatars.dicebear.com/api/identicon/${author.pubkey}.svg`
            }
          />
        </a>
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
        >
          <IconButton ref={setTriggerRef}>
            <FiLink />
          </IconButton>
        </a>
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
      <div
        className="text-body4 mt-16 whitespace-pre-line break-words"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked.parse(comment.content)),
        }}
      ></div>
      <div className="flex gap-24 mt-16 items-center">
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
