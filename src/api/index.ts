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
  { category: ProjectCategory; projects: ProjectCard[] }[]
> {
  return data.categories.slice(0, 3).map((cat) => ({
    category: cat,
    projects: data.projectsCards,
  }));
}

export async function getProjectById(projectId: string): Promise<Project> {
  return data.project;
}
