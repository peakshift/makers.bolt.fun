import { useMemo } from "react";
import NostrPostCard from "src/features/Posts/Components/NostrPostCard/NostrPostCard";
import { PostCardSkeleton } from "src/features/Posts/Components/PostCard";
import { RelayPoolProvider, useMetaData, useNostrQuery } from "src/lib/nostr";
import { withProviders } from "src/utils/hoc";
import { useTournament } from "../TournamentDetailsPage/TournamentDetailsContext";

type Props = {};

function TournamentFeedPage(props: Props) {
  const {
    pubkeysOfMakersInTournament,
    staticData: { config },
  } = useTournament();

  const filters = useMemo(
    () =>
      config.showFeed
        ? config.feedFilters({ participantsKeys: pubkeysOfMakersInTournament })
        : [],
    [config, pubkeysOfMakersInTournament]
  );

  const { events, isEmpty } = useNostrQuery({
    filters,
  });

  const pubkeysToFetch = useMemo(
    () => events.map((e) => e.pubkey).filter(Boolean) as string[],
    [events]
  );

  const { profilesData } = useMetaData({ pubkeys: pubkeysToFetch });

  const posts = events.filter(
    (event) => !event.tags.some(([tag]) => tag === "e")
  );

  if (isEmpty)
    return (
      <p className="flex py-48 flex-col text-body3 justify-center items-center text-gray-400 text-center col-[1/-1]">
        Nothing found here...
      </p>
    );

  if (posts.length === 0)
    return (
      <div className="flex flex-col gap-24">
        {
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        }
      </div>
    );

  return (
    <div className="flex flex-col gap-24">
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
