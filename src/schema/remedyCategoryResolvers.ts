import { DataSources } from '../api';
import { RemedyCategory } from '../models';

export type AddRemedyCategoryInput = {
  name: string;
}

export type AddRemedyCategoryPayload = {
  success?: boolean
  message: string
  addedRemedyCategory: RemedyCategory
  remedyCategories: RemedyCategory[]
}

export default {

  Query: {

    remedyCategories: (
      _: never,
      __: never,
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyCategoryAPI.getAllRemedyCategories(),

    remedyCategory: (
      _: never,
      { id }: { id: number },
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyCategoryAPI.getRemedyCategoryById(id),

  },

  Mutation: {

    addRemedyCategory: (
      _: never,
      { input }: { input: AddRemedyCategoryInput },
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyCategoryAPI.addRemedyCategory(input),
  },

};
