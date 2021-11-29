import { gql } from "@apollo/client";

export const QUERY_PROJECT_BY_ID = gql`
  query GetProject($getProjectId: Int!) {
    getProject(id: $getProjectId) {
      id
      cover_image
      thumbnail_image
      title
      website
      votes_count
      category {
        id
        title
      }
    }
  }
`;
