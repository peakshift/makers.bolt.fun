import React, { useState } from "react";
import { IoIosCopy } from "react-icons/io";
import CopyToClipboardComponent from "react-copy-to-clipboard";
import { motion } from "framer-motion";
import { FiCopy } from "react-icons/fi";

interface Props {
  text: string;
  onCopy?: () => void;
  direction?: "top" | "bottom";
  iconClasses?: string;
  alertClasses?: string;
  successMsg?: string;
}

export default function CopyToClipboard({
  text,
  direction = "bottom",
  iconClasses = "",
  alertClasses = "",
  successMsg = "Copied!",
  onCopy = () => {},
}: Props) {
  const [showAlert, setShowAlert] = useState(false);
  const handleCopy = () => {
    setShowAlert(true);
    onCopy();
  };

  const className = direction === "bottom" ? "top-full" : "bottom-full";

  const variants = {
    hidden: {
      display: "none",
      opacity: 0,
      y: direction === "bottom" ? -20 : 20,
    },
    show: {
      opacity: 1,
      display: "block",
      y: direction === "bottom" ? 10 : -10,
    },
    fade: {
      display: "none",
      opacity: 0,
    },
  };

  return (
    <>
      <CopyToClipboardComponent text={text} onCopy={handleCopy}>
        <FiCopy
          className={`input-icon hover:cursor-pointer transition-transform hover:scale-110 active:scale-90 ${iconClasses}`}
        />
      </CopyToClipboardComponent>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={showAlert ? "show" : "fade"}
        onAnimationComplete={() => {
          if (showAlert) setTimeout(() => setShowAlert(false), 2000);
        }}
        className={`absolute rounded-xl text-center bg-black min-w-max text-white right-0 z-10 p-16 ${className} ${alertClasses}`}
      >
        {successMsg} <IoIosCopy className="align-middle" />
      </motion.div>
    </>
  );
}
