import React, { FormEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BsSearch } from "react-icons/bs";
import {
  useClickOutside,
  useThrottledCallback,
  useUpdateEffect,
} from "@react-hookz/web";
import SearchResults from "./SearchResults/SearchResults";
import { SearchProjectsQuery, useSearchProjectsLazyQuery } from "src/graphql";

interface Props {
  height?: number | string;
  width?: number | string;
  onClose?: () => void;
  onResultClick?: () => void;
  isOpen?: boolean;
}

export type ProjectSearchItem = SearchProjectsQuery["searchProjects"][number];

const SearchResultsListVariants = {
  hidden: {
    opacity: 0,
    y: 300,
    display: "none",
  },
  visible: {
    opacity: 1,
    y: 16,
    display: "block",
  },
};

export default function Search({
  width,
  height,
  onClose,
  onResultClick,
  isOpen,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // const { isOpen } = useAppSelector(state => ({
  //     isOpen:  state.ui.isSearchOpen
  // }))
  // const dispatch = useAppDispatch()

  useClickOutside(containerRef, () => {
    onClose?.();
  });

  const [executeQuery, { data, loading }] = useSearchProjectsLazyQuery();

  const throttledExecuteQuery = useThrottledCallback(
    (search: string) => {
      executeQuery({
        variables: {
          search,
        },
      });
    },
    [executeQuery],
    500
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    throttledExecuteQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    throttledExecuteQuery(searchInput);
    // Make Search Request
    // onSearch(searchInput);
  };

  useUpdateEffect(() => {
    if (isOpen) inputRef.current?.focus();
    else {
      setSearchInput("");
    }
  }, [isOpen]);

  return (
    <div className="relative z-20 h-full" ref={containerRef}>
      {
        <form
          className="flex items-center h-full"
          onSubmit={handleSubmit}
          style={{
            width: width ?? "100%",
            height: height ?? "100%",
          }}
        >
          <div className="input-wrapper border-0 !p-16 md:!py-12 !bg-gray-100 focus-within:!bg-gray-50 focus:ring-1 focus:ring-gray-300 !rounded-12">
            <BsSearch className={`input-icon w-16 mr-10 !p-0`} />
            <input
              type="text"
              ref={inputRef}
              className="input-text placeholder-black !p-0"
              placeholder="Search"
              value={searchInput}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Escape") onClose?.();
              }}
            />
          </div>
          <motion.div
            variants={SearchResultsListVariants}
            initial="hidden"
            animate={searchInput.length > 0 ? "visible" : "hidden"}
            className="absolute top-full translate-y-8 w-full left-0"
          >
            <SearchResults
              isLoading={loading}
              projects={data?.searchProjects}
              onResultClick={onResultClick}
            />
          </motion.div>
        </form>
      }
    </div>
  );
}
