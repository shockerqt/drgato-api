import { gql } from 'apollo-server-core';

export default gql`

  type PriceHistory {
    id: ID!
    remedy: Remedy!
    pharmacy: Pharmacy!
    url: String
    priceStamps: [PriceStamp]
  }
  
  extend type Query {
    priceHistories(remedyId: ID!, pharmacyId: ID!): [PriceHistory]
    priceHistory(priceHistoryId: ID!): PriceHistory
    lastPriceStampPerPharmacy(remedyId: ID!): [LastPriceStamp]
  }

  extend type Mutation {
    addPriceStampToHistory(input: AddPriceStampToHistoryInput!): AddPriceStampToHistoryPayload!
    removePriceStampFromHistory(input: RemovePriceFromHistoryInput!): RemovePriceFromHistoryPayload!
  }

  type LastPriceStamp {
    remedyId: ID!
    pharmacyId: ID!
    price: Int
    date: Date!
  }

  input AddPriceStampToHistoryInput {
    remedyId: ID!
    pharmacyId: ID!
    date: Date!
    price: Int
  }

  type AddPriceStampToHistoryPayload {
    success: Boolean!
    message: String
    addedPriceStamp: PriceStamp!
    priceHistory: PriceHistory!
  }

  input RemovePriceFromHistoryInput {
    remedyId: ID!
    pharmacyId: ID!
  }

  type RemovePriceFromHistoryPayload {
    success: Boolean!
    message: String
    removedPriceStamp: PriceStamp!
    priceHistory: PriceHistory!
  }

`;
