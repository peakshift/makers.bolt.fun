import { Project, ProjectCard, ProjectCategory } from "../utils/interfaces";
import { gql, useQuery } from "@apollo/client";
import data from "./mockData.json";

export async function getAllCategories(): Promise<ProjectCategory[]> {
  // let QUERY = gql`
  //   query GetCategories {
  //     allCategories {
  //       id
  //       title
  //     }
  //   }
  // `;
  return data.categories;
}

export async function getHottestProjects(): Promise<ProjectCard[]> {
  // let QUERY = gql`
  //   query {
  //     allProject {
  //       id
  //       cover_image
  //       thumbnail_image
  //       title
  //       website
  //       votes_count
  //     }
  //   }
  // `;
  return data.projectsCards;
}

export async function getProjectsByCategory(
  categoryId: string
): Promise<ProjectCard[]> {

  // let QUERY = gql`
  //   query Categories($categoryId: Int!){
  //     projectsByCategory(category_id: ${categoryId}) {
  //       id
  //       cover_image
  //       thumbnail_image
  //       title
  //       website
  //       lightning_address
  //       votes_count
  //     }
  //   }
  // `;
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
//   let QUERY = gql`
//     query Project(projectId: String!) {
//       getProject(id: $projectId) {
//         id
//         cover_image
//         thumbnail_image
//         title
//         website
//         votes_count
//       }
//     }
//   `;
  return data.project;
}
