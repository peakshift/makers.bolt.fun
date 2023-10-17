import { useUpdateEffect } from "@react-hookz/web";
import { useState } from "react";
import { useFeedQuery } from "src/graphql";
import { useInfiniteQuery, usePreload } from "src/utils/hooks";
import PostsList from "../../Components/PostsList/PostsList";
import TrendingCard from "../../Components/TrendingCard/TrendingCard";
import { FilterTag } from "./PopularTagsFilter/FeedTagsFilter";
import styles from "./styles.module.scss";
import OgTags from "src/Components/OgTags/OgTags";
import WelcomeNewMaker from "./WelcomeNewMaker/WelcomeNewMaker";
import SkipLink from "src/Components/SkipLink/SkipLink";
import { withProviders } from "src/utils/hoc";
import { RelayPoolProvider } from "src/lib/nostr";
import { RotatingBillboardBig } from "src/Components/Ads/RotatingBillboardBig";
import { useGetRandomBillboardItem } from "./useGetRandomBillboardItem";
import { BIG_BILLBOARD_DATA_ITEMS } from "./ads/big-billboard-data";
import { SMALL_BILLBOARD_DATA_ITEMS } from "./ads/small-billboard-data";
import RotatingBillboardSmall from "src/Components/Ads/RotatingBillboardSmall/RotatingBillboardSmall";

function FeedPage() {
  const [sortByFilter, setSortByFilter] = useState<string | null>("recent");
  const [tagFilter, setTagFilter] = useState<FilterTag | null>(null);

  const randomBigBillboardItem = useGetRandomBillboardItem(
    BIG_BILLBOARD_DATA_ITEMS
  );
  const randomSmallBillboardItem = useGetRandomBillboardItem(
    SMALL_BILLBOARD_DATA_ITEMS,
    {
      intervalInSeconds: 45,
    }
  );

  const feedQuery = useFeedQuery({
    variables: {
      take: 10,
      skip: 0,
      sortBy: sortByFilter,
      tag: tagFilter?.id ?? null,
    },
  });
  const { fetchMore, isFetchingMore, variablesChanged } = useInfiniteQuery(
    feedQuery,
    "getFeed"
  );

  useUpdateEffect(variablesChanged, [sortByFilter, tagFilter]);

  usePreload("PostPage");

  return (
    <>
      <OgTags
        title="BOLT.FUN"
        description="Founders and makers sharing knwoledge and building on bitcoin"
      />
      <SkipLink id="content">Skip To Content</SkipLink>
      <div className={`w-full ${styles.grid}`}>
        <div id="content" className="pt-16 md:pt-0 flex flex-col gap-24">
          <WelcomeNewMaker />
          <PostsList
            isLoading={feedQuery.loading}
            items={feedQuery.data?.getFeed}
            isFetching={isFetchingMore}
            onReachedBottom={fetchMore}
          />
        </div>
        <aside id="side" className="no-scrollbar">
          <div className="pb-16 flex flex-col gap-24 overflow-y-auto sticky-side-element">
            <RotatingBillboardBig content={randomBigBillboardItem} />
            <RotatingBillboardSmall content={randomSmallBillboardItem} />
            <TrendingCard />
          </div>
        </aside>
      </div>
    </>
  );
}

export default withProviders(RelayPoolProvider)(FeedPage);
