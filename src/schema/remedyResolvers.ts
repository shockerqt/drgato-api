import { DataSources } from '../apis';
import { Remedy } from '../models';

export type AddRemedyInput = {
  name: string;
  category: string;
  dose?: string;
  activePrinciple: string;
  laboratory: string;
  netContent: number;
  netContentUnit: string;
  format?: string;
}

export type AddRemedyPayload = {
  success?: boolean
  message: string
  addedRemedy: Remedy
  remedies: Remedy[]
}

export default {
  Query: {

    remedies: (
      _: never,
      __: never,
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getAllRemedies(),

    remedy: (
      _: never,
      { id }: { id: number },
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getRemedyById(id),

  },

  Mutation: {

    addRemedy: (
      _: never,
      { input }: { input: AddRemedyInput },
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.addRemedy(input),

  },
};
