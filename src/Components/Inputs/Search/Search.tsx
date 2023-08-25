// @ts-nocheck
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import {
  InstantSearch,
  useSearchBox,
  Index,
  Configure,
  useHits,
} from "react-instantsearch";
import VoteButton from "src/Components/VoteButton/VoteButton";
import Sugar from "sugar";
import { Link } from "react-router-dom";
import { createRoute } from "src/utils/routing";
import { calcTimeSincePosting } from "src/features/Posts/Components/PostCard/PostCardHeader/PostCardHeader";

interface Props {
  classes?: {
    container?: string;
    input?: string;
  };
  placeholder?: string;
}

const HitComponentStories = () => {
  const { hits } = useHits();
  return (
    <div>
      {hits.length > 0 ? (
        <p className="font-light p-2 opacity-70 text-sm">Stories</p>
      ) : null}
      {hits.map((hit) => {
        return (
          <Link
            to={createRoute({
              type: "story",
              id: hit.id,
              title: hit.title,
            })}
          >
            <div className="flex items-center z-50 bg-white w-[400px] max-w-full h-80 hover:bg-gray-100 justify-between transition">
              <div className="flex items-center">
                {hit.cover_image ? (
                  <Avatar src={hit.cover_image} className="m-14" />
                ) : (
                  <Avatar
                    src="https://via.placeholder.com/1600x900.png?text=No+Cover+Image"
                    className="m-14"
                  />
                )}
                <div className="flex flex-col">
                  <h1 className="font-bold line-clamp-2">{hit.title}</h1>

                  <time
                    dateTime={hit.createdAt}
                    className="text-xs font-light opacity-70"
                  >
                    {calcTimeSincePosting(hit.createdAt)}
                  </time>
                </div>
              </div>
              <div className="px-2 flex flex-col justify-end">
                <VoteButton
                  direction="vertical"
                  votes={hit.votes_count}
                  dense={true}
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
const HitComponentUsers = () => {
  const { hits } = useHits();
  return (
    <div>
      {hits.length > 0 ? (
        <p className="font-light p-2 opacity-70 text-sm">Users</p>
      ) : null}
      {hits.map((hit) => {
        return (
          <Link
            to={createRoute({
              type: "profile",
              id: hit.id,
              username: hit.name,
            })}
            aria-hidden="true"
            tabIndex={-1}
          >
            <div className="flex items-center z-50 bg-white w-[400px] max-w-full h-80 hover:bg-gray-100 transition">
              {hit.avatar ? (
                <Avatar src={hit.avatar} className="m-14" />
              ) : (
                <Avatar
                  src={
                    "https://via.placeholder.com/900x900.png?text=No+Avatar+Image"
                  }
                  className="m-14"
                />
              )}
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <h1 className="font-bold max-w-fit break-all pr-2 line-clamp-2">
                    {hit.name}
                  </h1>
                </div>
                <p className="line-clamp-2 text-xs font-light text-gray-600">
                  {hit.jobTitle}
                </p>
                {/* <p className="line-clamp-2 text-xs font-light text-gray-600">
                  Joined {Sugar.Date.relative(new Date(hit.join_date))}
                </p> */}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
const HitComponentTags = () => {
  const { hits } = useHits();
  return (
    <div>
      {hits.length > 0 ? (
        <p className="font-light p-2 opacity-70 text-sm">Tags</p>
      ) : null}
      {hits.map((hit) => {
        return (
          <Link
            to={createRoute({ type: "tag-page", tag: hit.title })}
            key={hit.id}
          >
            <div className="flex items-center z-50 bg-white w-[400px] max-w-full h-80 hover:bg-gray-100 transition">
              {hit.icon ? (
                <div className="border rounded-full h-[40px] w-[40px] p-2 flex items-center justify-center m-14">
                  <p className="text-2xl">{hit.icon}</p>
                </div>
              ) : (
                <Avatar
                  src={`https://via.placeholder.com/900x900.png?text=No+Icon`}
                  className="m-14"
                />
              )}
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <h1 className="font-bold">#{hit.title}</h1>
                </div>
                <p className="line-clamp-2 text-xs font-light text-gray-600 pr-6">
                  {hit.description}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
const HitComponentCategories = () => {
  const { hits } = useHits();
  return (
    <div>
      {hits.length > 0 ? (
        <p className="font-light p-2 opacity-70 text-sm">Categories</p>
      ) : null}
      {hits.map((hit) => {
        return (
          <Link to={"/projects/category/" + hit.id} key={hit.id}>
            <div className="flex items-center z-50 bg-white w-[400px] max-w-full h-80 hover:bg-gray-100 transition">
              {hit.cover_image ? (
                <Avatar src={hit.cover_image} className="m-14" />
              ) : (
                <Avatar
                  src={`https://via.placeholder.com/900x900.png?text=No+Icon`}
                  className="m-14"
                />
              )}
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <h1 className="font-bold">{hit.title}</h1>
                  <p className="">{hit.icon}</p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

function SearchBar({
  placeholder,
  searchQuery = "", // Provide a default value for searchQuery
  onSearchQueryChange = () => {}, // Provide a default function for onSearchQueryChange
}: {
  placeholder: string;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
}) {
  const { refine } = useSearchBox();
  useEffect(() => {
    if (searchQuery !== undefined) {
      refine(searchQuery);
    }
  }, [searchQuery, refine]);
  return (
    <div className="relative mb-10">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch />
      </span>
      <input
        value={searchQuery}
        onChange={(e) => onSearchQueryChange(e.target.value ?? "")}
        placeholder={placeholder}
        className={`pl-40 pr-10 py-10 rounded-12 border-2 border-gray-200 transition-all duration-200 ease-in-out outline-none
                    focus:outline-[#9E88FF] focus:border-[rgb(179 160 255 / 1)] focus:ring-[rgb(179 160 255 / 0.5)] w-[400px] max-w-full`}
      />
    </div>
  );
}

export default function Search({ classes, ...props }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearchInput = () => {
    setSearchQuery("");
  };
  const searchClient = instantMeiliSearch(
    process.env.REACT_APP_MEILISEARCH_HOST as string,
    process.env.REACT_APP_MEILISEARCH_KEY as string,
    {
      placeholderSearch: false,
      primaryKey: "id",
    }
  );
  const placeholder = props.placeholder ?? "Search for anything";

  return (
    <div className={`${classes?.container}`}>
      <InstantSearch searchClient={searchClient} indexName="Stories">
        <Configure hitsPerPage={3} />
        <SearchBar
          placeholder={placeholder}
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
        />
        <div className="rounded-12 w-fit h-fit absolute bg-white max-h-96 overflow-scroll overflow-x-hidden">
          <div
            onClick={() => {
              clearSearchInput();
            }}
          >
            <Index indexName="Stories">
              <HitComponentStories />
            </Index>
          </div>
          <div
            onClick={() => {
              clearSearchInput();
            }}
          >
            <Index indexName="User">
              <HitComponentUsers />
            </Index>
          </div>
          <div
            onClick={() => {
              clearSearchInput();
            }}
          >
            <Index indexName="Tags">
              <HitComponentTags />
            </Index>
          </div>
          <div>
            <Index indexName="Category">
              <HitComponentCategories />
            </Index>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
