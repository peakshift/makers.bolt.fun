import React from "react";
import { BadgeProgress, UserBadge } from "src/graphql";

interface Props {
  userBadge: UserBadge;
  showProgress?: boolean;
}

export default function BadgeCard({ userBadge, showProgress }: Props) {
  if (showProgress)
    return (
      <div className="bg-gray-100 py-8 px-16 rounded">
        <div className="flex gap-8">
          <img
            src={userBadge.badge.image}
            alt=""
            className="w-64 h-64 rounded object-contain"
          />
          <div>
            <p className="font-medium">{userBadge.badge.title}</p>
            <p className="font-medium text-body5 text-gray-500">
              {userBadge.badge.description}
            </p>
          </div>
        </div>
        <div>
          {hasProgressBar(userBadge.progress) && (
            <div className="mt-8">
              <div className="relative bg-white h-16 rounded p-[2px] border-2 border-gray-200">
                <div
                  className="bg-primary-500 rounded-16 h-full origin-left"
                  style={{
                    width: `${
                      getProgressPercentage(userBadge.progress) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-end">
                <p className="text-body5 text-gray-500 mt-8 ml-auto">
                  <span className="sr-only">Progress: </span>
                  {userBadge.progress.current ?? 0} /{" "}
                  {userBadge.progress.totalNeeded}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );

  return (
    <div className="bg-gray-100 py-8 px-16 rounded h-full">
      <div className="flex flex-col items-center text-center gap-8">
        <img
          src={userBadge.badge.image}
          alt=""
          className="w-64 h-64 rounded object-contain"
        />
        <div>
          <p className="font-medium">{userBadge.badge.title}</p>
          <p className="font-medium text-body5 text-gray-500">
            {userBadge.badge.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function hasProgressBar(
  progress: UserBadge["progress"]
): progress is BadgeProgress {
  return Boolean(progress?.totalNeeded && progress.totalNeeded > 1);
}

function getProgressPercentage(progress: BadgeProgress) {
  return Math.max(
    Math.min((progress.current ?? 0) / progress.totalNeeded!, 1),
    0.01
  );
}
