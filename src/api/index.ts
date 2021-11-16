import { Project, ProjectCard, ProjectCategory } from "../utils/interfaces";
import data from "./mockData.json";

export async function getAllCategories(): Promise<ProjectCategory[]> {
  return data.categories;
}

export async function getHottestProjects(): Promise<ProjectCard[]> {
  return data.projectsCards;
}

export async function getProjectsByCategory(
  categoryId: string
): Promise<ProjectCard[]> {
  return data.projectsCards;
}

// returns the latest bunch of projects in each ( or some ) categories, and returns the hottest projects
export async function getLatestProjects(): Promise<
  { title: string; projects: ProjectCard[] }[]
> {
  return [{ title: "hottest_apps", projects: data.projectsCards }].concat(
    data.categories.slice(0, 2).map((cat) => ({
      title: cat.title,
      projects: data.projectsCards,
    }))
  );
}

export async function getProjectById(projectId: string): Promise<Project> {
  return data.project;
}
