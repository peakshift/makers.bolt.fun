import Button from "src/Components/Button/Button";
import { BadgeProgress, UserBadge } from "src/graphql";
import { openModal } from "src/redux/features/modals.slice";
import { addOpacityToHexColor } from "src/utils/helperFunctions";
import { useAppDispatch } from "src/utils/hooks";

interface Props {
  username: string;
  userBadge: UserBadge;
  showProgress?: boolean;
  isOwner: boolean;
}

export default function BadgeCard({
  userBadge,
  showProgress,
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
        },
      })
    );
  };

  if (showProgress) {
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

  return (
    <button
      onClick={openBadgeModal}
      className="block w-full bg-white p-20 rounded h-full relative overflow-hidden isolate border-2 group"
      style={{
        borderColor: addOpacityToHexColor(
          userBadge.badge.color ?? "#e4e7ec",
          0.3
        ),
      }}
    >
      <div
        className="absolute inset-0 -z-10 opacity-20 group-hover:opacity-30"
        style={{
          backgroundColor: userBadge.badge.color ?? "gray",
        }}
      ></div>
      <div className="flex flex-col h-full items-center justify-start text-center gap-8">
        <img
          src={userBadge.badge.image}
          alt=""
          className="w-64 h-64 rounded object-contain drop-shadow-md"
        />
        <div>
          <p className="font-medium text-body4">{userBadge.badge.title}</p>
          <p className="font-medium text-body4 text-gray-600 mt-8 line-clamp-3">
            {userBadge.badge.description}
          </p>
        </div>
      </div>
    </button>
  );
}

function progressNotNull(
  progress: UserBadge["progress"]
): progress is BadgeProgress {
  return Boolean(progress);
}

function getProgressPercentage(progress: BadgeProgress) {
  return Math.max(
    Math.min((progress.current ?? 0) / progress.totalNeeded!, 1),
    0.01
  );
}
