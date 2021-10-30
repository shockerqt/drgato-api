import { RemedyInterface, ResolverContextInterface } from './schemaInterfaces';

export default {
  Query: {
    remedies: (
      _: never,
      __: never,
      { dataSources }: ResolverContextInterface,
    ) => dataSources.remedyAPI.getAllRemedies(),
    remedy: (
      _: never,
      { id }: { id: number },
      { dataSources }: ResolverContextInterface,
    ) => dataSources.remedyAPI.getRemedyById(id),
  },
  Mutation: {
    addRemedy: (
      _: never,
      { input }: { input: RemedyInterface },
      { dataSources }: ResolverContextInterface,
    ) => dataSources.remedyAPI.addRemedy(input),
  },
};
