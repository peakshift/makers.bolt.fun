import { motion } from "framer-motion";
import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { IoClose } from "react-icons/io5";
import {
  Badge,
  BadgeProgress,
  ProfileQuery,
  useRequestNostrBadgeMutation,
} from "src/graphql";
import { useEffect, useState } from "react";
import Button from "src/Components/Button/Button";
import IconButton from "src/Components/IconButton/IconButton";
import { useSearchParams } from "react-router-dom";
import useCopyToClipboard from "src/utils/hooks/useCopyToClipboard";
import { NotificationsService } from "src/services";
import {
  addOpacityToHexColor,
  extractErrorMessage,
} from "src/utils/helperFunctions";
import dayjs from "dayjs";
import { useMetaData } from "src/lib/nostr";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { getProfileDataFromMetaData } from "src/lib/nostr/helpers";
import { nip19 } from "nostr-tools";
import BadgeComponent from "src/Components/Badge/Badge";
import { RelayPoolProvider } from "src/lib/nostr";

interface Props extends ModalCard {
  badge: Pick<
    Badge,
    "id" | "title" | "winningDescriptionTemplate" | "image" | "color" | "slug"
  >;
  username: string;
  issuedBadgeMetaData?: BadgeProgress["metaData"];
  awardedAt?: BadgeProgress["awardedAt"];
  badgeAwardNostrEventId?: BadgeProgress["badgeAwardNostrEventId"];
  isOwner?: boolean;
  nostrKeys?: NonNullable<ProfileQuery["profile"]>["nostr_keys"];
}

const DEFAULT_COLOR = "#8B5CF6";

export default function ViewBadgeModal({
  badge,
  username,
  issuedBadgeMetaData,
  awardedAt,
  isOwner,
  nostrKeys,
  badgeAwardNostrEventId,
  onClose,
  direction,
}: Props) {
  const [, setSearchParams] = useSearchParams();
  const copyToClipboard = useCopyToClipboard();

  useEffect(() => {
    setSearchParams({ badge: badge.slug }, { replace: true });

    return () => {
      setSearchParams({}, { replace: true });
    };
  }, [badge.slug, setSearchParams]);

  const onShare = () => {
    copyToClipboard(window.location.href);
    NotificationsService.info("Copied URL to clipboard");
  };

  return (
    <motion.div
      custom={direction}
      variants={modalCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="modal-card !overflow-auto max-w-[442px] min-h-screen xs:min-h-0 rounded-xl"
    >
      <RelayPoolProvider>
        <ViewBadgeCard
          badge={badge}
          username={username}
          issuedBadgeMetaData={issuedBadgeMetaData}
          badgeAwardNostrEventId={badgeAwardNostrEventId}
          awardedAt={awardedAt}
          isOwner={isOwner}
          nostrKeys={nostrKeys}
          onClose={onClose}
        />
      </RelayPoolProvider>
    </motion.div>
  );
}

export const ViewBadgeCard = ({
  badge,
  username,
  issuedBadgeMetaData,
  awardedAt,
  isOwner,
  nostrKeys,
  badgeAwardNostrEventId,
  onClose,
}: Props) => {
  const copyToClipboard = useCopyToClipboard();
  const { metadata } = useMetaData({
    pubkeys: nostrKeys?.map((k) => k.key) ?? [],
  });

  const [requestBadge, requestBadgeMutationStatus] =
    useRequestNostrBadgeMutation();

  const [showRequestNostrBadgeInput, setShowRequestNostrBadgeInput] =
    useState(false);
  const [selectedPubkey, setSelectedPubkey] = useState<string>();

  const color = badge.color ?? DEFAULT_COLOR;

  const onShare = () => {
    copyToClipboard(window.location.href);
    NotificationsService.info("Copied URL to clipboard");
  };

  const metaDataList = [...(issuedBadgeMetaData ?? [])];

  if (awardedAt)
    metaDataList.unshift({
      emoji: "🏆",
      label: null,
      value: `Unlocked ${dayjs(awardedAt).format("MMM D, YYYY")}`,
    });

  const onSendRequestBadge = async () => {
    if (!selectedPubkey) return;

    try {
      await requestBadge({
        variables: {
          input: {
            badgeId: badge.id,
            publicKeyToAward: selectedPubkey,
          },
        },
      });
      NotificationsService.success("Your request has been sent");
      setShowRequestNostrBadgeInput(false);
    } catch (error) {
      NotificationsService.error(
        extractErrorMessage(error) ?? "Something unexpected went wrong"
      );
    }
  };

  return (
    <div className="relative flex flex-col">
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundColor: color,
        }}
      ></div>
      <div className="p-24 py-36">
        <IconButton
          className="absolute text-body2 top-24 right-24"
          style={{ color: color }}
          onClick={onClose}
        >
          <IoClose />
        </IconButton>
      </div>
      <div className="flex flex-col items-center gap-16 px-24 pb-24 text-center grow">
        <img
          src={badge.image}
          alt=""
          className="w-full aspect-square max-w-[220px] drop-shadow-lg"
        />
        <h2 className="text-body1 font-bolder">{badge.title}</h2>
        <p className="text-body3 font-medium">
          {badge.winningDescriptionTemplate?.replace("{username}", username)}
        </p>
        {metaDataList.length > 0 && (
          <div className="flex flex-col gap-16">
            {metaDataList.map((metaData, i) => {
              return (
                <div key={i} className="flex items-center gap-16">
                  {metaData.emoji && (
                    <div
                      className="w-48 h-48 rounded-full flex flex-col items-center justify-center"
                      style={{
                        backgroundColor: addOpacityToHexColor(color, 0.4),
                      }}
                    >
                      {metaData.emoji}
                    </div>
                  )}
                  <p>
                    {metaData.label && (
                      <span className="font-bolder">{metaData.label} </span>
                    )}
                    <span>{metaData.value}</span>
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {showRequestNostrBadgeInput && (
          <>
            <div className="py-24 max-w-full">
              <p className="mb-24">
                To get a nostr badge, please choose which public key you want
                the badge to be issued to. Please note that this can{" "}
                <strong>NOT</strong> be changed later.
              </p>
              {nostrKeys && nostrKeys.length > 0 ? (
                <ul className="flex flex-col gap-12 max-w-full">
                  {[...nostrKeys]
                    .sort((k1, k2) => (k1.is_primary ? -1 : 1))
                    .map((nostrKey) => {
                      const nostrProfile = getProfileDataFromMetaData(
                        metadata,
                        nostrKey.key
                      );
                      return (
                        <li key={nostrKey.key} className="">
                          <button
                            className={`bg-gray-100 rounded p-16 flex gap-12 max-w-full border-2 ${
                              selectedPubkey === nostrKey.key
                                ? " border-primary-500"
                                : ""
                            } `}
                            onClick={() => setSelectedPubkey(nostrKey.key)}
                          >
                            {/* <div className="flex basis-full gap-8 items-center min-w-0"> */}
                            <Avatar width={40} src={nostrProfile.image} />
                            <div className="overflow-hidden">
                              <p className="flex flex-wrap gap-8 font-bold overflow-hidden whitespace-nowrap text-ellipsis">
                                {nostrKey.is_primary && (
                                  <BadgeComponent
                                    color="primary"
                                    size="sm"
                                    className="flex items-center"
                                  >
                                    Primary Key
                                  </BadgeComponent>
                                )}
                                {nostrKey.is_default_generated_key && (
                                  <BadgeComponent
                                    color="black"
                                    size="sm"
                                    className="flex items-center"
                                  >
                                    Generated by BOLT.FUN
                                  </BadgeComponent>
                                )}
                                {nostrProfile.name}
                              </p>
                              <p className="text-gray-500 overflow-hidden text-ellipsis">
                                {nip19.npubEncode(nostrKey.key)}
                              </p>
                            </div>
                            {/* </div>  */}
                          </button>
                        </li>
                      );
                    })}
                </ul>
              ) : (
                <p className="text-gray-600 font-bold">
                  You don't have any Nostr keys linked yet...
                </p>
              )}
            </div>
            <div className="flex flex-col gap-12 w-full mt-auto">
              <Button
                color="none"
                fullWidth
                disabled={!selectedPubkey}
                className="text-white mt-auto"
                onClick={onSendRequestBadge}
                style={{ backgroundColor: color }}
                isLoading={requestBadgeMutationStatus.loading}
              >
                Send Request for Nostr Badge
              </Button>
              <Button
                color="none"
                fullWidth
                onClick={() => setShowRequestNostrBadgeInput(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        )}

        {!showRequestNostrBadgeInput && (
          <div className="flex flex-col gap-12 w-full mt-auto">
            {isOwner && !badgeAwardNostrEventId && (
              <Button
                color="none"
                fullWidth
                className="text-white mt-auto"
                onClick={() => {
                  setShowRequestNostrBadgeInput(true);
                  setSelectedPubkey(nostrKeys?.[0].key);
                }}
                style={{ backgroundColor: color }}
              >
                Request Nostr Badge
              </Button>
            )}
            {badgeAwardNostrEventId && (
              <Button
                color="none"
                fullWidth
                className="text-white mt-auto"
                onClick={() => {
                  copyToClipboard(
                    nip19.neventEncode({
                      id: badgeAwardNostrEventId,
                    })
                  );
                  NotificationsService.info("Copied to clipboard", {
                    icon: "📋",
                  });
                }}
                newTab
                style={{ backgroundColor: color }}
              >
                Copy Nostr Badge Award Id
              </Button>
            )}
            <Button
              color="none"
              variant="outline"
              fullWidth
              className="text-white"
              style={{ borderColor: color, color: color }}
              onClick={onShare}
            >
              Share
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
