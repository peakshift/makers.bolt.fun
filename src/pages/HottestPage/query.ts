import { gql } from "@apollo/client";
import { ProjectCard, ProjectCategory } from "src/utils/interfaces";

export const HOTTEST_PROJECTS_QUERY = gql`
query HOTTEST_PROJECTS {

  hottestProjects {
    
    title 
    cover_image
    apps_count

    project{
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
}
`
export type HOTTEST_PROJECTS_QUERY_VARS = {
}

export type HOTTEST_PROJECTS_QUERY_RES_TYPE = {

  hottestProjects: {
    title: ProjectCategory['title']
    cover_image: ProjectCategory['cover_image']
    apps_count: ProjectCategory['apps_count'],
    project: ProjectCard[]
  }
}