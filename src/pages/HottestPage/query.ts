import { gql } from "@apollo/client";
import { ProjectCard } from "src/utils/interfaces";

export const HOTTEST_PROJECTS_QUERY = gql`
query HOTTEST_PROJECTS {

  hottestProjects {
      id
      thumbnail_image
      title
      votes_count 
      category {
          title
          id
      }
  }
}
`
export type HOTTEST_PROJECTS_QUERY_VARS = {
}

export type HOTTEST_PROJECTS_QUERY_RES_TYPE = {

  hottestProjects: ProjectCard[]
}