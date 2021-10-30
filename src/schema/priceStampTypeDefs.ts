import { gql } from 'apollo-server-core';

export default gql`

  type PriceStamp {
    id: ID!
    date: Date!
    price: Int
  }

  extend type Query {
    priceStamps: [PriceStamp]
    priceStamp(id: ID!): PriceStamp
  }

  extend type Mutation {
    addPriceStamp(input: AddPriceStampInput!): AddPriceStampPayload!
    updatePriceStamp(input: UpdatePriceStampInput!): UpdatePriceStampPayload!
    removePriceStamp(input: RemovePriceStampInput!): RemovePriceStampPayload!
  }

  input AddPriceStampInput {
    price: String!
  }

  type AddPriceStampPayload {
    success: Boolean!
    message: String
    addedPriceStamp: PriceStamp!
    priceHistory: PriceHistory!
  }

  input UpdatePriceStampInput {
    id: ID!
    price: Int
  }

  type UpdatePriceStampPayload {
    success: Boolean!
    message: String
    updatedPriceStamp: PriceStamp
    priceHistory: PriceHistory!
  }

  input RemovePriceStampInput {
    id: ID!
  }

  type RemovePriceStampPayload {
    success: Boolean!
    message: String
    removedPriceStamp: PriceStamp
    priceHistory: PriceHistory!
  }

`;
