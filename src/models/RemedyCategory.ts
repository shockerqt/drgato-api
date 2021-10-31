import {
  Association,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model,
  Optional,
} from 'sequelize';

import { Remedy } from '.';

export interface RemedyCategoryAttributes {
  id: number;
  name: string;
}

export type RemedyCategoryCreationAttributes = Optional<RemedyCategoryAttributes, 'id'>;

export default class RemedyCategory extends Model<RemedyCategoryAttributes, RemedyCategoryCreationAttributes>
  implements RemedyCategoryAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getRemedies!: HasManyGetAssociationsMixin<Remedy>;
  public addRemedy!: HasManyAddAssociationMixin<Remedy, number>;
  public hasRemedy!: HasManyHasAssociationMixin<Remedy, number>;
  public countRemedies!: HasManyCountAssociationsMixin;
  public createRemedy!: HasManyCreateAssociationMixin<Remedy>;

  public readonly remedies?: Remedy[];

  public static associations: {
    remedies: Association<RemedyCategory, Remedy>;
  };
}
