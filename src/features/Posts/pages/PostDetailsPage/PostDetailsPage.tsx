import { useLoaderData } from "react-router-dom";
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";
import { PostDetailsQuery, Post_Type } from "src/graphql";
import { capitalize } from "src/utils/helperFunctions";
import ScrollToTop from "src/utils/routing/scrollToTop";
import TrendingCard from "src/features/Posts/Components/TrendingCard/TrendingCard";
import AuthorCard from "./Components/AuthorCard/AuthorCard";
import PageContent from "./Components/PageContent/PageContent";
import PostActions from "./Components/PostActions/PostActions";
import styles from "./styles.module.scss";
import { lazy, Suspense } from "react";
import { RotatingLines } from "react-loader-spinner";
import OgTags from "src/Components/OgTags/OgTags";
import { useMediaQuery } from "src/utils/hooks";
import { MEDIA_QUERIES } from "src/utils/theme";

const CommentsSection = lazy(
  () =>
    import(
      /* webpackChunkName: "comments_section" */ "src/features/Posts/Components/Comments"
    )
);

interface Props {
  postType: "story" | "bounty" | "question";
}

export default function PostDetailsPage(props: Props) {
  const loaderData = useLoaderData() as PostDetailsQuery;

  const type = capitalize(props.postType);

  const post = loaderData.getPostById;

  const isLargeScreen = useMediaQuery(MEDIA_QUERIES.isLarge);

  if (!post) return <NotFoundPage />;

  return (
    <>
      <OgTags title={post.title} description={post.body.slice(0, 50)} />
      <ScrollToTop />
      <div className={`page-container max-md:bg-white`}>
        {isLargeScreen ? (
          <div className="grid w-full grid-cols-[116px_1fr_calc(min(30%,326px))] gap-32">
            <aside className="no-scrollbar fill-container">
              <div className="sticky-side-element">
                <PostActions post={post} />
              </div>
            </aside>
            <main className="flex flex-col gap-32 min-w-0">
              <PageContent post={post} />
              <Suspense
                fallback={
                  <div className="flex justify-center py-32">
                    <RotatingLines strokeColor="#ddd" width="64" />
                  </div>
                }
              >
                <CommentsSection id={post.id} type={type as Post_Type} />
              </Suspense>
            </main>
            <aside className="no-scrollbar min-w-0">
              <div className="flex flex-col gap-32 overflow-y-auto sticky-side-element">
                <AuthorCard author={post.author} />
                <TrendingCard />
              </div>
            </aside>
          </div>
        ) : (
          <div className="flex flex-col gap-32">
            <PageContent post={post} />
            <PostActions post={post} />
            <AuthorCard author={post.author} />
            <Suspense
              fallback={
                <div className="flex justify-center py-32">
                  <RotatingLines strokeColor="#ddd" width="64" />
                </div>
              }
            >
              <CommentsSection id={post.id} type={type as Post_Type} />
            </Suspense>
            <TrendingCard />
          </div>
        )}
      </div>
    </>
  );
}
