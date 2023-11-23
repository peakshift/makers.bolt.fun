import { motion } from "framer-motion";
import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { IoClose } from "react-icons/io5";
import { Badge, BadgeProgress } from "src/graphql";
import { useEffect, useRef } from "react";
import Button from "src/Components/Button/Button";
import IconButton from "src/Components/IconButton/IconButton";
import { useSearchParams } from "react-router-dom";
import useCopyToClipboard from "src/utils/hooks/useCopyToClipboard";
import { NotificationsService } from "src/services";
import { addOpacityToHexColor } from "src/utils/helperFunctions";
import dayjs from "dayjs";

interface Props extends ModalCard {
  badge: Badge;
  username: string;
  issuedBadgeMetaData?: BadgeProgress["metaData"];
  awardedAt?: BadgeProgress["awardedAt"];
  isOwner?: boolean;
}

const DEFAULT_COLOR = "#8B5CF6";

export default function ViewBadgeModal({
  badge,
  username,
  issuedBadgeMetaData,
  awardedAt,
  isOwner,
  onClose,
  direction,
}: Props) {
  const [, setSearchParams] = useSearchParams();
  const copyToClipboard = useCopyToClipboard();

  const color = badge.color ?? DEFAULT_COLOR;

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

  const metaDataList = [...(issuedBadgeMetaData ?? [])];

  if (awardedAt)
    metaDataList.unshift({
      emoji: "🏆",
      label: null,
      value: `Unlocked ${dayjs(awardedAt).format("MMM D, YYYY")}`,
    });

  return (
    <motion.div
      custom={direction}
      variants={modalCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="modal-card !overflow-auto max-w-[442px] min-h-screen xs:min-h-0 rounded-xl relative flex flex-col overscroll-contain"
    >
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundColor: color,
        }}
      ></div>
      <div className="p-24">
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

        <div className="flex flex-col gap-12 w-full mt-auto">
          {isOwner && (
            <Button
              color="none"
              fullWidth
              className="text-white mt-auto"
              style={{ backgroundColor: color }}
            >
              Request Nostr Badge
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
      </div>
    </motion.div>
  );
}
