import { marked } from "marked";
import { BiComment } from "react-icons/bi";
import DOMPurify from "dompurify";
import Card from "src/Components/Card/Card";
import { NostrToolsEvent } from "nostr-relaypool/event";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import dayjs from "dayjs";
import { trimText } from "src/utils/helperFunctions";

interface Props {
  comment: NostrToolsEvent;
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
  // const [votesCount, setVotesCount] = useState(comment.votes_count);

  //   const { vote } = useVote({
  //       itemId: comment.id,
  //       itemType: Vote_Item_Type.PostComment,
  //   });

  return (
    <Card>
      <div className="flex gap-8">
        <a href={author.link} target="_blank" rel="noreferrer">
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
        {canReply && (
          <button
            className="text-gray-600 font-medium hover:bg-gray-100 py-8 px-12 rounded-8"
            onClick={onReply}
          >
            <BiComment /> <span className="align-middle text-body5">Reply</span>
          </button>
        )}
      </div>
    </Card>
  );
}
