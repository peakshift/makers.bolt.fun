import { useUpdateEffect } from "@react-hookz/web";
import { useEffect, useState } from "react";
import { Story, useFeedQuery } from "src/graphql";
import { useAppSelector, useInfiniteQuery, usePreload } from "src/utils/hooks";
import PostsList from "../../Components/PostsList/PostsList";
import TrendingCard from "../../Components/TrendingCard/TrendingCard";
import FeedTagsFilter, { FilterTag } from "./PopularTagsFilter/FeedTagsFilter";
import SortBy from "./SortBy/SortBy";
import styles from "./styles.module.scss";
import Button from "src/Components/Button/Button";
import { FiArrowRight } from "react-icons/fi";
import { capitalize, randomItem } from "src/utils/helperFunctions";
import { createRoute, PAGES_ROUTES } from "src/utils/routing";
import { useAppDispatch } from "src/utils/hooks";
import { stageStoryEdit } from "src/redux/features/staging.slice";
import OgTags from "src/Components/OgTags/OgTags";
import WelcomeNewMaker from "./WelcomeNewMaker/WelcomeNewMaker";
import dayjs from "dayjs";
import SkipLink from "src/Components/SkipLink/SkipLink";
import { useFeedComments } from "./useFeedComments";
import { withProviders } from "src/utils/hoc";
import { RelayPoolProvider } from "src/lib/nostr";
import { SideNavigation } from "src/Components/SideNavigation/SideNavigationContext";

function FeedPage() {
  const [sortByFilter, setSortByFilter] = useState<string | null>("recent");
  const [tagFilter, setTagFilter] = useState<FilterTag | null>(null);
  const userJoinDate = useAppSelector((s) => s.user.me?.join_date);

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

  const { postsToComments } = useFeedComments({
    posts: (feedQuery.data?.getFeed ?? []) as Story[],
  });

  const isNewUser =
    userJoinDate && dayjs(Date.now()).diff(userJoinDate, "hours") <= 24;

  return (
    <>
      <OgTags
        title="BOLT.FUN"
        description="Founders and makers sharing knwoledge and building on bitcoin"
      />
      <SkipLink id="content">Skip To Content</SkipLink>
      <div className={`w-full ${styles.grid}`}>
        <div id="content" className="pt-16 md:pt-0 flex flex-col gap-24">
          {(isNewUser || true) && <WelcomeNewMaker />}
          <PostsList
            isLoading={feedQuery.loading}
            items={feedQuery.data?.getFeed}
            isFetching={isFetchingMore}
            onReachedBottom={fetchMore}
            postsToComments={postsToComments}
          />
        </div>
        <aside id="side" className="no-scrollbar">
          <div className="pb-16 flex flex-col gap-24 overflow-y-auto sticky-side-element">
            <a
              href="https://snort.social/p/npub1funq0ywh32faz0sf7xt97japu8uk687tsysj8gndj4ehe825sq4s70gs0p"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className="text-white flex flex-col justify-end p-24 rounded-12 relative overflow-hidden"
                style={{
                  backgroundImage: `url("/assets/images/join-discord-card.jpg")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute bg-black inset-0 opacity-10"></div>
                <div className="relative flex flex-col gap-24">
                  <div className="flex flex-col gap-8 text-white">
                    <p className="text-body2 font-bold">BOLT🔩FUN Nostr</p>
                    <p className="text-body4 font-medium">
                      Follow BOLT.FUN on Nostr for the latest 🔥 noosts from the
                      community!
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <TrendingCard />
          </div>
        </aside>
      </div>
    </>
  );
}

export default withProviders(RelayPoolProvider)(FeedPage);
