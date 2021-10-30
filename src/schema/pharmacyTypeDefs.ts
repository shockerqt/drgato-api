import { gql } from 'apollo-server-core';

export default gql`

  type Pharmacy {
    id: ID!
    name: String!
  }

  extend type Query {
    pharmacies: [Pharmacy]
    pharmacy(id: ID!): Pharmacy
  }

  extend type Mutation {
    addPharmacy(input: AddPharmacyInput!): AddPharmacyPayload!
    updatePharmacy(input: UpdatePharmacyInput!): UpdatePharmacyPayload!
    removePharmacy(input: RemovePharmacyInput!): RemovePharmacyPayload!
  }

  input AddPharmacyInput {
    name: String!
  }

  type AddPharmacyPayload {
    success: Boolean!
    message: String
    addedPharmacy: Pharmacy!
    pharmacies: [Pharmacy]!
  }

  input UpdatePharmacyInput {
    id: ID!
    name: String
  }

  type UpdatePharmacyPayload {
    success: Boolean!
    message: String
    updatedPharmacy: Pharmacy
    pharmacies: [Pharmacy]
  }

  input RemovePharmacyInput {
    id: ID!
  }

  type RemovePharmacyPayload {
    success: Boolean!
    message: String
    removedPharmacy: Pharmacy
    pharmacies: [Pharmacy]
  }

`;
