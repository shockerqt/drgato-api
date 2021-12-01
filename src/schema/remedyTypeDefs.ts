import { gql } from 'apollo-server';

export default gql`

  type Category {
    slug: ID!
    name: String!
    remedies: [Remedy]
  }

  type Pharmacy {
    slug: ID!
    name: String!
  }

  type Remedy {
    slug: ID!
    name: String!
    category: Category!
    dose: String
    activePrinciple: String!
    laboratory: String!
    netContent: Int
    netContentUnit: String
    format: String
    vendors: [Vendor]!
  }

  type Vendor {
    pharmacy: Pharmacy!
    url: String!
    lastPrice: Int
  }

  extend type Query {
    categories: [Category]
    category(name: String!): Category
    remedies: [Remedy]
    remedy(slug: ID!): Remedy
    pharmacies: [Pharmacy]
    pharmacy: Pharmacy
    vendors(remedySlug: ID!): [Vendor]
  }

  extend type Mutation {
    addRemedy(input: AddRemedyInput!): AddRemedyPayload!
    updateRemedy(input: UpdateRemedyInput!): UpdateRemedyPayload!
    addCategory(input: AddCategoryInput!): AddCategoryPayload!
    addPharmacy(input: AddPharmacyInput!): AddPharmacyPayload!
    addVendor(input: AddVendorInput!): AddVendorPayload!
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
  }

  input AddCategoryInput {
    name: ID!
  }

  type AddCategoryPayload {
    success: Boolean!
    message: String
    addedCategory: Category
  }

  input AddPharmacyInput {
    name: ID!
  }

  type AddPharmacyPayload {
    success: Boolean!
    message: String
    addedPharmacy: Pharmacy
  }
  
  input AddVendorInput {
    remedySlug: String!
    pharmacySlug: String!
    url: String!
  }

  type AddVendorPayload {
    success: Boolean!
    message: String
    addedVendor: Vendor
    updatedRemedy: Remedy
  }

`;
