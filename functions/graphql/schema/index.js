const { makeSchema } = require('nexus');
const { join } = require('path');
const types = require('../services')


const schema = makeSchema({
  types: types,
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'),
    schema: join(__dirname, '..', 'schema.graphql'),
  },
})

module.exports = schema;

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