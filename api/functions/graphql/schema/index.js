import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "../types";

const schema = makeSchema({
  types: Object.values(types),
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "schema.graphql"),
  },
});

export default schema;

// const { gql } = require("apollo-server-lambda");
// const projectSchema = require('./project')
// const categorySchema = require('./category')
// const voteSchema = require('./vote')

// const linkSchema = gql`
//   type Query {
//     _: Boolean
//   }

//   type Mutation {
//     _: Boolean
//   }

//   type Subscription {
//     _: Boolean
//   }
// `;

// module.exports = [linkSchema, categorySchema, projectSchema, voteSchema];
