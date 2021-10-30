import { gql } from 'apollo-server-core';

export default gql`

  type RemedyCategory {
    id: ID!
    name: String!
  }

  extend type Query {
    remedyCategories: [RemedyCategory]
    remedyCategory(id: ID!): RemedyCategory
  }

  extend type Mutation {
    addRemedyCategory(input: AddRemedyCategoryInput!): AddRemedyCategoryPayload!
    updateRemedyCategory(input: UpdateRemedyCategoryInput!): UpdateRemedyCategoryPayload!
    removeRemedyCategory(input: RemoveRemedyCategoryInput!): RemoveRemedyCategoryPayload!
  }

  input AddRemedyCategoryInput {
    name: String!
  }

  type AddRemedyCategoryPayload {
    success: Boolean!
    message: String
    addedRemedyCategory: RemedyCategory!
    remedyCategories: [RemedyCategory]!
  }

  input UpdateRemedyCategoryInput {
    id: ID!
    name: String
  }

  type UpdateRemedyCategoryPayload {
    success: Boolean!
    message: String
    updatedRemedyCategory: RemedyCategory
    remedies: [RemedyCategory]
  }

  input RemoveRemedyCategoryInput {
    id: ID!
  }

  type RemoveRemedyCategoryPayload {
    success: Boolean!
    message: String
    removedRemedyCategory: RemedyCategory
    remedyCategories: [RemedyCategory]
  }

`;
