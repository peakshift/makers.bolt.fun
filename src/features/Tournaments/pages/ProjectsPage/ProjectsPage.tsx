import { useDebouncedState } from "@react-hookz/web";
import { useState } from "react";
import { useGetProjectsInTournamentQuery } from "src/graphql";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { useTournament } from "../TournamentDetailsPage/TournamentDetailsContext";
import ProjectCard from "./ProjectCard/ProjectCard";
import ProjectCardSkeleton from "./ProjectCard/ProjectCard.Skeleton";
import ProjectsFilters, {
  TrackFilterType,
} from "./ProjectsFilters/ProjectsFilters";
import MyTournamentProjects from "./MyTournamentProjects/MyTournamentProjects";
import Button from "src/Components/Button/Button";
import { openModal } from "src/redux/features/modals.slice";

export default function ProjectsPage() {
  const dispatch = useAppDispatch();
  const {
    tournamentDetails: {
      id,
      title,
      tracks,
      config: { projectsSubmissionOpen },
    },

    myParticipationInfo,
  } = useTournament();
  const isLoggedIn = useAppSelector((s) => !!s.user.me);

  const [searchFilter, setSearchFilter] = useState("");
  const [debouncedsearchFilter, setDebouncedSearchFilter] = useDebouncedState(
    "",
    500
  );
  const [trackFilter, setTrackFilter] = useState<TrackFilterType | null>(null);
  const [allProjectsCount, setAllProjectsCount] = useState<number | null>(null);
  const [curTab, setCurTab] =
    useState<"all-projects" | "my-projects">("all-projects");

  const query = useGetProjectsInTournamentQuery({
    variables: {
      tournamentId: id,
      trackId: trackFilter?.id ?? null,
      roleId: null,
      search: debouncedsearchFilter,
      skip: 0,
      take: 200,
    },
    onCompleted: (data) => {
      if (
        !allProjectsCount ||
        data.getProjectsInTournament.projects.length > allProjectsCount
      )
        setAllProjectsCount(data.getProjectsInTournament.allItemsCount);
    },
  });

  const changeSearchFilter = (new_value: string) => {
    setSearchFilter(new_value);
    setDebouncedSearchFilter(new_value);
  };

  const myFilteredProjects = myParticipationInfo?.projects
    .filter((p) => {
      if (!trackFilter) return true;
      return p.track?.id === trackFilter.id;
    })
    .filter((p) => {
      if (!searchFilter) return true;
      const rgx = new RegExp(searchFilter, "i");
      return (
        p.project.title.search(rgx) !== -1 ||
        p.project.description.search(rgx) !== -1
      );
    })
    .map((p) => p.project);

  const myProjectsCount = myParticipationInfo?.projects.length;

  const isRegistered = !!myParticipationInfo;

  const currentProjectsCount =
    curTab === "all-projects"
      ? !!query.data?.getProjectsInTournament.projects &&
        query.data.getProjectsInTournament.projects.length
      : myFilteredProjects?.length;

  const isEmpty = allProjectsCount !== null && allProjectsCount === 0;

  return (
    <div className="pb-42 flex flex-col gap-24">
      <h2 className="text-body1 font-bolder text-gray-900">
        Projects 🚀 {!!currentProjectsCount && `(${currentProjectsCount})`}
      </h2>

      <div className="flex flex-wrap justify-between items-center gap-16">
        <div className="select-none flex gap-8">
          <button
            className={` 
                   min-w-max rounded-48 px-16 py-8 cursor-pointer font-medium text-body5
                    active:scale-95 transition-transform
                    ${
                      curTab === "all-projects"
                        ? "bg-primary-100 text-primary-600"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                    }
                     `}
            onClick={() => setCurTab("all-projects")}
          >
            All projects {!!allProjectsCount && `(${allProjectsCount})`}
          </button>
          {!!myParticipationInfo && (
            <button
              className={` 
                   min-w-max rounded-48 px-16 py-8 cursor-pointer font-medium text-body5
                    active:scale-95 transition-transform
                    ${
                      curTab === "my-projects"
                        ? "bg-primary-100 text-primary-600"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                    }
                     `}
              onClick={() => setCurTab("my-projects")}
            >
              My Projects {!!myProjectsCount && `(${myProjectsCount})`}
            </button>
          )}
        </div>
        {projectsSubmissionOpen && isRegistered && (
          <Button
            disabled={!isLoggedIn}
            size="sm"
            className="hidden md:block"
            color="primary"
            onClick={() =>
              dispatch(
                openModal({
                  Modal: "AddProjectTournamentModal",
                  props: {
                    tournament: { id, title, tracks },
                    myRegisteredProjectsIds:
                      myParticipationInfo?.projects.map((p) => p.project.id) ??
                      [],
                  },
                })
              )
            }
          >
            {isLoggedIn ? "+ Add project" : "Login to add project"}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
        <ProjectsFilters
          searchValue={searchFilter}
          onSearchChange={changeSearchFilter}
          trackValue={trackFilter}
          onTrackChange={setTrackFilter}
        />
        {projectsSubmissionOpen && (
          <Button
            disabled={!isLoggedIn}
            fullWidth
            className="md:hidden"
            color="primary"
            onClick={() =>
              dispatch(
                openModal({
                  Modal: "AddProjectTournamentModal",
                  props: {
                    tournament: { id, title, tracks },
                    myRegisteredProjectsIds:
                      myParticipationInfo?.projects.map((p) => p.project.id) ??
                      [],
                  },
                })
              )
            }
          >
            {isLoggedIn ? "+ Add project" : "Login to add project"}
          </Button>
        )}
        {curTab === "all-projects" ? (
          query.loading ? (
            Array(9)
              .fill(0)
              .map((_, idx) => <ProjectCardSkeleton key={idx} />)
          ) : !isEmpty ? (
            query.data?.getProjectsInTournament.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p className="flex py-48 flex-col text-body3 justify-center items-center text-gray-400 text-center col-[1/-1]">
              No projects added yet. Be the first & add your project now!
            </p>
          )
        ) : myParticipationInfo?.projects.length !== 0 ? (
          <MyTournamentProjects
            key={myParticipationInfo?.projects.length}
            projects={myFilteredProjects ?? []}
          />
        ) : (
          <p className="flex py-48 flex-col text-body3 justify-center items-center text-gray-400 text-center col-[1/-1]">
            Your tournament project(s) will show here. You currently do not have
            any projects entered
          </p>
        )}
      </div>
    </div>
  );
}
