const { gql } = require("apollo-server-lambda");

module.exports = gql`
  type Project {
    id: Int!
    cover_image: String!
    thumbnail_image: String!
    title: String!
    website: String!
    votes_count: Int!
    category: Category!
  }

  type Category {
    id: Int!
    title: String!
  }

  type Query {
    allProjects: [Project]!
    getProject(id: Int!): Project
    allCategories: [Category]!
  }
`;
