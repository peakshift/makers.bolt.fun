import { gql } from "@apollo/client";
import { ProjectCard, ProjectCategory } from "src/utils/interfaces";

export const PROJECTS_IN_CATEGORY_QUERY = gql`
query PROJECTS_IN_CATEGORY_QUERY($categoryId: Int!) {

  projectsByCategory(category_id: $categoryId) {
    id
    thumbnail_image
    title
    votes_count 
    category {
        title
        id
    }
  }

  getCategory(id: $categoryId) {
    id
    title 
    cover_image
    apps_count
  }
  
}
`
export type PROJECTS_IN_CATEGORY_QUERY_VARS = {
  categoryId: number;
}

export type PROJECTS_IN_CATEGORY_QUERY_RES_TYPE = {
  projectsByCategory: ProjectCard[],

  getCategory: {
    id: ProjectCategory['id']
    title: ProjectCategory['title']
    cover_image: ProjectCategory['cover_image']
    apps_count: ProjectCategory['apps_count']
  }
}