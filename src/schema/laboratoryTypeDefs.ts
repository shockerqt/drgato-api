import { gql } from 'apollo-server-core';

export default gql`

  type Laboratory {
    id: ID!
    name: String!
  }

  extend type Query {
    laboratories: [Laboratory]
    laboratory(id: ID!): Laboratory
  }

  extend type Mutation {
    addLaboratory(input: AddLaboratoryInput!): AddLaboratoryPayload!
    updateLaboratory(input: UpdateLaboratoryInput!): UpdateLaboratoryPayload!
    removeLaboratory(input: RemoveLaboratoryInput!): RemoveLaboratoryPayload!
  }

  input AddLaboratoryInput {
    name: String!
  }

  type AddLaboratoryPayload {
    success: Boolean!
    message: String
    addedLaboratory: Laboratory!
    laboratories: [Laboratory]!
  }

  input UpdateLaboratoryInput {
    id: ID!
    name: String
  }

  type UpdateLaboratoryPayload {
    success: Boolean!
    message: String
    updatedLaboratory: Laboratory
    laboratories: [Laboratory]
  }

  input RemoveLaboratoryInput {
    id: ID!
  }

  type RemoveLaboratoryPayload {
    success: Boolean!
    message: String
    removedLaboratory: Laboratory
    laboratories: [Laboratory]
  }

`;
