import { gql } from "@apollo/client";
import { ProjectCard } from "src/utils/interfaces";

export const SEARCH_PROJECTS_QUERY = gql`
query SEARCH_PROJECTS_QUERY($search: String!) {

  searchProjects(search: $search) {
    id
    thumbnail_image
    title
    category {
        title
        id
    }
  }
  
}
`
export type SEARCH_PROJECTS_QUERY_VARS = {
    search: string;
}

export type SEARCH_PROJECTS_QUERY_RES_TYPE = {
    searchProjects: ProjectCard[],
}