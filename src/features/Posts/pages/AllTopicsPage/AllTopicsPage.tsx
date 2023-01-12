import { usePreload } from "src/utils/hooks";
import Button from "src/Components/Button/Button";
import { formatHashtag } from "src/utils/helperFunctions";
import { createRoute } from "src/utils/routing";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "./allTopicsPage.loader";
import OgTags from "src/Components/OgTags/OgTags";
import Card from "src/Components/Card/Card";

export default function TagPage() {
  const loaderData = useLoaderData() as LoaderData;

  const tags = loaderData.officialTags;

  usePreload("TagPage");

  const tagsSortedByPostCount = [...tags].sort(
    (t1, t2) => t2.posts_count - t1.posts_count
  );

  return (
    <>
      <OgTags title={`All Topics`} />
      <div className={`page-container`}>
        <div className="flex flex-wrap mb-24">
          <h1 className="text-h2 font-bolder">All Topics</h1>
        </div>
        <div
          className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24`}
        >
          {tagsSortedByPostCount.map((tag) => (
            <Card key={tag.id} className="flex flex-col gap-16">
              <span className="rounded-8 bg-gray-100 w-40 h-40 text-center py-8">
                {tag.icon}
              </span>
              <div className="flex flex-col gap-8">
                <h2 className="text-body2 text-black font-bolder">
                  {formatHashtag(tag.title)}
                </h2>
                <p className="line-clamp-2 text-gray-600">
                  {tag.long_description}
                </p>
                <p className="text-gray-600 text-body6 font-medium">
                  ✍️ {tag.posts_count} posts
                </p>
              </div>
              <Button
                color="white"
                size="sm"
                href={createRoute({ type: "tag-page", tag: tag.title })}
              >
                View Topic
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
