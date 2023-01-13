import { useMediaQuery } from "src/utils/hooks";
import Skeleton from "react-loading-skeleton";
import Slider from "src/Components/Slider/Slider";
import { Tag, useFeedTagsQuery } from "src/graphql";
import { MEDIA_QUERIES } from "src/utils/theme";
import { formatHashtag } from "src/utils/helperFunctions";
import { Link } from "react-router-dom";
import { createRoute, PAGES_ROUTES } from "src/utils/routing";
import Button from "src/Components/Button/Button";

export type FilterTag = Pick<Tag, "id" | "title" | "icon">;

interface Props {
  value: FilterTag | null;
  onChange?: (newFilter: FilterTag | null) => void;
}

const MAX_SHOWED_TAGS = 10;

export default function FeedTagsFilter({ value, onChange }: Props) {
  const tagsQuery = useFeedTagsQuery();

  const selectedId = value?.id;

  const isMdScreen = useMediaQuery(MEDIA_QUERIES.isMedium);

  return (
    <div className="">
      {isMdScreen ? (
        <div>
          <div className="flex flex-wrap justify-between items-center mb-16 gap-y-8">
            <p className="text-body2 font-bolder text-gray-900">🏷️ Topics</p>
            <Button
              variant="text"
              color="primary"
              size="sm"
              href={PAGES_ROUTES.blog.topicsPage}
            >
              See all
            </Button>
          </div>
          <ul className=" flex flex-col gap-16">
            {tagsQuery.loading
              ? Array(10)
                  .fill(0)
                  .map((_, idx) => (
                    <li
                      key={idx}
                      className={`group flex items-start rounded-8 font-bold`}
                    >
                      <span className="bg-gray-50 rounded-8 w-40 h-40 text-center py-8">
                        {" "}
                      </span>
                      <span className="self-center px-8">
                        <Skeleton width={"7ch"} />
                      </span>
                    </li>
                  ))
              : tagsQuery.data?.officialTags
                  .slice(0, MAX_SHOWED_TAGS)
                  .map((tag) => (
                    <li key={tag.id} className="group">
                      <Link
                        to={createRoute({ type: "tag-page", tag: tag.title })}
                        className={`flex items-start rounded-8 cursor-pointer font-bold
                                 active:scale-95 group-hover:bg-gray-100 transition-transform
                                ${
                                  tag.id === selectedId
                                    ? "bg-gray-200"
                                    : "group-hover:bg-gray-100"
                                }
                                `}
                      >
                        <span
                          className={`${
                            tag.id !== selectedId &&
                            "bg-gray-50 group-hover:bg-gray-100"
                          } rounded-8 w-40 h-40 text-center py-8`}
                        >
                          {tag.icon}
                        </span>
                        <span className="self-center px-8">
                          {formatHashtag(tag.title)}
                        </span>
                      </Link>
                    </li>
                  ))}
          </ul>
        </div>
      ) : (
        <>
          {tagsQuery.loading ? (
            <ul className="flex gap-8 ">
              {Array(4)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="py-12 px-16 bg-gray-100 rounded-8 text-body5"
                  >
                    <span className="opacity-0">Category</span>
                  </div>
                ))}
            </ul>
          ) : (
            <div className="relative">
              <div className="absolute bottom-full -translate-y-16 right-0">
                <Button
                  variant="text"
                  color="primary"
                  size="sm"
                  href={PAGES_ROUTES.blog.topicsPage}
                >
                  See all topics
                </Button>
              </div>
              <Slider>
                {tagsQuery.data?.officialTags.map((tag) => (
                  <Link
                    key={tag.id}
                    to={createRoute({ type: "tag-page", tag: tag.title })}
                    className={`${
                      tag.id === selectedId ? "bg-gray-200" : "bg-gray-100"
                    } py-12 px-16 rounded-8 text-body5`}
                  >
                    {tag.icon} {formatHashtag(tag.title)}
                  </Link>
                ))}
              </Slider>
            </div>
          )}
        </>
      )}
    </div>
  );
}
