import { useUpdateEffect } from "@react-hookz/web";
import { useState } from "react";
import { useFeedQuery, useTagFeedQuery } from "src/graphql";
import { useInfiniteQuery, usePreload } from "src/utils/hooks";
import PostsList from "../../Components/PostsList/PostsList";
import TrendingCard from "../../Components/TrendingCard/TrendingCard";
import styles from "./styles.module.scss";
import { Helmet } from "react-helmet";
import Button from "src/Components/Button/Button";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { capitalize, formatHashtag } from "src/utils/helperFunctions";
import { createRoute, PAGES_ROUTES } from "src/utils/routing";
import { Link, useLoaderData } from "react-router-dom";
import { useAppDispatch } from "src/utils/hooks";
import { stageStory } from "src/redux/features/staging.slice";
import { LoaderData } from "./tagPage.loader";
import IconButton from "src/Components/IconButton/IconButton";

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
      <Helmet>
        <title>{`${loaderData.getTagInfo.title} Stories`}</title>
        <meta
          property="og:title"
          content={`${loaderData.getTagInfo.title} Stories`}
        />
      </Helmet>
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
              <h1 className="text-body2 font-bolder">
                {loaderData.getTagInfo.icon}{" "}
                {formatHashtag(loaderData.getTagInfo.title)}
              </h1>
              {loaderData.getTagInfo.description && (
                <p>{loaderData.getTagInfo.description}</p>
              )}
              <div className="order-3 md:order-2">
                <Button
                  href={createRoute({ type: "write-story" })}
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
              <a
                href="https://discord.gg/HFqtxavb7x"
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className="min-h-[248px] text-white flex flex-col justify-end p-24 rounded-12 relative overflow-hidden"
                  style={{
                    backgroundImage: `url("/assets/images/join-discord-card.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute bg-black inset-0 opacity-10"></div>
                  <div className="relative flex flex-col gap-24">
                    <div className="flex flex-col gap-8 text-white">
                      <img
                        src={"assets/icons/join-discord.svg"}
                        className="h-48 max-w-full self-start"
                        alt=""
                      />
                      <p className="text-body2 font-bold">BOLT🔩FUN Discord</p>
                      <p className="text-body4 font-medium">
                        Join the Bolt.Fun Community Discord server and connect
                        with other like minded developers!
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
