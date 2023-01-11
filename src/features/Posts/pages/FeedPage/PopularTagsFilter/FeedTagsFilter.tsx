import { useMediaQuery } from "src/utils/hooks";
import Skeleton from "react-loading-skeleton";
import Slider from "src/Components/Slider/Slider";
import { Tag, useFeedTagsQuery } from "src/graphql";
import { MEDIA_QUERIES } from "src/utils/theme";
import { formatHashtag } from "src/utils/helperFunctions";
import Card from "src/Components/Card/Card";
import { Link } from "react-router-dom";
import { createRoute } from "src/utils/routing";
import { useState } from "react";
import Button from "src/Components/Button/Button";

export type FilterTag = Pick<Tag, "id" | "title" | "icon">;

interface Props {
  value: FilterTag | null;
  onChange?: (newFilter: FilterTag | null) => void;
}

const MAX_SHOWED_TAGS = 10;

export default function FeedTagsFilter({ value, onChange }: Props) {
  const tagsQuery = useFeedTagsQuery();

  const [showingAll, setShowingAll] = useState(false);

  const filterClicked = (_newValue: FilterTag) => {
    const newValue = value?.id === _newValue.id ? null : _newValue;
    onChange?.(newValue);
  };

  const selectedId = value?.id;

  const isMdScreen = useMediaQuery(MEDIA_QUERIES.isMedium);

  return (
    <div className="overflow-hidden">
      {isMdScreen ? (
        <div>
          <p className="text-body2 font-bolder text-black mb-16">🏷️ Tags</p>
          <ul className=" flex flex-col gap-16">
            {tagsQuery.loading
              ? Array(10)
                  .fill(0)
                  .map((_, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start rounded-8 font-bold`}
                    >
                      <span className="bg-gray-100 rounded-8 w-40 h-40 text-center py-8">
                        {" "}
                      </span>
                      <span className="self-center px-8">
                        <Skeleton width={"7ch"} />
                      </span>
                    </li>
                  ))
              : tagsQuery.data?.officialTags
                  .slice(0, showingAll ? -1 : MAX_SHOWED_TAGS)
                  .map((tag) => (
                    <li key={tag.id}>
                      <Link
                        to={createRoute({ type: "tag-page", tag: tag.title })}
                        className={`flex items-start rounded-8 cursor-pointer font-bold
                                 active:scale-95 transition-transform
                                ${
                                  tag.id === selectedId
                                    ? "bg-gray-200"
                                    : "hover:bg-gray-100"
                                }
                                `}
                      >
                        <span
                          className={`${
                            tag.id !== selectedId && "bg-gray-100"
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
          {tagsQuery.data &&
            tagsQuery.data?.officialTags.length > MAX_SHOWED_TAGS && (
              <Button
                fullWidth
                size="sm"
                variant="text"
                className="text-blue-400 mt-16"
                onClick={() => setShowingAll((v) => !v)}
              >
                {showingAll ? "Show less" : "Show more"}
              </Button>
            )}
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
          )}
        </>
      )}
    </div>
  );
}