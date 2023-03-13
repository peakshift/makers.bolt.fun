import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import NostrPostCard from "src/features/Posts/Components/NostrPostCard/NostrPostCard";
import { PostCardSkeleton } from "src/features/Posts/Components/PostCard";
import { RelayPoolProvider, useMetaData, useNostrQuery } from "src/lib/nostr";
import { withProviders } from "src/utils/hoc";
import { createRoute } from "src/utils/routing";
import { useTournament } from "../TournamentDetailsPage/TournamentDetailsContext";
import TopPosters from "./TopPosters";

type Props = {};

function TournamentFeedPage(props: Props) {
  const {
    pubkeysOfMakersInTournament,
    pubkeysOfProjectsInTournament,
    staticData: { config },
  } = useTournament();

  const filters = useMemo(
    () =>
      config.showFeed
        ? config.feedFilters({
            participantsKeys: pubkeysOfMakersInTournament,
            projectsKeys: pubkeysOfProjectsInTournament,
          })
        : [],
    [config, pubkeysOfMakersInTournament, pubkeysOfProjectsInTournament]
  );

  const { events, isEmpty } = useNostrQuery({
    filters,
    sortEvents: true,
  });

  const pubkeysToFetch = useMemo(
    () => events.map((e) => e.pubkey).filter(Boolean) as string[],
    [events]
  );

  const { profilesData } = useMetaData({ pubkeys: pubkeysToFetch });

  const posts = events.filter(
    (event) => !event.tags.some(([tag]) => tag === "e")
  );

  if (!config.showFeed) return null;

  if (isEmpty)
    return (
      <p className="flex py-48 flex-col text-body3 justify-center items-center text-gray-400 text-center col-[1/-1]">
        Nothing found here...
      </p>
    );

  if (posts.length === 0)
    return (
      <div className="flex flex-col gap-24">
        <div className="flex flex-col gap-12">
          <h2 className="text-body1 font-bolder text-gray-900">
            <Skeleton width="17ch" />
          </h2>
          <p>
            <Skeleton width="100%" />
            <Skeleton width="45%" />
          </p>

          <TopPosters.Skeleton />
        </div>
        {
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        }
      </div>
    );

  const topMakers = posts.reduce(
    (acc, post) => ({ ...acc, [post.pubkey]: 1 + (acc[post.pubkey] ?? 0) }),
    {} as Record<string, number>
  );

  const topMakersSorted = Object.entries(topMakers)
    .sort((a, b) => b[1] - a[1])
    .map(([pubkey]) => profilesData[pubkey])
    .filter(Boolean);
  return (
    <div className="flex flex-col gap-24 pb-24">
      <div className="flex flex-col gap-12">
        <h2 className="text-body1 font-bolder text-gray-900">
          #{config.mainFeedHashtag} Wall
        </h2>
        <p>
          Connect with other hackathon participants on Nostr during the
          Hackathon. Go to profile settings and{" "}
          <Link
            to={createRoute({ type: "edit-profile", tab: "nostr" })}
            className="underline text-primary-500"
          >
            link your Nostr account
          </Link>{" "}
          to your bolt.fun profile. Then, you can start using{" "}
          <span className="font-bold">#{config.mainFeedHashtag}</span> when you
          post & your post should appear here.{" "}
        </p>
        {topMakersSorted.length > 0 ? (
          <TopPosters topMakers={topMakersSorted} />
        ) : (
          <TopPosters.Skeleton />
        )}
      </div>
      {posts.map((post) => (
        <NostrPostCard
          key={post.id}
          post={post}
          author={profilesData[post.pubkey]}
        />
      ))}
    </div>
  );
}

export default withProviders(RelayPoolProvider)(TournamentFeedPage);
