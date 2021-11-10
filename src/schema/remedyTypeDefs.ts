import { gql } from 'apollo-server';

export default gql`

  # type Section {
  #   name: ID!
  #   categories: [Category]
  # }

  type Category {
    name: ID!
    slug: String!
    remedies: [Remedy]
  }

  type Remedy {
    slug: ID!
    name: String!
    dose: String
    activePrinciple: String!
    laboratory: String!
    netContent: Int
    netContentUnit: String
    format: String
  }

  extend type Query {
    categories: [Category]
    category(name: ID!): Category
    remedy(slug: ID!): Remedy
  }

  extend type Mutation {
    addRemedy(input: AddRemedyInput!): AddRemedyPayload!
    updateRemedy(input: UpdateRemedyInput!): UpdateRemedyPayload!
    addCategory(input: AddCategoryInput!): AddCategoryPayload!
    # removeRemedy(input: RemoveRemedyInput!): RemoveRemedyPayload!
    # addPriceHistory(input: AddPriceHistoryInput!): AddPriceHistoryPayload!
    # addPriceStampToHistory(input: AddPriceStampToHistoryInput!): AddPriceStampToHistoryPayload!
  }

  input AddRemedyInput {
    name: String!
    category: String!
    dose: String
    activePrinciple: String!
    laboratory: String!
    netContent: Int
    netContentUnit: String
    format: String
  }

  type AddRemedyPayload {
    success: Boolean!
    message: String
    addedRemedy: Remedy
    remedies: [Remedy]
  }

  input UpdateRemedyInput {
    slug: String!
    name: String
    category: String
    dose: String
    activePrinciple: String
    laboratory: String
    netContent: Int
    netContentUnit: String
    format: String
  }

  type UpdateRemedyPayload {
    success: Boolean!
    message: String
    updatedRemedy: Remedy
    remedies: [Remedy]
  }

  input AddCategoryInput {
    name: ID!
  }

  type AddCategoryPayload {
    success: Boolean!
    message: String
    addedCategory: Category
    categories: [Category]
  }

  # input RemoveRemedyInput {
  #   id: ID!
  # }

  # type RemoveRemedyPayload {
  #   success: Boolean!
  #   message: String
  #   removedRemedy: Remedy
  #   remedies: [Remedy]
  # }

  # input AddPriceHistoryInput {
  #   remedyId: ID!
  #   pharmacyId: ID!
  #   url: String
  # }

  # type AddPriceHistoryPayload {
  #   success: Boolean!
  #   message: String
  #   updatedRemedy: Remedy
  #   priceHistories: [PriceHistory]
  # }

  # input AddPriceStampToHistoryInput {
  #   remedyId: ID!
  #   pharmacyId: ID!
  #   price: Int
  # }

  # type AddPriceStampToHistoryPayload {
  #   success: Boolean!
  #   message: String
  #   priceHistory: PriceHistory
  #   addedPriceStamp: PriceStamp
  # }

`;
