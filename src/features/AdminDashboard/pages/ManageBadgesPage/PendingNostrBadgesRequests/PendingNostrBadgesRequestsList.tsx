import React from "react";
import Button from "src/Components/Button/Button";
import CopyToClipboard from "src/Components/CopyToClipboard/CopyToClipboard";
import { calcTimeSincePosting } from "src/features/Posts/Components/PostCard/PostCardHeader/PostCardHeader";
import { ManageBadgesQuery } from "src/graphql";
import { NotificationsService } from "src/services";
import { trimText } from "src/utils/helperFunctions";
import { createRoute } from "src/utils/routing";
import PendingNostrBadgeRequestCard from "./PendingNostrBadgeRequestCard";

interface Props {
  pendingRequests:
    | ManageBadgesQuery["getPendingNostrBadgeRequests"]
    | undefined;
}

export default function PendingNostrBadgesRequestsList({
  pendingRequests,
}: Props) {
  return (
    <ul className="flex flex-col gap-8">
      {pendingRequests?.map((request) => (
        <li key={request.id} className="">
          <PendingNostrBadgeRequestCard request={request} />
        </li>
      ))}
    </ul>
  );
}
