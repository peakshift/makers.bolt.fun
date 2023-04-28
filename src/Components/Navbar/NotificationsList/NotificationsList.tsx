import { FocusableItem, Menu, MenuItem } from "@szhsin/react-menu";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import Button from "src/Components/Button/Button";
import { useNotifications } from "src/features/Notifications/useNotifications";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { useUpdateLastSeenNotificationTimeMutation } from "src/graphql";
import { updateMeData } from "src/redux/features/user.slice";
import { trimText } from "src/utils/helperFunctions";
import { useAppDispatch, useMyUser } from "src/utils/hooks";
import { createRoute } from "src/utils/routing";

interface Props {
  renderOpenListButton: (args: {
    hasNewNotifications?: boolean;
  }) => JSX.Element;
  menuClassName?: string;
}

const RENDER_PER_PAGE = 5;

export default function NotificationsList(props: Props) {
  const dispatch = useAppDispatch();
  const myUser = useMyUser();

  const { notifications, isEmpty } = useNotifications({
    pubkey: myUser.primary_nostr_key,
  });
  const [numberOfEventsToRender, setNumberOfEventsToRender] =
    useState(RENDER_PER_PAGE);

  const navigate = useNavigate();

  const lastSeenNotificationUnixTime =
    Date.parse(myUser.last_seen_notification_time) / 1000;

  const [
    updateLastSeenNotificationTimeMutation,
    { loading: isUpdatingLastSeenTime },
  ] = useUpdateLastSeenNotificationTimeMutation();

  if (!myUser.primary_nostr_key)
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

  const isLoading = notifications.length === 0 && !isEmpty;

  if (isLoading)
    return (
      <Menu
        align="end"
        arrow
        menuClassName={props.menuClassName}
        menuButton={props.renderOpenListButton({})}
        aria-label="Notifications"
      >
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
      </Menu>
    );

  if (!isLoading && notifications.length === 0)
    return (
      <div
        className="flex flex-col items-center py-16 gap-16"
        aria-label="notifications empty"
      >
        <p className="text-gray-600 text-center ">Nothing to be seen here...</p>
      </div>
    );

  const hasNewNotifications =
    notifications[0].created_at > lastSeenNotificationUnixTime;

  const onSeenNotifications = () => {
    if (!hasNewNotifications) return;
    if (isUpdatingLastSeenTime) return;

    updateLastSeenNotificationTimeMutation({
      variables: {
        timestamp: new Date(notifications[0].created_at * 1000).toISOString(),
      },
      onCompleted: (data) => {
        if (data.updateLastSeenNotificationTime)
          dispatch(
            updateMeData({
              last_seen_notification_time:
                data.updateLastSeenNotificationTime.last_seen_notification_time,
            })
          );
      },
    });
  };

  return (
    <Menu
      align="end"
      arrow
      menuClassName={props.menuClassName}
      menuButton={props.renderOpenListButton({ hasNewNotifications })}
      aria-label="Notifications List"
    >
      <NotificationsSeen onNotificationsSeen={onSeenNotifications} />
      {notifications.slice(0, numberOfEventsToRender).map((notification) => {
        const isNew = notification.created_at > lastSeenNotificationUnixTime;
        return (
          <MenuItem
            key={notification.id}
            href={notification.url}
            onClick={(e) => {
              e.syntheticEvent.preventDefault();
              navigate(new URL(notification.url).pathname);
            }}
            className={`!p-16 flex gap-16 !rounded-12 text-body5 focus:ring ${
              isNew ? "bg-orange-100 hover:bg-orange-200" : "hover:bg-gray-100 "
            }`}
          >
            {isNew && <p className="sr-only">New Notification</p>}
            {notification.type === "comment-on-post" && (
              <div className="flex gap-16 items-start w-full">
                <Avatar src={notification.user.image} width={32} />
                <div className="min-w-0">
                  <p className="text-gray-900 font-bold ">
                    {trimText(notification.user.name, 12)} commented on your
                    post
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
                    {trimText(notification.user.name, 12)} replied on your
                    comment
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
                    {trimText(notification.user.name, 12)} mentioned you in a
                    post
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
        );
      })}
      {notifications.length > numberOfEventsToRender && (
        <FocusableItem>
          {({ ref }) => (
            <Button
              ref={ref}
              color="gray"
              variant="text"
              fullWidth
              onClick={() =>
                setNumberOfEventsToRender((v) => v + RENDER_PER_PAGE)
              }
            >
              Load More
            </Button>
          )}
        </FocusableItem>
      )}
    </Menu>
  );
}

function NotificationsSeen({
  onNotificationsSeen,
}: {
  onNotificationsSeen: () => void;
}) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onNotificationsSeen();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [onNotificationsSeen]);

  return null;
}
