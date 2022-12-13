import { openModal } from "react-url-modal";
import ProjectCardMini from "src/features/Projects/Components/ProjectCardMini/ProjectCardMini";
import ProjectCardMiniSkeleton from "src/features/Projects/Components/ProjectCardMini/ProjectCardMini.Skeleton";
import { ProjectCard } from "src/utils/interfaces";

interface Props {
  isLoading?: boolean;
  isLoadingMore?: boolean;
  projects: ProjectCard[];
}

export default function ProjectsGrid({
  isLoading,
  isLoadingMore,
  projects,
}: Props) {
  const handleClick = (projectId: string) => {
    openModal({
      name: "projectDetails",
      params: {
        projectId,
      },
    });
  };

  return (
    <div
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(296px, 1fr) )",
        display: "grid",
        gridGap: "24px",
      }}
    >
      {isLoading &&
        Array(12)
          .fill(0)
          .map((_, idx) => <ProjectCardMiniSkeleton key={idx} />)}
      {!isLoading && projects.length === 0 && (
        <p className="text-center text-gray-400 py-48 text-body2 font-medium col-span-full">
          No results found here...
        </p>
      )}
      {!isLoading &&
        projects.map((project) => (
          <ProjectCardMini
            key={project.id}
            project={project}
            onClick={handleClick}
          />
        ))}

      {isLoadingMore &&
        Array(4)
          .fill(0)
          .map((_, idx) => <ProjectCardMiniSkeleton key={idx} />)}
    </div>
  );
}
