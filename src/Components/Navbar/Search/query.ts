import { gql } from "@apollo/client";
import { ProjectCard, ProjectCategory } from "src/utils/interfaces";

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

export type ProjectSearchItem =
  (
    Pick<ProjectCard,
      | 'id'
      | 'thumbnail_image'
      | 'title'>
    &
    {
      category: Pick<ProjectCategory,
        | 'id'
        | 'title'>
    }
  )

export type SEARCH_PROJECTS_QUERY_RES_TYPE = {
  searchProjects: ProjectSearchItem[],
}