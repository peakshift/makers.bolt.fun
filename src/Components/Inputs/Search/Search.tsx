// @ts-nocheck
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import {
  InstantSearch,
  Index,
  Configure,
  useHits,
  useSearchBox,
} from "react-instantsearch";
import VoteButton from "src/Components/VoteButton/VoteButton";
import { Link } from "react-router-dom";
import { createRoute } from "src/utils/routing";
import { calcTimeSincePosting } from "src/features/Posts/Components/PostCard/PostCardHeader/PostCardHeader";
import IconButton from "src/Components/IconButton/IconButton";
import { FaTimes } from "react-icons/fa";

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
            key={hit.id}
            to={createRoute({
              type: "story",
              id: hit.id,
              title: hit.title,
            })}
          >
            <div className="flex p-16 gap-16 items-center z-50 bg-white max-w-full h-80 hover:bg-gray-100 justify-between transition">
              <img
                src={
                  hit.cover_image ??
                  "https://via.placeholder.com/1600x900.png?text=No+Cover+Image"
                }
                alt={hit.title}
                draggable="false"
                className="flex-shrink-0 h-40 aspect-square rounded-4 bg-gray-200 border-0 hover:cursor-pointer"
              ></img>
              <div className="flex grow flex-col">
                <h1 className="font-bold line-clamp-2">{hit.title}</h1>

                <time
                  dateTime={hit.createdAt}
                  className="text-xs font-light opacity-70"
                >
                  {calcTimeSincePosting(hit.createdAt)}
                </time>
              </div>
              <div className="px-2 flex flex-col justify-end">
                {/* <VoteButton
                  direction="vertical"
                  votes={hit.votes_count}
                  dense={true}
                /> */}
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
            key={hit.id}
            to={createRoute({
              type: "profile",
              id: hit.id,
              username: hit.name,
            })}
            aria-hidden="true"
            tabIndex={-1}
          >
            <div className="flex items-center z-50 bg-white max-w-full h-80 hover:bg-gray-100 transition">
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

const HitComponentProjects = () => {
  const { hits } = useHits();
  return (
    <div>
      {hits.length > 0 ? (
        <p className="font-light p-2 opacity-70 text-sm">Projects</p>
      ) : null}
      {hits.map((hit) => {
        return (
          <Link
            key={hit.id}
            to={createRoute({
              type: "project",
              tag: hit.hashtag,
            })}
            aria-hidden="true"
            tabIndex={-1}
          >
            <div className="flex p-16 gap-16 items-center z-50 bg-white max-w-full h-80 hover:bg-gray-100 transition">
              <img
                src={hit.thumbnail_image!}
                alt={hit.title}
                draggable="false"
                className="flex-shrink-0 w-40 h-40 bg-gray-200 border-0 rounded-full hover:cursor-pointer"
              ></img>
              <div className="justify-around items-start min-w-0 flex-1 hover:cursor-pointer">
                <p className="text-body4 w-full font-bold overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {hit.title}
                </p>
                <p className="text-body5 text-gray-600 font-light my-[5px]">
                  {hit.category.title}
                </p>
                {/* <span className="chip-small bg-warning-50 text-yellow-700 font-light text-body5 py-[3px] px-10"> <MdLocalFireDepartment className='inline-block text-fire transform text-body4 align-middle' /> {numberFormatter(project.votes_count)} </span> */}
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
            <div className="flex items-center z-50 bg-white max-w-full h-80 hover:bg-gray-100 transition">
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
            <div className="flex items-center z-50 bg-white max-w-full h-80 hover:bg-gray-100 transition">
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
                    focus:outline-[#9E88FF] focus:border-[rgb(179 160 255 / 1)] focus:ring-[rgb(179 160 255 / 0.5)] w-full`}
      />
      {searchQuery && (
        <IconButton
          className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-600"
          aria-label="clear search"
          onClick={() => onSearchQueryChange("")}
        >
          <FaTimes />
        </IconButton>
      )}
    </div>
  );
}

const searchClient = instantMeiliSearch(
  process.env.REACT_APP_MEILISEARCH_HOST as string,
  process.env.REACT_APP_MEILISEARCH_KEY as string,
  {
    placeholderSearch: false,
    primaryKey: "id",
  }
);

export default function Search({ classes, ...props }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnly, setShowOnly] = useState("");

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearchInput = () => {
    setSearchQuery("");
  };

  const toggleFilter = (filter: string) => {
    if (showOnly === filter) {
      setShowOnly("");
    } else {
      setShowOnly(filter);
    }
  };

  const placeholder = props.placeholder ?? "Search for anything";

  return (
    <div className={`w-full relative ${classes?.container}`}>
      <InstantSearch searchClient={searchClient} indexName="Stories">
        <Configure hitsPerPage={!!showOnly ? 10 : 3} />
        <SearchBar
          placeholder={placeholder}
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
        />
        {!!searchQuery && (
          <div className="rounded-12 h-fit w-full absolute bg-white max-h-96 overflow-scroll overflow-x-hidden">
            <div className="p-16 w-full">
              <p className="text-body5 font-medium mb-8">Show Only:</p>
              <div className="flex flex-wrap gap-8 ">
                <button
                  onClick={() => toggleFilter("stories")}
                  className={`p-4 px-12 text-body5 bg-gray-100 rounded-4 ${
                    showOnly === "stories" &&
                    "outline outline-1 font-bold outline-primary-500 text-primary-500"
                  }`}
                >
                  Stories
                </button>
                <button
                  onClick={() => toggleFilter("projects")}
                  className={`p-4 px-12 text-body5 bg-gray-100 rounded-4 ${
                    showOnly === "projects" &&
                    "outline outline-1 font-bold outline-primary-500 text-primary-500"
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => toggleFilter("users")}
                  className={`p-4 px-12 text-body5 bg-gray-100 rounded-4 ${
                    showOnly === "users" &&
                    "outline outline-1 font-bold outline-primary-500 text-primary-500"
                  }`}
                >
                  Users
                </button>
              </div>
            </div>
            {(!showOnly || showOnly === "stories") && (
              <div
                onClick={() => {
                  clearSearchInput();
                }}
              >
                <Index indexName="Stories">
                  <HitComponentStories />
                </Index>
              </div>
            )}
            {(!showOnly || showOnly === "projects") && (
              <div
                onClick={() => {
                  clearSearchInput();
                }}
              >
                <Index indexName="Projects">
                  <HitComponentProjects />
                </Index>
              </div>
            )}
            {(!showOnly || showOnly === "users") && (
              <div
                onClick={() => {
                  clearSearchInput();
                }}
              >
                <Index indexName="Users">
                  <HitComponentUsers />
                </Index>
              </div>
            )}
            {/* <div
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
          </div> */}
          </div>
        )}
      </InstantSearch>
    </div>
  );
}
