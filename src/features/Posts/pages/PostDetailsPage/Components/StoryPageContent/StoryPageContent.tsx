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
import { formatHashtag } from "src/utils/helperFunctions";
import { Link } from "react-router-dom";
import { lazy, RefObject, Suspense, useEffect, useRef, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { RelayPoolProvider } from "src/lib/nostr";
import { withProviders } from "src/utils/hoc";
import { Tooltip } from "react-tooltip";
import Lightbox from "src/Components/Lightbox/Lightbox";

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
            __html: DOMPurify.sanitize(marked.parse(story.body)),
          }}
        ></div>
        <PostImagesLightbox contentDomRef={storyContentDomRef} />
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
              id: story.id,
              nostr_event_id: story.nostr_event_id,
              createdAt: story.createdAt,
            }}
          />
        </Suspense>
      </div>
    </>
  );
}

export default withProviders(RelayPoolProvider)(StoryPageContent);

function PostImagesLightbox({
  contentDomRef,
}: {
  contentDomRef: RefObject<HTMLDivElement>;
}) {
  const [images, setImages] = useState<string[]>([]);
  const [imageOpen, setImageOpen] = useState(-1);

  useEffect(() => {
    const onClick = () => {};
    let idx = 0;

    const listenersToClean: [HTMLImageElement, EventListener][] = [];

    contentDomRef.current?.querySelectorAll("img").forEach((img) => {
      const imageUrl = img.getAttribute("src");
      if (imageUrl) {
        setImages((prev) => [...prev, imageUrl]);
        const _idx = idx;
        const handler = () => {
          setImageOpen(_idx);
        };
        img.classList.add("cursor-pointer");
        img.addEventListener("click", handler);
        listenersToClean.push([img, handler]);

        idx++;
      }
    });

    return () => {
      listenersToClean.forEach(([img, handler]) => {
        img.removeEventListener("click", handler);
      });
    };
  }, [contentDomRef]);

  return (
    <Lightbox
      images={images}
      isOpen={imageOpen !== -1}
      initOpenIndex={imageOpen}
      onClose={() => setImageOpen(-1)}
    />
  );
}
