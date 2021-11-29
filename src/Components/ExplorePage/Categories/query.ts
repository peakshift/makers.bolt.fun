import { gql } from "@apollo/client";

export const QUERY_ALL_CATEGORIES = gql`
  query AllCategories {
    allCategories {
      id
      title
    }
  }
`;
