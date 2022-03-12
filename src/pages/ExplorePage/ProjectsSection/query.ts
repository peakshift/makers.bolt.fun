import { gql } from "@apollo/client";
import { ProjectCard, ProjectCategory } from "src/utils/interfaces";

export const ALL_CATEGORIES_PROJECTS_QUERY = gql`
  query AllCategoriesProjects {
    allCategories {
      id
      title
      project {
        id
        thumbnail_image
        title
        votes_count
      }
    }
    newProjects {
      id
      title
      thumbnail_image
      votes_count
      category {
        title
        id
      }
    }
  }
`;

export type ALL_CATEGORIES_PROJECTS_RES = {
  newProjects: ProjectCard[],

  allCategories: {
    id: number;
    title: string;
    project: ProjectCard[];
  }[];
};
