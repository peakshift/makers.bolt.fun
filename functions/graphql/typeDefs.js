const { gql } = require("apollo-server-lambda");

module.exports = gql`
  type Project {
    id: Int!
    cover_image: String!
    thumbnail_image: String!
    title: String!
    website: String!
    lightning_address: String!
    votes_count: Int!
    category: Category!
  }

  type Category {
    id: Int!
    title: String!
  }

  type Vote {
    id: Int!
    project: Project!
    amount_in_sat: Int!
    payment_request: String!
    payment_hash: String!
    paid: Boolean!
  }

  type Query {
    allProjects: [Project]!
    getProject(id: Int!): Project
    allCategories: [Category]!
  }
  type Mutation {
    vote (project_id: Int!, amount_in_sat: Int!): Vote!
    confirmVote (payment_request: String!, preimage: String!): Vote!
  }
`;
