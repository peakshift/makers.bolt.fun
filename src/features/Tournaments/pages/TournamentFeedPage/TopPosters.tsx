import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import LinkDuo from "src/Components/LinkDuo/LinkDuo";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { NostrProfile } from "src/lib/nostr";
import { useCarousel } from "src/utils/hooks";
import { createRoute } from "src/utils/routing";

interface Props {
  topMakers: NostrProfile[];
}

export default function TopPosters({ topMakers }: Props) {
  const { viewportRef, scrollSlides, canScrollNext, canScrollPrev } =
    useCarousel({
      align: "start",
      slidesToScroll: 2,
      containScroll: "trimSnaps",
    });

  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={viewportRef}>
        <div className="select-none w-full flex gap-16">
          {topMakers.map((profile) => {
            return (
              <LinkDuo
                key={profile.pubkey}
                to={
                  profile.boltfun_id
                    ? createRoute({
                        type: "profile",
                        id: profile.boltfun_id,
                        username: profile.name,
                      })
                    : `https://nostr.guru/p/${profile.pubkey}`
                }
                className="flex flex-col items-center shrink-0 w-[110px] text-center overflow-hidden"
              >
                <Avatar src={profile?.image} width={64} />
                <p className="text-body3 max-w-full text-gray-900 font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                  {profile.name}
                </p>
              </LinkDuo>
            );
          })}
        </div>
      </div>

      <button
        className={`absolute text-body6 w-[28px] aspect-square flex justify-center items-center left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full bg-white text-gray-400 opacity-0 ${
          canScrollPrev && "group-hover:opacity-100"
        } active:scale-90 transition-opacity border border-gray-200 shadow-md`}
        onClick={() => scrollSlides(-1)}
      >
        <FaChevronLeft />
      </button>
      <button
        className={`absolute text-body6 w-[28px] aspect-square flex justify-center items-center right-0 translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full bg-white text-gray-400  opacity-0 ${
          canScrollNext && "group-hover:opacity-100"
        } active:scale-90 transition-opacity border border-gray-200 shadow-md`}
        onClick={() => scrollSlides(1)}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

TopPosters.Skeleton = function TopPostersSkeleton() {
  return (
    <div className="select-none w-full flex gap-16">
      {Array(4)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center shrink-0 w-[110px] text-center overflow-hidden"
          >
            <Skeleton circle width={64} height={64} />
            <p className="text-body3 text-gray-900 font-bold">
              <Skeleton width="7ch" />
            </p>
          </div>
        ))}
    </div>
  );
};
