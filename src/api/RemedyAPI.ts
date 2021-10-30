import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { UserInputError } from 'apollo-server-core';
import { PriceStamp, Remedy, RemedyCategory } from '../models';
import { AddRemedyInput } from '../schema/remedyResolvers';
import { RemedyInterface } from '../schema/schemaInterfaces';

interface RemedyInputInterface {
  name: string
  category?: string
  categoryId?: number
  dose?: string
  activePrinciple?: string
  activePrincipleId?: number
  laboratory?: string
  laboratoryId?: number
  netContent: number
  netContentUnit?: string
  netContentUnitId?: number
  formatId?: string
  format?: number
}

export default class RemedyAPI extends DataSource {

  async getAllRemedies() {
    const response = await Remedy.findAll({
      attributes: [
        'id',
        'name',
        'categoryId',
        'dose',
        'activePrincipleId',
        'laboratoryId',
        'netContent',
        'netContentUnitId',
        'formatId',
      ],
    });

    return response;
  }

  async getRemedyById(id: number) {
    const response = await Remedy.findOne({
      where: { id },
      attributes: [
        'id',
        'name',
        'categoryId',
        'dose',
        'activePrincipleId',
        'laboratoryId',
        'netContent',
        'netContentUnitId',
        'formatId',
      ],
    });

    return response;
  }

  async addRemedy(input: AddRemedyInput) {
    let category;

    if (input.categoryId) category = input.categoryId;
    else if (input.category) {
      [category] = await RemedyCategory.findOrCreate({
        where: { name: input.category },
      });
    } else throw new UserInputError('Expected a category or categoryId');

    const response = await Remedy.create({
      name: input.name,
      categoryId: category,

    });

    return response;
  }

}
