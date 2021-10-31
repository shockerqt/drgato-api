import { DataSources } from '../apis';
import { RemedyAttributes } from '../models/Remedy';

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
  success: boolean;
  message?: string;
  addedRemedy: RemedyAttributes;
  remedies: RemedyAttributes[];
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
    ): Promise<AddRemedyPayload> => dataSources.remedyAPI.addRemedy(input),

  },
};
