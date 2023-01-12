import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import Card from "src/Components/Card/Card";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { useGetActiveUsersQuery } from "src/graphql";
import { createRoute } from "src/utils/routing";

interface Props {
  tagId?: number;
}

export default function ActiveUsers({ tagId }: Props) {
  const query = useGetActiveUsersQuery({
    variables: {
      lastDays: 7,
      tagId: tagId ?? null,
    },
  });

  const medal: Record<number, string> = {
    0: "🥇",
    1: "🥈",
    2: "🥉",
  };

  if (query.loading || query.data?.activeUsers.length === 0) return null;

  return (
    <Card onlyMd>
      <h3 className="text-body2 font-bolder">Most Active 🔥</h3>
      <ul className="flex flex-col">
        {query.loading &&
          Array(3)
            .fill(0)
            .map((_, idx) => (
              <li
                key={idx}
                className="border-b py-16 last-of-type:border-b-0 last-of-type:pb-0 flex items-center gap-8"
              >
                <span className="basis-16 shrink-0 mr-4"></span>
                <Skeleton circle width={40} height={40} />
                <div className="overflow-hidden">
                  <p className="text-body4 text-gray-800 font-medium overflow-hidden text-ellipsis">
                    <Skeleton width="10ch" />
                  </p>
                </div>
              </li>
            ))}
        {query.data?.activeUsers.map((maker, idx) => {
          return (
            <Link
              key={maker.id}
              to={createRoute({
                type: "profile",
                id: maker.id,
                username: maker.name,
              })}
              className="border-b py-16 last-of-type:border-b-0 last-of-type:pb-0"
            >
              <li className="flex items-center gap-8">
                <span className="basis-16 shrink-0 mr-4">
                  {medal[idx] && medal[idx]}
                </span>
                <Avatar width={40} src={maker.avatar} />
                <div className="overflow-hidden">
                  <p className="text-body4 text-gray-800 font-medium overflow-hidden text-ellipsis">
                    {maker.name}
                  </p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </Card>
  );
}
