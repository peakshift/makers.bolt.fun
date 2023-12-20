import { Badge, BadgeProgress } from "src/graphql";
import { openModal } from "src/redux/features/modals.slice";
import { addOpacityToHexColor } from "src/utils/helperFunctions";
import { useAppDispatch } from "src/utils/hooks";

interface Props {
  badge: Pick<
    Badge,
    | "id"
    | "title"
    | "slug"
    | "color"
    | "image"
    | "description"
    | "winningDescriptionTemplate"
  >;
  username: string;
  useBadgeProgress?: Pick<
    BadgeProgress,
    "metaData" | "awardedAt" | "badgeAwardNostrEventId"
  > | null;
  onClick?: () => void;
}

export default function BadgeCard({
  badge,
  useBadgeProgress,
  username,
  onClick,
}: Props) {
  const dispatch = useAppDispatch();

  const openBadgeModal = () => {
    dispatch(
      openModal({
        Modal: "ViewBadgeModal",
        props: {
          badge: badge,
          issuedBadgeMetaData: useBadgeProgress?.metaData,
          awardedAt: useBadgeProgress?.awardedAt,
          badgeAwardNostrEventId: useBadgeProgress?.badgeAwardNostrEventId,
          isOwner: false,
          username,
        },
      })
    );
  };

  const handleClick = () => {
    if (onClick) return onClick();
    openBadgeModal();
  };

  return (
    <button
      onClick={handleClick}
      className="block w-full bg-white p-20 rounded h-full relative overflow-hidden isolate border-2 group"
      style={{
        borderColor: addOpacityToHexColor(badge.color ?? "#e4e7ec", 0.3),
      }}
    >
      <div
        className="absolute inset-0 -z-10 opacity-20 group-hover:opacity-30"
        style={{
          backgroundColor: badge.color ?? "gray",
        }}
      ></div>
      <div className="flex flex-col h-full items-center justify-start text-center gap-8">
        <img
          src={badge.image}
          alt=""
          className="w-64 h-64 rounded object-contain drop-shadow-md"
        />
        <div>
          <p className="font-medium text-body4">{badge.title}</p>
          <p className="font-medium text-body4 text-gray-600 mt-8 line-clamp-3">
            {badge.description}
          </p>
        </div>
      </div>
    </button>
  );
}
