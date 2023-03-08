import React from "react";
import Card from "src/Components/Card/Card";
import Skeleton from "react-loading-skeleton";

export default function PreferencesTabSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
      <div className="col-span-2 flex flex-col gap-24">
        <Card>
          <p className="text-body2 font-bold">
            <Skeleton width="15ch" />
          </p>
          <p className="text-body4 text-gray-600 mt-8">
            <Skeleton width="70%" />
            <Skeleton width="35%" />
          </p>

          <div className="mt-24 flex flex-col gap-16">
            <ul className="mt-8 relative flex flex-col gap-8">
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <li key={idx} className="bg-gray-100 rounded">
                    <div className="flex gap-16 items-center">
                      <div className="flex items-center flex-grow relative min-w-0 py-8">
                        <span className="input-icon !pr-0">
                          {" "}
                          <Skeleton width="2ch"></Skeleton>
                        </span>
                        <p>
                          <Skeleton width="20ch"></Skeleton>
                        </p>
                      </div>
                    </div>
                    <p className="text-body5 text-gray-500 italic pl-16 py-8">
                      <Skeleton width="20ch"></Skeleton>
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        </Card>
        <Card>
          <p className="text-body2 font-bold">
            <Skeleton width="12ch" />
          </p>
          <p className="text-body4 text-gray-600 mt-8">
            <Skeleton width="80%" />
            <Skeleton width="50%" />
            <Skeleton width="65%" />
          </p>
          <div className="py-42"></div>
        </Card>
      </div>
      <div className=""></div>
    </div>
  );
}
