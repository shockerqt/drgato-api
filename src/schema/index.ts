import { gql } from 'apollo-server-core';

import { dateScalar } from './scalars';
import remedyCategoryTypeDefs from './remedyCategoryTypeDefs';
import remedyTypeDefs from './remedyTypeDefs';
import remedyResolvers from './remedyResolvers';
import laboratoryTypeDefs from './laboratoryTypeDefs';
import unitTypeDefs from './unitTypeDefs';
import remedyFormatTypeDefs from './remedyFormatTypeDefs';
import priceHistoryTypeDefs from './priceHistoryTypeDefs';
import priceStampTypeDefs from './priceStampTypeDefs';
import pharmacyTypeDefs from './pharmacyTypeDefs';
import activePrincipleTypeDefs from './activePrincipleTypeDefs';

const root = gql`
  scalar Date

  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

export const typeDefs = [
  root,
  remedyTypeDefs,
  remedyCategoryTypeDefs,
  activePrincipleTypeDefs,
  laboratoryTypeDefs,
  unitTypeDefs,
  remedyFormatTypeDefs,
  pharmacyTypeDefs,
  priceHistoryTypeDefs,
  priceStampTypeDefs,
];

export const resolvers = [
  { Date: dateScalar },
  remedyResolvers,
];
