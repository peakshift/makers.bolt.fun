import Button from "src/Components/Button/Button";
import { BadgeProgress, UserBadge } from "src/graphql";
import { openModal } from "src/redux/features/modals.slice";
import { useAppDispatch } from "src/utils/hooks";

interface Props {
  userBadge: UserBadge;
  showProgress?: boolean;
  isOwner?: boolean;
}

export default function BadgeCard({ userBadge, showProgress, isOwner }: Props) {
  const dispatch = useAppDispatch();

  const openBadgeModal = () => {
    dispatch(
      openModal({
        Modal: "ViewBadgeModal",
        props: {
          badge: userBadge.badge,
          isOwner,
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
      <div
        className={`border-violet-200 border-2 py-8 px-16 rounded
      ${isCompleted ? "bg-violet-50" : "bg-gray-100"}
      `}
      >
        <div className="flex gap-8">
          <img
            src={userBadge.badge.image}
            alt=""
            className="w-64 h-64 rounded object-contain"
          />
          <div>
            <p className="font-medium">{userBadge.badge.title}</p>
            <p className="font-medium text-body5 text-gray-500">
              {userBadge.badge.description}
            </p>
          </div>
        </div>
        <div>
          <div className="mt-8">
            <div className="relative bg-white h-16 rounded p-[2px] border-2 border-gray-200">
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
            <div className="flex items-center mt-8 gap-8">
              {isCompleted ? (
                <>
                  {!userBadge.progress.badgeAwardNostrEventId && (
                    <Button size="sm" color="primary" variant="text">
                      Request a Nostr Badge 🎖️
                    </Button>
                  )}
                </>
              ) : (
                <p className="text-body5 text-gray-500 mt-8 ml-auto">
                  <span className="sr-only">Progress: </span>
                  {userBadge.progress.current ?? 0} /{" "}
                  {userBadge.progress.totalNeeded ?? 1}
                </p>
              )}
            </div>
            {userBadge.progress.isCompleted && (
              <Button
                color="none"
                className="mt-16 bg-gray-600/10 hover:bg-gray-600/5"
                fullWidth
                newTab
                onClick={openBadgeModal}
                // href={`https://badges.page/b/${userBadge.progress.badgeAwardNostrEventId}`}
              >
                View Badge
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={openBadgeModal}
      className="block w-full bg-gray-100 p-20 rounded h-full"
    >
      <div className="flex flex-col items-center text-center gap-8">
        <img
          src={userBadge.badge.image}
          alt=""
          className="w-64 h-64 rounded object-contain"
        />
        <div>
          <p className="font-medium">{userBadge.badge.title}</p>
          <p className="font-medium text-body5 text-gray-500">
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
