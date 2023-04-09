import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import IconButton from "src/Components/IconButton/IconButton";
import Preferences from "src/services/preferences.service";
import { createRoute } from "src/utils/routing";

export default function WelcomeNewMaker() {
  const [hide, setHide] = useState(() =>
    Preferences.get("hide_welcome_message")
  );

  const onClose = () => {
    Preferences.update("hide_welcome_message", true);
    setHide(true);
  };

  if (hide) return null;

  return (
    <div className="p-24 md:p-36 flex flex-col gap-16 bg-primary-600 text-white rounded-16 relative">
      <IconButton
        className="absolute text-body2 top-16 right-16 md:top-24 md:right-24"
        onClick={onClose}
      >
        <IoClose />
      </IconButton>
      <h2 className="text-h1 font-bold">Take a look around</h2>
      <p className="text-body1">
        The most FUN community of builders and designers making the future with Bitcoin, Nostr, and AI!
      </p>
      <div>
        <p className="text-gray-300 mb-8">SUGGESTED THINGS YOU CAN DO</p>
        <div className="flex flex-col gap-8">
          <Link
            to={createRoute({ type: "edit-profile" })}
            className="flex max-md:flex-col w-full p-8 gap-8 md:items-center rounded bg-primary-500 hover:bg-primary-400"
          >
            <div
              className={`shrink-0 flex flex-col justify-center items-center bg-white bg-opacity-50 rounded-8 w-48 h-48`}
              >
              👾
            </div>
            <div>
              <p className="text-body4 text-white font-bold">
                Complete your maker profile
              </p>
            </div>
          </Link>
          <Link
            to={createRoute({ type: "edit-profile", tab: "nostr" })}
            className="flex max-md:flex-col w-full p-8 gap-8 md:items-center bg-yellow-400 hover:bg-opacity-40 rounded bg-opacity-50 "
          >
            <div
              className={`shrink-0 flex flex-col justify-center items-center bg-white bg-opacity-50 rounded-8 w-48 h-48`}
              >
              🦩
            </div>
            <div>
              <p className="text-body4 text-white font-bold">
                Verify yourself on Nostr{" "}
                <span className="font-medium text-xs leading-5 rounded bg-orange-400 px-8">
                  NEW
                </span>
              </p>
            </div>
          </Link>
          <Link
            to={createRoute({ type: "write-story" })}
            className="flex max-md:flex-col w-full p-8 gap-8 md:items-center rounded bg-primary-500 hover:bg-primary-400"
          >
            <div
              className={`shrink-0 flex flex-col justify-center items-center bg-white bg-opacity-50 rounded-8 w-48 h-48`}
              >
              ✍️
            </div>
            <div>
              <p className="text-body4 text-white font-bold">
                Introduce yourself
              </p>
            </div>
          </Link>
          <Link
            to={createRoute({ type: "edit-project" })}
            className="flex max-md:flex-col w-full p-8 gap-8 md:items-center rounded bg-primary-500 hover:bg-primary-400"
          >
            <div
              className={`shrink-0 flex flex-col justify-center items-center bg-white bg-opacity-50 rounded-8 w-48 h-48`}
            >
              🚀
            </div>
            <div>
              <p className="text-body4 text-white font-bold">
                Submit your project
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
