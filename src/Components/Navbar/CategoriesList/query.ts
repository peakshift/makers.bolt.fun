import { gql } from "@apollo/client";
import { ProjectCategory } from "src/utils/interfaces";

export const ALL_CATEGORIES_QUERY = gql`
  query AllCategories {
    allCategories {
      id
      title
      icon
      votes_sum
    }
  }
`;

export type ALL_CATEGORIES_QUERY_RES = {
  allCategories: Pick<ProjectCategory,
    | 'id'
    | 'title'
    | 'icon'
    | 'votes_sum'
  >[];
};
