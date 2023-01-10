import { useTagFeedQuery } from "src/graphql";
import { useInfiniteQuery, usePreload } from "src/utils/hooks";
import PostsList from "../../Components/PostsList/PostsList";
import TrendingCard from "../../Components/TrendingCard/TrendingCard";
import styles from "./styles.module.scss";
import Button from "src/Components/Button/Button";
import { capitalize, formatHashtag } from "src/utils/helperFunctions";
import { createRoute } from "src/utils/routing";
import { Link, useLoaderData } from "react-router-dom";
import { useAppDispatch } from "src/utils/hooks";
import { stageStory } from "src/redux/features/staging.slice";
import { LoaderData } from "./tagPage.loader";
import OgTags from "src/Components/OgTags/OgTags";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import DOMPurify from "dompurify";
import { marked } from "marked";

export default function TagPage() {
  const loaderData = useLoaderData() as LoaderData;

  const tagInfo = loaderData.getTagInfo;
  const dispatch = useAppDispatch();

  const feedQuery = useTagFeedQuery({
    variables: {
      take: 10,
      skip: 0,
      sortBy: null,
      tag: loaderData.getTagInfo.id,
    },
  });
  const { fetchMore, isFetchingMore } = useInfiniteQuery(feedQuery, "getFeed");

  usePreload("PostPage");

  const clickWriteStory = () => {
    dispatch(
      stageStory({
        tags: [
          {
            id: tagInfo.id,
            title: tagInfo.title,
          },
        ],
      })
    );
  };

  return (
    <>
      <OgTags
        title={`${capitalize(loaderData.getTagInfo.title)} Stories`}
        description={loaderData.getTagInfo.long_description}
      />
      <div className={`page-container`}>
        <div className={`w-full ${styles.grid}`}>
          <div id="content" className="">
            <PostsList
              isLoading={feedQuery.loading}
              items={feedQuery.data?.getFeed}
              isFetching={isFetchingMore}
              onReachedBottom={fetchMore}
            />
          </div>
          <aside id="categories" className="no-scrollbar">
            <div className="md:overflow-y-scroll sticky-side-element flex flex-col gap-16 md:gap-24">
              <h1 className="text-body2 text-ellipsis overflow-hidden font-bolder">
                {loaderData.getTagInfo.icon}{" "}
                {formatHashtag(loaderData.getTagInfo.title)}
              </h1>
              {loaderData.getTagInfo.long_description && (
                <div className="hidden lg:block">
                  <p className="text-body6 uppercase font-medium text-gray-500 mb-8">
                    DESCRIPTION
                  </p>
                  <div
                    className={`prose text-gray-600 ${styles.tag_desc}`}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        marked.parse(loaderData.getTagInfo.long_description)
                      ),
                    }}
                  ></div>
                </div>
              )}
              {loaderData.getTagInfo.moderators.length > 0 && (
                <div className="hidden lg:block">
                  <p className="text-body6 uppercase font-medium text-gray-500 mb-16">
                    MODERATORS
                  </p>
                  <div className="flex flex-wrap gap-16">
                    {loaderData.getTagInfo.moderators.map((mod) => (
                      <Link
                        key={mod.id}
                        to={createRoute({
                          type: "profile",
                          id: mod.id,
                          username: mod.name,
                        })}
                      >
                        <Avatar src={mod.avatar} width={40} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div className="order-3 md:order-2">
                <Button
                  href={createRoute({
                    type: "write-story",
                    initData: {
                      tags: [loaderData.getTagInfo.title],
                    },
                  })}
                  color="primary"
                  fullWidth
                  onClick={clickWriteStory}
                >
                  Write a story
                </Button>
              </div>
              <div className="order-2 md:order-3"></div>
            </div>
          </aside>
          <aside id="side" className="no-scrollbar">
            <div className="pb-16 flex flex-col gap-24 overflow-y-auto sticky-side-element">
              <TrendingCard />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
