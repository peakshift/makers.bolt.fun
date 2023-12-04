import { Badge, BadgeProgress, ProfileQuery, UserBadge } from "src/graphql";
import { openModal } from "src/redux/features/modals.slice";
import { useAppDispatch } from "src/utils/hooks";
import { Override } from "src/utils/interfaces";

interface Props {
  username: string;
  userBadge: Override<
    UserBadge,
    {
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
    }
  >;
  nostrKeys?: NonNullable<ProfileQuery["profile"]>["nostr_keys"];
  isOwner: boolean;
}

export default function BadgeCardWithProgress({
  userBadge,
  nostrKeys,
  isOwner,
  username,
}: Props) {
  const dispatch = useAppDispatch();

  const openBadgeModal = () => {
    dispatch(
      openModal({
        Modal: "ViewBadgeModal",
        props: {
          badge: userBadge.badge,
          issuedBadgeMetaData: userBadge.progress?.metaData,
          awardedAt: userBadge.progress?.awardedAt,
          isOwner,
          username,
          nostrKeys,
        },
      })
    );
  };

  if (!userBadge.progress) throw new Error("Progress is null");

  const isCompleted =
    userBadge.progress.isCompleted ||
    (userBadge.progress.current &&
      userBadge.progress.totalNeeded &&
      userBadge.progress.current >= userBadge.progress.totalNeeded);

  return (
    <button
      className={`border-violet-200 border-2 p-20 rounded w-full disabled:opacity-100
        ${isCompleted ? "bg-violet-50 hover:bg-violet-100" : "bg-gray-100"}
        `}
      onClick={openBadgeModal}
      disabled={!isCompleted}
    >
      <div className="flex items-center gap-8">
        <img
          src={userBadge.badge.image}
          alt=""
          className="w-64 h-64 rounded object-contain drop-shadow-md"
        />
        <div className="grow text-left">
          <p className="text-body3 font-medium">{userBadge.badge.title}</p>
          <p className="font-medium text-gray-500">
            {userBadge.badge.description}
          </p>
          {!isCompleted && (
            <div className="mt-8 relative bg-white h-16 rounded p-[2px] border-2 border-gray-200">
              <div
                className={`${
                  isCompleted ? "bg-green-400" : "bg-primary-500"
                } rounded-16 h-full origin-left`}
                style={{
                  width: `${
                    isCompleted
                      ? 100
                      : getProgressPercentage(userBadge.progress) * 100
                  }%`,
                }}
              ></div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-center gap-8">
          {!isCompleted && (
            <p className="text-body5 text-gray-500 font-medium ml-auto">
              <span className="sr-only">Progress: </span>
              {userBadge.progress.current ?? 0} /{" "}
              {userBadge.progress.totalNeeded ?? 1}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

function getProgressPercentage(progress: BadgeProgress) {
  return Math.max(
    Math.min((progress.current ?? 0) / progress.totalNeeded!, 1),
    0.01
  );
}
