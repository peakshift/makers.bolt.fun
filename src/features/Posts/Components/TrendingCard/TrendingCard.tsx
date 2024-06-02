import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import Card from "src/Components/Card/Card";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { useTrendingPostsQuery } from "src/graphql";
import { random } from "src/utils/helperFunctions";
import { createRoute } from "src/utils/routing";

export default function TrendingCard() {
  const trendingPosts = useTrendingPostsQuery();

  return (
    <div>
      <h3 className="text-body2 font-bolder mb-16">Trending</h3>
      <ul className="flex flex-col">
        {trendingPosts.loading
          ? Array(4)
              .fill(0)
              .map((_, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-8 border-b py-16 last-of-type:border-b-0"
                >
                  <Skeleton circle width={24} height={24} />
                  <h4 className="text-body5 font-medium flex-grow">
                    <Skeleton width={"80%"} />
                    <Skeleton width={`${random(30, 65)}%`} />
                  </h4>
                </li>
              ))
          : trendingPosts.data?.getTrendingPosts.map((post) => {
              return (
                <Link
                  key={post.id}
                  to={createRoute({
                    type: "post",
                    postType: post.__typename!,
                    id: post.id,
                    title: post.title,
                  })}
                  className="border-b py-16 last-of-type:border-b-0"
                >
                  <li className="flex items-start gap-8">
                    {post.author && (
                      <Avatar width={24} src={post.author.avatar} />
                    )}
                    <h4 className="text-body5 font-medium">{post.title}</h4>
                  </li>
                </Link>
              );
            })}
      </ul>
    </div>
  );
}
