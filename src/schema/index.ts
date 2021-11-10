import { gql } from 'apollo-server';

import { dateScalar } from './scalars';
import remedyTypeDefs from './remedyTypeDefs';
import remedyResolvers from './remedyResolvers';

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
];

export const resolvers = [
  { Date: dateScalar },
  remedyResolvers,
];
