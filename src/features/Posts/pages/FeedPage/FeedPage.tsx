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

type NavItem = {
  href: string;
  icon: string;
  text: string;
  badge?: {
    text: string;
    color: string;
  };
};

function FeedPage() {
  const [sortByFilter, setSortByFilter] = useState<string | null>("recent");
  const [tagFilter, setTagFilter] = useState<FilterTag | null>(null);
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    console.log("Changed");
  }, [feedQuery.data?.getFeed]);

  const { postsToComments } = useFeedComments({
    posts: (feedQuery.data?.getFeed ?? []) as Story[],
  });

  const isNewUser =
    userJoinDate && dayjs(Date.now()).diff(userJoinDate, "hours") <= 24;

  const navItems: NavItem[] = [
    {
      href: '/feed',
      icon: '🏠',
      text: 'Home',
    },
    {
      href: '/t/cubo+',
      icon: '➕',
      text: 'CUBO+',
    },
    {
      href: '/topics',
      icon: '🏷️',
      text: 'Topics',
    },
    {
      href: '/hangout',
      icon: '🔊',
      text: 'Hangout',
      badge: {
        text: 'LIVE',
        color: 'red',
      },
    },
    {
      href: '/projects',
      icon: '🚀',
      text: 'Launched Projects',
    },
    {
      href: '/projects/wip',
      icon: '🚧',
      text: 'Work In Progress',
    },
    {
      href: '/tournaments/2/overview',
      icon: '🦩',
      text: '#NostrHack',
    },
    {
      href: '/tournaments/1/overview',
      icon: '🏆',
      text: '#LegendsOfLightning',
    },
    {
      href: 'mailto:team@peakshift.com',
      icon: '💬',
      text: 'Host a hackathon',
    },
    {
      href: 'https://www.figma.com/file/73tOKOOvZD8iN3qP9Cr18E/BOLT%F0%9F%94%A9FUN?node-id=878-150109&t=aRcywwDisNlwZfPF-0',
      icon: '🎨',
      text: 'View in Figma',
    },
    {
      href: 'http://github.com/peakshift/makers.bolt.fun',
      icon: '🐙',
      text: 'View source',
    },
  ];
  return (
    <>
      <OgTags
        title="BOLT.FUN"
        description="Founders and makers sharing knwoledge and building on bitcoin"
      />
      <SkipLink id="content">Skip To Content</SkipLink>
      <div className={`page-container`}>
        <div className={`w-full ${styles.grid}`}>
          <aside id="categories" className="no-scrollbar">
            <div className="md:overflow-y-scroll sticky-side-element flex flex-col gap-16 md:gap-24">
              <ul className="flex flex-col gap-8 mb-16">
                {navItems.map((item) => (
                  <li className="group" key={item.href}>
                    <a
                      className="flex items-start rounded-8 cursor-pointer font-bold active:scale-95 group-hover:bg-gray-100 transition-transform group-hover:bg-gray-100"
                      href={item.href}
                    >
                      <span className="bg-gray-50 group-hover:bg-gray-100 rounded-8 w-40 h-40 text-center py-8">
                        {item.icon}
                        {item.badge && (
                          <span
                            className={`absolute -top-3 -right-36 font-medium text-xs leading-5 rounded px-2 py-0.1 bg-${item.badge.color}-400/10 text-${item.badge.color}-600`}
                          >
                            {item.badge.text}
                          </span>
                        )}
                      </span>
                      <span className="self-center px-8">{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
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
                        Follow BOLT.FUN on Nostr for the latest 🔥 noosts from the community!
                      </p>
                    </div>
                  </div>
                </div>
              </a>
              <TrendingCard />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default withProviders(RelayPoolProvider)(FeedPage);