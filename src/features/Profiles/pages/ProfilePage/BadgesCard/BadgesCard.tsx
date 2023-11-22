import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "src/Components/Card/Card";
import { User } from "src/graphql";
import { openModal } from "src/redux/features/modals.slice";
import { toSort } from "src/utils/helperFunctions";
import { useAppDispatch } from "src/utils/hooks";
import BadgeCard from "./BadgeCard";

interface Props {
  username: string;
  isOwner?: boolean;
  badges: User["badges"];
  onlyMd?: boolean;
}

export default function BadgesCard({
  badges,
  isOwner,
  username,
  onlyMd,
}: Props) {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const justMounted = useRef(true);

  const openBadgeSearchParam = searchParams.get("badge");

  const sortedBadgesList = toSort(badges, (b1, b2) => {
    const b1CurrentProgress = b1.progress ? b1.progress.current ?? 0 : 0;
    const b2CurrentProgress = b2.progress ? b2.progress.current ?? 0 : 0;

    const b1TotalNeeded = b1.progress ? b1.progress.totalNeeded : 0;
    const b2TotalNeeded = b2.progress ? b2.progress.totalNeeded : 0;

    const b1ProgressPercentage = b1.progress?.isCompleted
      ? 1
      : b1TotalNeeded
      ? b1CurrentProgress / b1TotalNeeded
      : 0;
    const b2ProgressPercentage = b2.progress?.isCompleted
      ? 1
      : b2TotalNeeded
      ? b2CurrentProgress / b2TotalNeeded
      : 0;

    return b2ProgressPercentage - b1ProgressPercentage;
  });

  useEffect(() => {
    if (justMounted.current) {
      justMounted.current = false;
    } else return;

    if (openBadgeSearchParam) {
      const userBadge = badges.find(
        (b) => b.badge.slug === openBadgeSearchParam
      );

      if (userBadge) {
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
      }
    }
  }, [badges, dispatch, isOwner, openBadgeSearchParam, username]);

  if (badges.length === 0 && !isOwner) return null;

  return (
    <div>
      <p className="text-body2 font-bolder mb-16 text-center">
        🏅 Achievements
      </p>
      {sortedBadgesList.length > 0 && (
        <ul
          className={
            !isOwner
              ? "flex flex-col gap-16"
              : "grid grid-cols-1 md:grid-cols-2 gap-16"
          }
        >
          {sortedBadgesList.map((badge) => (
            <li key={badge.id}>
              <BadgeCard
                userBadge={badge}
                isOwner={!!isOwner}
                username={username}
                showProgress={!isOwner}
              />
            </li>
          ))}
        </ul>
      )}{" "}
    </div>
  );
}
