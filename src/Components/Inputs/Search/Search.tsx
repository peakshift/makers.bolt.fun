import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import {
  InstantSearch,
  useSearchBox,
  Hits,
  Index,
  Configure,
} from "react-instantsearch";
import VoteButton from "src/Components/VoteButton/VoteButton";
import Sugar from "sugar";
import { Link } from "react-router-dom";
import { createRoute } from "src/utils/routing";

interface Props {
  classes?: {
    container?: string;
    input?: string;
  };
  placeholder?: string;
}

const HitComponentStories = ({ hit }: { hit: any }) => {
  return (
    <Link
      to={createRoute({
        type: "story",
        id: hit.id,
        title: hit.title,
      })}
    >
      <div className="flex items-center z-50 border bg-white rounded-12 w-[400px] max-w-full h-80 justify-between">
        {hit.cover_image ? (
          <img
            src={hit.cover_image}
            alt="story cover"
            className="h-full rounded-l-12 mr-16"
          />
        ) : (
          <img
            src="https://via.placeholder.com/1600x900.png?text=No+Cover+Image"
            alt="story cover"
            className="h-full rounded-l-12 mr-16"
          />
        )}
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <h1 className="font-bold line-clamp-2">{hit.title}</h1>
            {/* <p className="text-xs font-light opacity-70">by {hit.user}</p> */}
          </div>
          <p className="text-xs font-light opacity-70">
            {Sugar.Date.relative(new Date(hit.createdAt))}
          </p>
          {/* <p className="line-clamp-2 text-xs font-light text-gray-600">{hit.excerpt}</p> */}
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
};
const HitComponentUsers = ({ hit }: { hit: any }) => {
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
      <div className="flex items-center z-50 border bg-white rounded-12 w-[400px] max-w-full h-80">
        {hit.avatar ? (
          <Avatar src={hit.avatar} className="mx-16" />
        ) : (
          <Avatar
            src={"https://via.placeholder.com/900x900.png?text=No+Avatar+Image"}
            className="mx-16"
          />
        )}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <h1 className="font-bold max-w-fit break-all pr-2">{hit.name}</h1>
          </div>
          <p className="line-clamp-2 text-xs font-light text-gray-600">
            {hit.jobTitle}
          </p>
          <p className="line-clamp-2 text-xs font-light text-gray-600">
            Joined {Sugar.Date.relative(new Date(hit.join_date))}
          </p>
        </div>
      </div>
    </Link>
  );
};
const HitComponentTags = ({ hit }: { hit: any }) => {
  return (
    <Link to={createRoute({ type: "tag-page", tag: hit.title })} key={hit.id}>
      <div className="flex items-center z-50 border bg-white rounded-12 w-[400px] max-w-full h-80">
        {hit.icon ? (
          <div className="border rounded-full h-[40px] w-[40px] p-2 flex items-center justify-center mx-16">
            <p className="text-2xl">{hit.icon}</p>
          </div>
        ) : (
          <Avatar
            src={`https://via.placeholder.com/900x900.png?text=No+Icon`}
            className="mx-16"
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
};
const HitComponentCategories = ({ hit }: { hit: any }) => {
  return (
    <Link to={"/projects/category/" + hit.id} key={hit.id}>
      <div className="flex items-center z-50 border bg-white rounded-12 w-[400px] max-w-full h-80">
        {hit.cover_image ? (
          <img
            src={hit.cover_image}
            alt="story cover"
            className="h-full rounded-l-12 mr-16"
          />
        ) : (
          <img
            src="https://via.placeholder.com/1600x900.png?text=No+Cover+Image"
            alt="story cover"
            className="h-full rounded-l-12 mr-16"
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

  console.log(process.env);
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
        <div className="rounded-12 w-fit h-fit absolute">
          <Index indexName="Stories">
            <Hits
              hitComponent={HitComponentStories}
              onClick={() => {
                clearSearchInput();
              }}
            />
          </Index>
          <Index indexName="User">
            <Hits
              hitComponent={HitComponentUsers}
              onClick={() => {
                clearSearchInput();
              }}
            />
          </Index>
          <Index indexName="Tags">
            <Hits
              hitComponent={HitComponentTags}
              onClick={() => {
                clearSearchInput();
              }}
            />
          </Index>
          <Index indexName="Category">
            <Hits
              hitComponent={HitComponentCategories}
              onClick={() => {
                clearSearchInput();
              }}
            />
          </Index>
        </div>
      </InstantSearch>
    </div>
  );
}
