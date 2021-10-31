import { DataSource } from 'apollo-datasource';
import { RemedyCategory } from '../models';
import { AddRemedyCategoryInput } from '../schema/remedyCategoryResolvers';

export default class RemedyCategoryAPI extends DataSource {

  async getAllRemedyCategories() {
    const response = await RemedyCategory.findAll();

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

  async addRemedyCategory(input: AddRemedyCategoryInput) {
    const response = await RemedyCategory.create(input);

    return response;
  }

}
