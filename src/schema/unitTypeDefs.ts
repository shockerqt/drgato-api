import { gql } from 'apollo-server-core';

export default gql`

  type Unit {
    id: ID!
    name: String!
  }

  extend type Query {
    units: [Unit]
    unit(id: ID!): Unit
  }

  extend type Mutation {
    addUnit(input: AddUnitInput!): AddUnitPayload!
    updateUnit(input: UpdateUnitInput!): UpdateUnitPayload!
    removeUnit(input: RemoveUnitInput!): RemoveUnitPayload!
  }

  input AddUnitInput {
    name: String!
  }

  type AddUnitPayload {
    success: Boolean!
    message: String
    addedUnit: Unit!
    units: [Unit]!
  }

  input UpdateUnitInput {
    id: ID!
    name: String
  }

  type UpdateUnitPayload {
    success: Boolean!
    message: String
    updatedUnit: Unit
    units: [Unit]
  }

  input RemoveUnitInput {
    id: ID!
  }

  type RemoveUnitPayload {
    success: Boolean!
    message: String
    removedUnit: Unit
    units: [Unit]
  }

`;
