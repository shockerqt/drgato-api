import { DataSource } from 'apollo-datasource';
import { RemedyCategory } from '../models';
import { RemedyCategoryInterface } from '../schema/schemaInterfaces';

export default class RemedyCategoryAPI extends DataSource {

  async getAllRemedyCategories() {
    const response = await RemedyCategory.findAll({
      attributes: [
        'id',
        'name',
      ],
    });

    return response;
  }

  async getRemedyCategoryById(id: number) {
    const response = await RemedyCategory.findOne({
      where: { id },
      attributes: [
        'id',
        'name',
      ],
    });

    return response;
  }

  async addRemedyCategory(input: RemedyCategoryInterface) {
    const response = await RemedyCategory.create(input);

    return response;
  }

}
