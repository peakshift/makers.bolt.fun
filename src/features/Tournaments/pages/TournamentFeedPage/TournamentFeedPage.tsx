import { useMemo } from "react";
import NostrPostCard from "src/features/Posts/Components/NostrPostCard/NostrPostCard";
import { PostCardSkeleton } from "src/features/Posts/Components/PostCard";
import { RelayPoolProvider, useMetaData, useNostrQuery } from "src/lib/nostr";
import { getProfileDataFromMetaData } from "src/lib/nostr/helpers";
import { withProviders } from "src/utils/hoc";
import { Filter } from "nostr-tools";
import { CONSTS } from "src/utils";
import { useTournament } from "../TournamentDetailsPage/TournamentDetailsContext";

type Props = {};

// export function getFilters(topic: keyof typeof toipcsToFilters): Filter[] {
//   const baseFilter = { kinds: [1, 30023], limit: 100 };

//   let filters: Filter[] = [];
//   if (toipcsToFilters[topic].hashtags)
//     filters.push({ ...baseFilter, "#t": toipcsToFilters[topic].hashtags });
//   if (toipcsToFilters[topic].pubkey)
//     filters.push({ ...baseFilter, authors: toipcsToFilters[topic].pubkey });

//   return filters;
// }

function TournamentFeedPage(props: Props) {
  const {
    pubkeysOfMakersInTournament,
    staticData: {
      config: { tournamentHashtags },
    },
  } = useTournament();
  console.log(pubkeysOfMakersInTournament, CONSTS.BF_NOSTR_PUBKEY);

  const filters = useMemo(
    () =>
      [
        {
          kinds: [1, 30023],
          limit: 100,
          "#t": tournamentHashtags.map((hashtag) => hashtag.toLowerCase()),
          authors: pubkeysOfMakersInTournament,
        },
        {
          kinds: [1, 30023],
          limit: 100,
          "#t": tournamentHashtags.map((hashtag) => hashtag.toLowerCase()),
          authors: [CONSTS.BF_NOSTR_PUBKEY],
        },
      ] as Filter[],
    [pubkeysOfMakersInTournament, tournamentHashtags]
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
