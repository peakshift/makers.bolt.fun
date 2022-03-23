import { gql } from "@apollo/client";
import { Project } from "src/utils/interfaces";

export const PROJECT_BY_ID_QUERY = gql`
  query Project($projectId: Int!) {
    getProject(id: $projectId) {
      id
      cover_image
      thumbnail_image
      title
      description
      website
      votes_count
      screenshots
      category {
        title
        id
      }
    }
  }
`;

export interface PROJECT_BY_ID_RES {
  getProject: Project;
}

export interface PROJECT_BY_ID_VARS {
  projectId: number;
}
