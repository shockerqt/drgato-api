import { gql } from 'apollo-server-core';

export default gql`

  type Remedy {
    id: ID!
    name: String!
    category: RemedyCategory!
    dose: String
    activePrinciple: ActivePrinciple!
    laboratory: Laboratory!
    netContent: Int!
    netContentUnit: Unit!
    format: RemedyFormat
    priceHistories: [PriceHistory]
  }

  extend type Query {
    remedies: [Remedy]
    remedy(id: ID!): Remedy
  }

  extend type Mutation {
    addRemedy(input: AddRemedyInput!): AddRemedyPayload!
    updateRemedy(input: UpdateRemedyInput!): UpdateRemedyPayload!
    removeRemedy(input: RemoveRemedyInput!): RemoveRemedyPayload!
    addPriceHistory(input: AddPriceHistoryInput!): AddPriceHistoryPayload!
    addPriceStampToHistory(input: AddPriceStampToHistoryInput!): AddPriceStampToHistoryPayload!
  }

  input AddRemedyInput {
    name: String!
    category: String!
    dose: String
    activePrinciple: String!
    laboratory: String!
    netContent: Int!
    netContentUnit: String!
    format: String
  }

  type AddRemedyPayload {
    success: Boolean!
    message: String
    addedRemedy: Remedy
    remedies: [Remedy]
  }

  input UpdateRemedyInput {
    id: ID!
    name: String
    category: ID
    dose: String
    activePrinciple: ID
    laboratory: ID
    netContent: Int
    netContentUnit: ID
    format: ID
  }

  type UpdateRemedyPayload {
    success: Boolean!
    message: String
    updatedRemedy: Remedy
    remedies: [Remedy]
  }

  input RemoveRemedyInput {
    id: ID!
  }

  type RemoveRemedyPayload {
    success: Boolean!
    message: String
    removedRemedy: Remedy
    remedies: [Remedy]
  }

  input AddPriceHistoryInput {
    remedyId: ID!
    pharmacyId: ID!
    url: String
  }

  type AddPriceHistoryPayload {
    success: Boolean!
    message: String
    updatedRemedy: Remedy
    priceHistories: [PriceHistory]
  }

  input AddPriceStampToHistoryInput {
    remedyId: ID!
    pharmacyId: ID!
    price: Int
  }

  type AddPriceStampToHistoryPayload {
    success: Boolean!
    message: String
    priceHistory: PriceHistory
    addedPriceStamp: PriceStamp
  }

`;
