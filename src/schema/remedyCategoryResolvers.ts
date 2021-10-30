import { RemedyCategoryInterface, ResolverContextInterface } from './schemaInterfaces';

export default {
  Query: {
    remedyCategories: (
      _: never,
      __: never,
      { dataSources }: ResolverContextInterface,
    ) => dataSources.remedyCategoryAPI.getAllRemedyCategories(),
    remedyCategory: (
      _: never,
      { id }: { id: number },
      { dataSources }: ResolverContextInterface,
    ) => dataSources.remedyCategoryAPI.getRemedyCategoryById(id),
  },
  Mutation: {
    addRemedyCategory: (
      _: never,
      { input }: { input: RemedyCategoryInterface },
      { dataSources }: ResolverContextInterface,
    ) => dataSources.remedyCategoryAPI.addRemedyCategory(input),
  },
};
