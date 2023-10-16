import { Story } from "src/features/Posts/types";
import { marked } from "marked";
import styles from "../PageContent/styles.module.scss";
import Badge from "src/Components/Badge/Badge";
import IconButton from "src/Components/IconButton/IconButton";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { useAppSelector } from "src/utils/hooks";
import { useUpdateStory } from "./useUpdateStory";
import DOMPurify from "dompurify";
import Card from "src/Components/Card/Card";
import PostPageHeader from "../PostPageHeader/PostPageHeader";
import { FiEdit2, FiLink, FiShare2 } from "react-icons/fi";
import CopyToClipboard from "react-copy-to-clipboard";
import { createRoute } from "src/utils/routing";
import { NotificationsService } from "src/services";
import OgTags from "src/Components/OgTags/OgTags";
import {
  formatHashtag,
  numberFormatter,
  toSort,
} from "src/utils/helperFunctions";
import { Link } from "react-router-dom";
import { lazy, Suspense, useRef } from "react";
import { RotatingLines } from "react-loader-spinner";
import { RelayPoolProvider } from "src/lib/nostr";
import { withProviders } from "src/utils/hoc";
import { Tooltip } from "react-tooltip";
import PostImagesLightbox from "../PostImagesLightbox/PostImagesLightbox";
import { purifyHtml } from "src/utils/validation";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";

const CommentsWidgetRoot = lazy(
  () =>
    import(
      /* webpackChunkName: "comments_section" */ "src/features/Posts/Components/Comments/CommentsWidget/CommentsWidgetRoot"
    )
);

interface Props {
  story: Story;
}

function StoryPageContent({ story }: Props) {
  const storyContentDomRef = useRef<HTMLDivElement>(null);

  const { curUser } = useAppSelector((state) => ({
    curUser: state.user.me,
  }));

  const { handleDelete, handleEdit } = useUpdateStory(story);

  return (
    <>
      <OgTags
        title={story.title}
        description={story.body.slice(0, 50)}
        image={story.cover_image}
      />
      <Card id="content" onlyMd className="relative max">
        <div className="flex justify-between items-center flex-wrap mb-16">
          <PostPageHeader
            author={story.author}
            project={story.project}
            date={story.createdAt}
          />
          <div className="shrink-0 text-gray-400">
            {story.nostr_event_id && (
              <a
                href={`https://www.nostr.guru/e/${story.nostr_event_id}`}
                target="_blank"
                rel="noreferrer"
                data-tooltip-id="nostr-link"
                data-tooltip-content="view nostr event"
              >
                <IconButton>
                  <FiLink />
                </IconButton>
                <Tooltip id="nostr-link" />
              </a>
            )}

            <CopyToClipboard
              text={
                window.location.origin +
                createRoute({
                  type: "story",
                  title: story.title,
                  id: story.id,
                })
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
            {curUser?.id === story.author.id && (
              <Menu
                menuClassName="!p-8 !rounded-12"
                menuButton={
                  <IconButton className="text-gray-400">
                    <FiEdit2 />
                  </IconButton>
                }
              >
                <MenuItem
                  onClick={handleEdit}
                  className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
                >
                  Edit story
                </MenuItem>
                <MenuItem
                  onClick={handleDelete}
                  className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
                >
                  Delete
                </MenuItem>
              </Menu>
            )}
          </div>
        </div>
        {story.cover_image && (
          <img
            src={story.cover_image}
            className="w-full min-h-[120px] max-h-[320px] object-cover rounded-12 mb-16"
            // className='w-full object-cover rounded-12 md:rounded-16 mb-16'
            alt=""
          />
        )}
        <div className="flex flex-col gap-24 relative">
          <h1 className="text-[42px] leading-[58px] font-bolder">
            {story.title}
          </h1>
          {story.tags.length > 0 && (
            <div className="flex flex-wrap gap-8">
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
          ref={storyContentDomRef}
          className={`mt-42 ${styles.body}`}
          dangerouslySetInnerHTML={{
            __html: purifyHtml(marked.parse(story.body)),
          }}
        ></div>
        <PostImagesLightbox contentDomRef={storyContentDomRef} />
      </Card>
      <section>
        <h3 className="text-body2 font-bolder">⚡Tipped by:</h3>
        <ul className="flex flex-wrap items-stretch gap-8 pt-16">
          {toSort(
            story.votes.voters,
            (v1, v2) => v2.amount_voted - v1.amount_voted
          ).map((voter) => (
            <li key={voter.user.id}>
              <div
                className={`rounded-48 relative align-middle px-12 py-4 text-body4 flex items-center gap-8  text-gray-700 
                ${getTipColor(voter.amount_voted)}
                `}
              >
                <span className="text-fire font-bold">
                  {numberFormatter(voter.amount_voted)}
                </span>
                sats by
                <Link
                  to={createRoute({
                    type: "profile",
                    id: voter.user.id,
                    username: voter.user.name,
                  })}
                >
                  <Avatar src={voter.user.avatar} width={32} />
                </Link>
              </div>
            </li>
          ))}
          {story.votes.total_anonymous_votes > 0 && (
            <li>
              <div
                className={`rounded-48 relative align-middle px-12 py-4 text-body4 flex items-center gap-8 h-full  text-gray-700 
                ${getTipColor(1)}
                `}
              >
                <span className="text-fire font-bold">
                  {numberFormatter(story.votes.total_anonymous_votes)}
                </span>
                sats anonymously
              </div>
            </li>
          )}
        </ul>
      </section>
      <div id="comments" className="mt-10 comments_col">
        <Suspense
          fallback={
            <div className="flex justify-center py-32">
              <RotatingLines strokeColor="#ddd" width="64" />
            </div>
          }
        >
          <CommentsWidgetRoot
            key={story.id}
            story={{
              id: story.id,
              nostr_event_id: story.nostr_event_id,
              createdAt: story.createdAt,
              author_pubkey: story.author.primary_nostr_key,
            }}
          />
        </Suspense>
      </div>
    </>
  );
}

export default withProviders(RelayPoolProvider)(StoryPageContent);

function getTipColor(amount: number) {
  if (amount > 5000) return "bg-cyan-300/40";
  if (amount > 1000) return "bg-yellow-300/60";
  return "bg-gray-300/60";
}
