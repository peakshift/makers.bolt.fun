import { useParams } from "react-router-dom";
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import { Post_Type, usePostDetailsQuery } from "src/graphql";
import ScrollToTop from "src/utils/routing/scrollToTop";
import TrendingCard from "src/features/Posts/Components/TrendingCard/TrendingCard";
import AuthorCard from "./Components/AuthorCard/AuthorCard";
import PageContent from "./Components/PageContent/PageContent";
import PostActions from "./Components/PostActions/PostActions";
import OgTags from "src/Components/OgTags/OgTags";
import { useMediaQuery } from "src/utils/hooks";
import { MEDIA_QUERIES } from "src/utils/theme";
import LoadingPage from "src/Components/LoadingPage/LoadingPage";

interface Props {
  postType: Post_Type;
}

export default function PostDetailsPage(props: Props) {
  const { slug } = useParams();

  const id = Number(
    slug?.includes("--") ? slug.slice(slug.lastIndexOf("--") + 2) : slug
  );

  const { data, loading } = usePostDetailsQuery({
    variables: {
      id,
      type: props.postType,
    },
  });

  const isLargeScreen = useMediaQuery(MEDIA_QUERIES.isMinLarge);

  if (loading) return <LoadingPage />;

  const post = data?.getPostById;
  if (!post) return <NotFoundPage />;

  return (
    <>
      <OgTags title={post.title} description={post.excerpt} />
      <ScrollToTop />
      <div className={`page-container max-md:bg-white`}>
        {isLargeScreen ? (
          <div className="grid w-full grid-cols-[116px_1fr_calc(min(30%,326px))] gap-32">
            <aside className="no-scrollbar fill-container">
              <div className="sticky-side-element">
                <PostActions post={post} total_votes={post.votes.total} />
              </div>
            </aside>
            <main className="flex flex-col gap-32 min-w-0">
              <PageContent post={post} />
            </main>
            <aside className="no-scrollbar min-w-0">
              <div className="flex flex-col gap-32 overflow-y-auto sticky-side-element">
                {post.author && <AuthorCard author={post.author} />}
                <TrendingCard />
              </div>
            </aside>
          </div>
        ) : (
          <div className="flex flex-col gap-32">
            <PageContent post={post} />
            <PostActions post={post} total_votes={post.votes.total} />
            {post.author && <AuthorCard author={post.author} />}
            <TrendingCard />
          </div>
        )}
      </div>
    </>
  );
}
