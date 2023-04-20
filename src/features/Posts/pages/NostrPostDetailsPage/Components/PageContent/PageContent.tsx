import Card from "src/Components/Card/Card";
import IconButton from "src/Components/IconButton/IconButton";
import { FiLink, FiShare2 } from "react-icons/fi";
import { createRoute } from "src/utils/routing";
import { NotificationsService } from "src/services";
import CopyToClipboard from "react-copy-to-clipboard";
import Badge from "src/Components/Badge/Badge";
import { formatHashtag, trimText } from "src/utils/helperFunctions";
import DOMPurify from "dompurify";
import { marked } from "marked";
import styles from "./styles.module.scss";
import { lazy, Suspense } from "react";
import { RotatingLines } from "react-loader-spinner";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { NostrEvent, NostrProfile } from "src/lib/nostr";
import dayjs from "dayjs";
import { extractArticleFields } from "src/lib/nostr/helpers";
import LinkDuo from "src/Components/LinkDuo/LinkDuo";
import { purifyHtml } from "src/utils/validation";

interface Props {
  author: NostrProfile;
  post: NostrEvent;
  articleFields: ReturnType<typeof extractArticleFields>;
}

const CommentsWidgetRoot = lazy(
  () =>
    import(
      /* webpackChunkName: "comments_section" */ "src/features/Posts/Components/Comments/CommentsWidget/CommentsWidgetRoot"
    )
);

export default function PageContent({ author, post, articleFields }: Props) {
  return (
    <>
      <Card id="content" onlyMd className="relative max">
        <div className="flex justify-between items-center flex-wrap mb-16">
          {/* <PostPageHeader
          author={story.author}
          project={story.project}
          date={story.createdAt}
        /> */}
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
                  author?.image ??
                  `https://avatars.dicebear.com/api/identicon/${author?.pubkey}.svg`
                }
              />
            </LinkDuo>
            <div className="overflow-hidden">
              <a
                href={`https://www.nostr.guru/p/${post.pubkey}`}
                target="_blank"
                rel="noreferrer"
              >
                <p className="text-body5 text-gray-700">
                  {trimText(author?.name, 15)}
                </p>
              </a>
              <p className={`text-body6 text-gray-600`}>
                {dayjs(post.created_at * 1000).from(new Date())}
              </p>
            </div>
          </div>
          <div className="shrink-0 text-gray-400">
            <a
              href={`https://www.nostr.guru/e/${post.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <IconButton>
                <FiLink />
              </IconButton>
            </a>
            <CopyToClipboard
              text={
                window.location.origin +
                createRoute({ type: "nostr-story", id: post.id })
              }
              onCopy={() =>
                NotificationsService.info(" Copied share link to clipboard", {
                  icon: "📋",
                })
              }
            >
              <IconButton>
                <FiShare2 />
              </IconButton>
            </CopyToClipboard>
          </div>
        </div>
        {articleFields.image && (
          <img
            src={articleFields.image}
            className="w-full min-h-[120px] max-h-[50vh] object-cover rounded-12 mb-16"
            // className='w-full object-cover rounded-12 md:rounded-16 mb-16'
            alt=""
          />
        )}
        <div className="flex flex-col gap-24 relative">
          {articleFields.title && (
            <h1 className="text-[42px] leading-[58px] font-bolder">
              {articleFields.title}
            </h1>
          )}
          {/* <div className="flex gap-24">
                      <div className="text-black font-medium">
                          <RiFlashlightLine /> <span className="align-middle text-body5">{numberFormatter(story.votes_count)} votes</span>
                      </div>
                      <div className="text-black font-medium">
                          <BiComment /> <span className="align-middle text-body5">{story.comments_count} Comments</span>
                      </div>
                  </div> */}
        </div>

        <div
          className={`${styles.body} break-words`}
          dangerouslySetInnerHTML={{
            __html: purifyHtml(marked.parse(post.content)),
          }}
        ></div>
        {articleFields.tags.length > 0 && (
          <div className="flex flex-wrap gap-8">
            {articleFields.tags.map((tag, idx) => (
              <Badge key={idx} className="hover:bg-gray-200" size="sm">
                {formatHashtag(tag)}
              </Badge>
            ))}
          </div>
        )}
      </Card>
      <div id="comments" className="mt-10 comments_col">
        <Suspense
          fallback={
            <div className="flex justify-center py-32">
              <RotatingLines strokeColor="#ddd" width="64" />
            </div>
          }
        >
          <CommentsWidgetRoot
            story={{
              nostr_event_id: post.id,
              createdAt: new Date(post.created_at).toString(),
            }}
          />
        </Suspense>
      </div>
    </>
  );
}
