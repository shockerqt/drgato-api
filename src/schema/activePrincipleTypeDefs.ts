import { gql } from 'apollo-server-core';

export default gql`

  type ActivePrinciple {
    id: ID!
    name: String!
  }

  extend type Query {
    activePriciples: [ActivePrinciple]
    activePrinciple(id: ID!): ActivePrinciple
  }

  extend type Mutation {
    addActivePrinciple(input: AddActivePrincipleInput!): AddActivePrinciplePayload!
    updateActivePrinciple(input: UpdateActivePrincipleInput!): UpdateActivePrinciplePayload!
    removeActivePrinciple(input: RemoveActivePrincipleInput!): RemoveActivePrinciplePayload!
  }

  input AddActivePrincipleInput {
    name: String!
  }

  type AddActivePrinciplePayload {
    success: Boolean!
    message: String
    addedActivePrinciple: ActivePrinciple!
    activePriciples: [ActivePrinciple]!
  }

  input UpdateActivePrincipleInput {
    id: ID!
    name: String
  }

  type UpdateActivePrinciplePayload {
    success: Boolean!
    message: String
    updatedActivePrinciple: ActivePrinciple
    activePriciples: [ActivePrinciple]
  }

  input RemoveActivePrincipleInput {
    id: ID!
  }

  type RemoveActivePrinciplePayload {
    success: Boolean!
    message: String
    removedActivePrinciple: ActivePrinciple
    activePriciples: [ActivePrinciple]
  }

`;
