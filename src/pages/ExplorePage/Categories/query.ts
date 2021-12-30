import { gql } from "@apollo/client";
import { ProjectCategory } from "src/utils/interfaces";

export const ALL_CATEGORIES_QUERY = gql`
  query AllCategories {
    allCategories {
      id
      title
    }
  }
`;

export type ALL_CATEGORIES_QUERY_RES = {
  allCategories: ProjectCategory[];
};
