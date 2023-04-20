import { useParams } from "react-router-dom";
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import ScrollToTop from "src/utils/routing/scrollToTop";
import TrendingCard from "src/features/Posts/Components/TrendingCard/TrendingCard";
import PageContent from "./Components/PageContent/PageContent";
import PostActions from "./Components/PostActions/PostActions";
import { Suspense, useMemo } from "react";
import { RotatingLines } from "react-loader-spinner";
import OgTags from "src/Components/OgTags/OgTags";
import { useMediaQuery } from "src/utils/hooks";
import { MEDIA_QUERIES } from "src/utils/theme";
import {
  RelayPoolProvider,
  useMetaData,
  useNostrQueryList,
} from "src/lib/nostr";
import { extractArticleFields } from "src/lib/nostr/helpers";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostDetailsPageSkeleton from "./PostDetailsPage.skeleton";
import { nip19 } from "nostr-tools";
import { withProviders } from "src/utils/hoc";

dayjs.extend(relativeTime);

interface Props {}

function NostrPostDetailsPage(props: Props) {
  const params = useParams();

  const filters = useMemo(() => [{ ids: [params.id ?? ""] }], [params.id]);

  const { events, isEmpty } = useNostrQueryList({
    filters,
  });

  const pubkeysUsed = useMemo(
    () => [...events.map((e) => e.pubkey)].filter(Boolean) as string[],
    [events]
  );

  const { profilesData } = useMetaData({ pubkeys: pubkeysUsed });

  const isLargeScreen = useMediaQuery(MEDIA_QUERIES.isMinLarge);

  if (isEmpty) return <NotFoundPage />;

  if (events.length === 0) return <PostDetailsPageSkeleton />;

  const post = {
    ...events[0],
    content: replaceMentionsWithLinks(events[0].content, events[0].tags),
  };
  const articleFields = extractArticleFields(post);
  const author = profilesData[post.pubkey];

  return (
    <>
      <OgTags
        title={articleFields.title ?? post.content.slice(0, 25)}
        description={articleFields.summary ?? post.content.slice(0, 50)}
      />
      <ScrollToTop />
      <div className={`page-container max-md:bg-white`}>
        {isLargeScreen ? (
          <div className="grid w-full grid-cols-[116px_1fr_calc(min(30%,326px))] gap-32">
            <aside className="no-scrollbar fill-container">
              <PostActions />
            </aside>
            <main className="flex flex-col gap-32 min-w-0">
              <PageContent
                author={author}
                post={post}
                articleFields={articleFields}
              />
              <Suspense
                fallback={
                  <div className="flex justify-center py-32">
                    <RotatingLines strokeColor="#ddd" width="64" />
                  </div>
                }
              >
                {/* <CommentsSection id={post.id} type={type as Post_Type} /> */}
              </Suspense>
            </main>
            <aside className="no-scrollbar min-w-0">
              <div className="flex flex-col gap-32 overflow-y-auto sticky-side-element">
                {/* <AuthorCard author={post.author} /> */}
                <TrendingCard />
              </div>
            </aside>
          </div>
        ) : (
          <div className="flex flex-col gap-32">
            <PageContent
              author={author}
              post={post}
              articleFields={articleFields}
            />
            <PostActions />
            {/* <AuthorCard author={post.author} /> */}

            <TrendingCard />
          </div>
        )}
      </div>
    </>
  );
}

export function replaceMentionsWithLinks(content: string, tags: string[][]) {
  return content.replace(/#\[([0-9]+)\]/g, (...params) => {
    const group1 = params[1];
    const match = params[0];
    if (!Number.isInteger(Number(group1)) || !tags[Number(group1)])
      return match;

    if (tags[Number(group1)][0] === "p") {
      const pubkey = tags[Number(group1)][1];
      const npub = nip19.npubEncode(pubkey);
      return `[${npub.slice(0, 9)}...${npub.slice(
        -5
      )}](https://www.nostr.guru/p/${pubkey})`;
    }
    if (tags[Number(group1)][0] === "e") {
      const eventId = tags[Number(group1)][1];
      const note = nip19.noteEncode(eventId);
      return `[${note.slice(0, 8)}...](https://www.nostr.guru/e/${eventId})`;
    }
    return match;
  });
}

export default withProviders(RelayPoolProvider)(NostrPostDetailsPage);
