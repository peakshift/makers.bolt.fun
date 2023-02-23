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
    <div className="p-24 md:p-36 flex flex-col gap-16 bg-primary-500 text-white rounded-16 relative">
      <IconButton
        className="absolute text-body2 top-16 right-16 md:top-24 md:right-24"
        onClick={onClose}
      >
        <IoClose />
      </IconButton>
      <h2 className="text-h1 font-bold">Welcome!!</h2>
      <p className="text-body1">
        You are now a valuable member of the most FUN community of builders &
        designer in Bitcoin & Nostr!
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
                Add details to your maker profile so you stand out.
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
                Write your first story
              </p>
              <p className="text-body5 text-gray-100">
                Whatever thing you would like to talk about.
              </p>
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
              <p className="text-body4 text-white font-bold">List a project</p>
              <p className="text-body5 text-gray-100">
                Add your awesome project to our projects directory.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
