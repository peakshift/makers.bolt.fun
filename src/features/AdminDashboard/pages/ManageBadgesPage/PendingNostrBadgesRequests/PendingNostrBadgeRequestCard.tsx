import { nip19 } from "nostr-tools";
import { useState } from "react";
import Button from "src/Components/Button/Button";
import CopyToClipboard from "src/Components/CopyToClipboard/CopyToClipboard";
import { calcTimeSincePosting } from "src/features/Posts/Components/PostCard/PostCardHeader/PostCardHeader";
import { useAwardNostrBadgeMutation } from "src/graphql";
import { NotificationsService } from "src/services";
import { trimText } from "src/utils/helperFunctions";
import { createRoute } from "src/utils/routing";

interface Props {
  request: {
    id: number;
    createdAt: string;
    user: {
      id: number;
      name: string;
    };
    badge: {
      id: number;
      title: string;
    };
    publicKeyToAward: string;
  };
}

export default function PendingNostrBadgeRequestCard({ request }: Props) {
  const [inputOpen, setInputOpen] = useState(false);
  const [badgeAwardId, setBadgeAwardId] = useState("");

  const [awardBadge, awardBadgeMutationStatus] = useAwardNostrBadgeMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (awardBadgeMutationStatus.loading) return;

    let badgeAwardIdInHex = badgeAwardId;

    if (badgeAwardIdInHex.startsWith("naddr"))
      badgeAwardIdInHex = nip19.decode(badgeAwardIdInHex).data.toString();

    // is valid 32 bytes hex string
    let badgeAwardIdIsValid =
      badgeAwardIdInHex.match(/^[0-9a-fA-F]{64}$/) !== null;

    if (!badgeAwardIdIsValid) {
      NotificationsService.error("Invalid badge award id format");
      return;
    }

    try {
      await awardBadge({
        variables: {
          input: {
            awardEventId: badgeAwardId,
            nostrBadgeRequestId: request.id,
          },
        },
      });
      NotificationsService.success("Badge awarded successfully");
    } catch (error) {
      NotificationsService.error("Something went wrong");
    }
  };

  return (
    <div
      key={request.id}
      className="bg-primary-50 flex flex-col gap-8 border-2 border-primary-100 p-20 rounded"
    >
      <p className="text-body3">{calcTimeSincePosting(request.createdAt)}</p>
      <p>
        <a
          href={createRoute({
            type: "profile",
            id: request.user.id,
            username: request.user.name,
          })}
          className="font-bold underline"
          target="_blank"
          rel="noreferrer"
        >
          {trimText(request.user.name, 20)}
        </a>{" "}
        requested for <span className="font-bold">{request.badge.title}</span>{" "}
        nostr badge.
      </p>
      <p>
        🔑 Public key:{" "}
        <span className="font-bold">{request.publicKeyToAward}</span>
        <CopyToClipboard
          text={request.publicKeyToAward}
          onCopy={() =>
            NotificationsService.info(" Copied to clipboard", {
              icon: "📋",
            })
          }
        />
      </p>
      {inputOpen && (
        <div className="pt-24">
          <form onSubmit={onSubmit}>
            <div>
              <label
                htmlFor={`award-event-input-${request.badge.id}`}
                className="text-body5"
              >
                Nostr Badge Award Id<sup className="text-red-500">*</sup>
              </label>
              <div className="input-wrapper mt-8 relative">
                <input
                  id={`award-event-input-${request.badge.id}`}
                  autoFocus
                  required
                  type="text"
                  className="input-text"
                  placeholder="a312dfcsa120.... OR naddr..."
                  value={badgeAwardId}
                  onChange={(e) => setBadgeAwardId(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-8 mt-16">
              <Button color="gray" onClick={() => setInputOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
      {!inputOpen && (
        <Button
          size="sm"
          color="primary"
          className="self-start"
          onClick={() => setInputOpen(true)}
        >
          Link Badge Award Event
        </Button>
      )}
    </div>
  );
}
