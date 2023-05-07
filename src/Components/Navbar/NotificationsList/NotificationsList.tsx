import { MenuItem } from "@szhsin/react-menu";
import dayjs from "dayjs";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import Button from "src/Components/Button/Button";
import { Notification } from "src/features/Notifications/useNotifications";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { trimText } from "src/utils/helperFunctions";
import { createRoute } from "src/utils/routing";

interface Props {
  noKeyConnected: boolean;
  isLoadingNotifications: boolean;
  notifications: Notification[];
}

const RENDER_PER_PAGE = 5;

export default function NotificationsList({
  isLoadingNotifications,
  noKeyConnected,
  notifications,
}: Props) {
  const [numberOfEventsToRender, setNumberOfEventsToRender] =
    useState(RENDER_PER_PAGE);

  const navigate = useNavigate();

  if (noKeyConnected)
    return (
      <div className="flex flex-col items-center py-16 gap-16">
        <p className="text-gray-600 text-center ">
          To see notifications, please link your nostr public key firts.
        </p>
        <Button
          href={createRoute({ type: "edit-profile", tab: "nostr" })}
          size="sm"
          color="primary"
        >
          Link Nostr Key <span aria-hidden>🔑</span>
        </Button>
      </div>
    );

  if (isLoadingNotifications)
    return (
      <div aria-label="Loading">
        <MenuItem className="!p-16 flex gap-16 hover:bg-gray-100 !rounded-12 text-body5 ">
          <div className="flex gap-16 items-start w-full">
            <Skeleton circle width="32px" height="32px" />
            <div className="flex-1">
              <p className="text-gray-900 font-bold ">
                <Skeleton width="80%" />
              </p>
              <p className="text-body6 text-gray-500 font-medium">
                <Skeleton width="5ch" />
              </p>
              <p className="line-clamp-2 text-gray-600 mt-4">
                <Skeleton /> <Skeleton />
              </p>
            </div>
          </div>
        </MenuItem>
        <MenuItem className="!p-16 flex gap-16 hover:bg-gray-100 !rounded-12 text-body5 ">
          <div className="flex gap-16 items-start w-full">
            <Skeleton circle width="32px" height="32px" />
            <div className="flex-1">
              <p className="text-gray-900 font-bold ">
                <Skeleton width="80%" />
              </p>
              <p className="text-body6 text-gray-500 font-medium">
                <Skeleton width="5ch" />
              </p>
              <p className="line-clamp-2 text-gray-600 mt-4">
                <Skeleton /> <Skeleton />
              </p>
            </div>
          </div>
        </MenuItem>
      </div>
    );

  if (!isLoadingNotifications && notifications.length === 0)
    return (
      <div
        className="flex flex-col items-center py-16 gap-16"
        aria-label="notifications empty"
      >
        <p className="text-gray-600 text-center ">Nothing to be seen here...</p>
      </div>
    );

  return (
    <>
      {notifications.slice(0, numberOfEventsToRender).map((notification) => (
        <MenuItem
          key={notification.id}
          href={notification.url}
          onClick={(e) => {
            e.syntheticEvent.preventDefault();
            navigate(new URL(notification.url).pathname);
          }}
          className="!p-16 flex gap-16 hover:bg-gray-100 !rounded-12 text-body5"
        >
          {notification.type === "comment-on-post" && (
            <div className="flex gap-16 items-start w-full">
              <Avatar src={notification.user.image} width={32} />
              <div className="min-w-0">
                <p className="text-gray-900 font-bold ">
                  {trimText(notification.user.name, 12)} commented on your post
                </p>
                <p className="text-body6 text-gray-500 font-medium">
                  {dayjs(notification.created_at * 1000).from(new Date())}
                </p>
                <p className="line-clamp-2 text-gray-600 mt-4">
                  {notification.commentText}
                </p>
              </div>
            </div>
          )}
          {notification.type === "reply-on-comment" && (
            <div className="flex gap-16 items-start w-full">
              <Avatar src={notification.user.image} width={32} />
              <div className="min-w-0">
                <p className="text-gray-900 font-bold ">
                  {trimText(notification.user.name, 12)} replied on your comment
                </p>
                <p className="text-body6 text-gray-500 font-medium">
                  {dayjs(notification.created_at * 1000).from(new Date())}
                </p>
                <p className="line-clamp-2 text-gray-600 mt-4">
                  {notification.replyText}
                </p>
              </div>
            </div>
          )}
          {notification.type === "mention-in-post" && (
            <div className="flex gap-16 items-start w-full">
              <Avatar src={notification.user.image} width={32} />
              <div className="min-w-0">
                <p className="text-gray-900 font-bold ">
                  {trimText(notification.user.name, 12)} mentioned you in a post
                </p>
                <p className="text-body6 text-gray-500 font-medium">
                  {dayjs(notification.created_at * 1000).from(new Date())}
                </p>
                <p className="line-clamp-2 text-gray-600 mt-4">
                  {notification.postTitle}
                </p>
              </div>
            </div>
          )}
        </MenuItem>
      ))}
      {notifications.length > numberOfEventsToRender && (
        <Button
          color="gray"
          variant="text"
          fullWidth
          onClick={() => setNumberOfEventsToRender((v) => v + RENDER_PER_PAGE)}
        >
          Load More
        </Button>
      )}
    </>
  );
}
