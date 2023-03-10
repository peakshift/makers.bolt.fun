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
      <h2 className="text-h1 font-bold">Take a look around!!</h2>
      <p className="text-body1">
        You're entering the most FUN community of builders and designers in
        Bitcoin & Nostr!
      </p>
      <div>
        <p className="text-gray-300 mb-8">SUGGESTED THINGS YOU CAN DO</p>
        <div className="flex flex-col gap-8">
          <Link
            to={createRoute({ type: "edit-profile" })}
            className="flex max-md:flex-col w-full p-8 gap-8 md:items-center bg-white rounded bg-opacity-20 hover:bg-opacity-10"
          >
            <div
              className={`shrink-0 flex flex-col justify-center items-center bg-gray-200 rounded-8 w-48 h-48`}
            >
              👾
            </div>
            <div>
              <p className="text-body4 text-white font-bold">
                Complete your maker profile
              </p>
              <p className="text-body5 text-gray-100">
                Get found by the right people.
              </p>
            </div>
          </Link>
          <Link
            to={createRoute({ type: "edit-profile", tab: "nostr" })}
            className="flex max-md:flex-col w-full p-8 gap-8 md:items-center bg-white rounded bg-opacity-20 hover:bg-opacity-10"
          >
            <div
              className={`shrink-0 flex flex-col justify-center items-center bg-gray-200 rounded-8 w-48 h-48`}
            >
              🦩
            </div>
            <div>
              <p className="text-body4 text-white font-bold">
                Link Your Nostr Public Key
              </p>
              <p className="text-body5 text-gray-100">
                So other makers can follow you on Nostr.
              </p>
            </div>
          </Link>
          <Link
            to="/tournaments/2/overview"
            className="flex max-md:flex-col w-full p-8 gap-8 md:items-center bg-white rounded bg-opacity-20 hover:bg-opacity-10"
          >
            <div
              className={`shrink-0 flex flex-col justify-center items-center bg-gray-200 rounded-8 w-48 h-48`}
            >
              🏆
            </div>
            <div>
              <p className="text-body4 text-white font-bold">
                Register for #NostrHack
              </p>
              <p className="text-body5 text-gray-100">
                Hackathon for designing the future of social networks.
              </p>
            </div>
          </Link>
          <Link
            to={createRoute({ type: "write-story" })}
            className="flex max-md:flex-col w-full p-8 gap-8 md:items-center bg-white rounded bg-opacity-20 hover:bg-opacity-10"
          >
            <div
              className={`shrink-0 flex flex-col justify-center items-center bg-gray-200 rounded-8 w-48 h-48`}
            >
              ✍️
            </div>
            <div>
              <p className="text-body4 text-white font-bold">
                Introduce yourself
              </p>
              <p className="text-body5 text-gray-100">Post a story.</p>
            </div>
          </Link>
          <Link
            to={createRoute({ type: "edit-project" })}
            className="flex max-md:flex-col w-full p-8 gap-8 md:items-center bg-white rounded bg-opacity-20 hover:bg-opacity-10"
          >
            <div
              className={`shrink-0 flex flex-col justify-center items-center bg-gray-200 rounded-8 w-48 h-48`}
            >
              🚀
            </div>
            <div>
              <p className="text-body4 text-white font-bold">
                List your project
              </p>
              <p className="text-body5 text-gray-100">
                Let people know what you're working on. Amazing things can
                happen.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
