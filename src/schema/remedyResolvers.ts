import { DataSources } from '..';
import { AddRemedyInput } from '../api/remedy';

export default {
  Query: {

    remedies: (
      _: never,
      __: never,
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getAllRemedies(),

    remediesByCategory: (
      _: never,
      __: never,
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getRemediesByCategory(),

    remedy: (
      _: never,
      { slug }: { slug: string },
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getRemedyBySlug(slug),

  },

  Mutation: {

    addRemedy: (
      _: never,
      { input }: { input: AddRemedyInput },
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.addRemedy(input),

  },
};
