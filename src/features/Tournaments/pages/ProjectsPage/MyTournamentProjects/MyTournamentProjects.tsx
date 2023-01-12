import ProjectCard, {
  TournamentProjectCardType,
} from "../ProjectCard/ProjectCard";

interface Props {
  projects: TournamentProjectCardType[];
}

export default function MyTournamentProjects({ projects }: Props) {
  return (
    <>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} isOwner />
      ))}
    </>
  );
}
