import { motion } from "framer-motion";
import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { IoClose } from "react-icons/io5";
import { Badge } from "src/graphql";
import { useEffect, useRef } from "react";
import Button from "src/Components/Button/Button";
import IconButton from "src/Components/IconButton/IconButton";
import { useSearchParams } from "react-router-dom";
import useCopyToClipboard from "src/utils/hooks/useCopyToClipboard";
import { NotificationsService } from "src/services";

interface Props extends ModalCard {
  badge: Badge;
  isOwner?: boolean;
}

const colors = ["#8B5CF6", "#EAB308", "#16A34A"];

export default function ViewBadgeModal({
  badge,
  isOwner,
  onClose,
  direction,
}: Props) {
  const [, setSearchParams] = useSearchParams();
  const copyToClipboard = useCopyToClipboard();

  const color = useRef(colors[Math.floor(Math.random() * colors.length)]);

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
      className="modal-card !overflow-auto max-w-[442px] min-h-screen xs:min-h-0 rounded-xl relative flex flex-col overscroll-contain"
    >
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundColor: color.current,
        }}
      ></div>
      <div className="p-24">
        <IconButton
          className="absolute text-body2 top-24 right-24"
          style={{ color: color.current }}
          onClick={onClose}
        >
          <IoClose />
        </IconButton>
      </div>
      <div className="flex flex-col items-center gap-8 px-24 pb-24 text-center grow">
        <img
          src={badge.image}
          alt=""
          className="w-full aspect-square max-w-[220px] drop-shadow-lg"
        />
        <h2 className="text-body1 font-bolder">{badge.title}</h2>
        <p className="text-body3 font-medium">{badge.description}</p>

        {isOwner && (
          <>
            <Button
              color="none"
              fullWidth
              className="text-white mt-auto"
              style={{ backgroundColor: color.current }}
            >
              Request Nostr Badge
            </Button>
            <Button
              color="none"
              variant="outline"
              fullWidth
              className="text-white"
              style={{ borderColor: color.current, color: color.current }}
              onClick={onShare}
            >
              Share
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
}
