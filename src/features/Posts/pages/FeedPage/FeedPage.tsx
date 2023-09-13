import { useUpdateEffect } from "@react-hookz/web";
import { useState, useEffect } from "react";
import { useFeedQuery } from "src/graphql";
import { useInfiniteQuery, usePreload } from "src/utils/hooks";
import PostsList from "../../Components/PostsList/PostsList";
import TrendingCard from "../../Components/TrendingCard/TrendingCard";
import { FilterTag } from "./PopularTagsFilter/FeedTagsFilter";
import styles from "./styles.module.scss";
import { useAppDispatch } from "src/utils/hooks";
import OgTags from "src/Components/OgTags/OgTags";
import WelcomeNewMaker from "./WelcomeNewMaker/WelcomeNewMaker";
import SkipLink from "src/Components/SkipLink/SkipLink";
import { withProviders } from "src/utils/hoc";
import { RelayPoolProvider } from "src/lib/nostr";
import { Fulgur } from "src/Components/Ads/Fulgur";
import { BillboardTemplate } from "src/Components/Ads/BillboardTemplate";

const billboards = [
  {
    campaign: 'LegendsOfLightning',
    bgImage: 'url(https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/c1ab5b6c-b93f-4d28-895d-3255f9102900/original)',
    bgColor: 'bg-[#0A0E1F]',
    textColor: 'text-white',
    logo: 'https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/527eb000-0477-4eb6-e8bd-be7ffb044c00/original',
    title: '2.5 BTC in prizes to build on Lightning',
    description: 'Second edition of the most legendary bitcoin hackathon!',
    cta: '🏆 View Tournament',
    href: '/tournaments/legends-of-lightning-vol2',
  },
  {
    campaign: 'NostrasiaHackathon',
    bgImage: 'url(https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/833eb817-cfb1-4759-7468-b1c58e59ad00/original)',
    bgColor: 'bg-[#5B0A8E]',
    textColor: 'text-white',
    logo: 'https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/671ae048-d426-4697-c680-6c270f106600/original',
    title: '$4000 in prizes to build on Nostr',
    description: 'Build tools, marketplaces, or bring your community to Nostr from 3rd Oct - 3rd Nov',
    cta: '🏆 View Tournament',
    href: '/tournaments/nostrasia',
  },
];

const getRandomIndex = <T extends any[]>(arr: T) => Math.floor(Math.random() * arr.length);

function FeedPage() {
  const [sortByFilter, setSortByFilter] = useState<string | null>("recent");
  const [tagFilter, setTagFilter] = useState<FilterTag | null>(null);
  const [billboard, setBillboard] = useState(billboards[0]);

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
  const generateRandomData = () => {
    const randomIndex = getRandomIndex(billboards);
    setBillboard(billboards[randomIndex]);
  };

  useUpdateEffect(variablesChanged, [sortByFilter, tagFilter]);

  usePreload("PostPage");

  useEffect(() => {
    generateRandomData();
  }, []);

  useUpdateEffect(() => {
    const intervalId = setInterval(() => {
      generateRandomData();
    }, 90000); // 180000 ms = 3 mins

    return () => {
      clearInterval(intervalId);
    };
  }, [billboard]);

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
            <BillboardTemplate
              campaign={billboard.campaign}
              bgImage={billboard.bgImage}
              bgColor={billboard.bgColor}
              textColor={billboard.textColor}
              logo={billboard.logo}
              title={billboard.title}
              description={billboard.description}
              cta={billboard.cta}
              href={billboard.href}
            />
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
