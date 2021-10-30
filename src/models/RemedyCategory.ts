import { Model } from 'sequelize';
import { RemedyCategoryInterface } from '../schema/schemaInterfaces';

export default class RemedyCategory extends Model<RemedyCategoryInterface>
  implements RemedyCategoryInterface {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
