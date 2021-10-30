import { Remedy } from '../models';
import { ResolverContextInterface } from './schemaInterfaces';

export type AddRemedyInput = {
  name: string;
  category?: string;
  categoryId?: number;
  dose?: string;
  activePrinciple?: string;
  activePrincipleId?: number;
  laboratory?: string;
  laboratoryId?: number
  netContent: number
  netContentUnit?: string;
  netContentUnitId?: number;
  formatId?: string;
  format?: number;
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
      { input }: { input: AddRemedyInput },
      { dataSources }: ResolverContextInterface,
    ) => dataSources.remedyAPI.addRemedy(input),
  },
};
