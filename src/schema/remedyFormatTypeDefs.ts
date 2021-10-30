import { gql } from 'apollo-server-core';

export default gql`

  type RemedyFormat {
    id: ID!
    name: String!
  }

  extend type Query {
    remedyFormats: [RemedyFormat]
    remedyFormat(id: ID!): RemedyFormat
  }

  extend type Mutation {
    addRemedyFormat(input: AddRemedyFormatInput!): AddRemedyFormatPayload!
    updateRemedyFormat(input: UpdateRemedyFormatInput!): UpdateRemedyFormatPayload!
    removeRemedyFormat(input: RemoveRemedyFormatInput!): RemoveRemedyFormatPayload!
  }

  input AddRemedyFormatInput {
    name: String!
  }

  type AddRemedyFormatPayload {
    success: Boolean!
    message: String
    addedRemedyFormat: RemedyFormat!
    remedyFormats: [RemedyFormat]!
  }

  input UpdateRemedyFormatInput {
    id: ID!
    name: String
  }

  type UpdateRemedyFormatPayload {
    success: Boolean!
    message: String
    updatedRemedyFormat: RemedyFormat
    remedyFormats: [RemedyFormat]
  }

  input RemoveRemedyFormatInput {
    id: ID!
  }

  type RemoveRemedyFormatPayload {
    success: Boolean!
    message: String
    removedRemedyFormat: RemedyFormat
    remedyFormats: [RemedyFormat]
  }

`;
