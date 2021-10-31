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

export interface RemedyFormatAttributes {
  id: number;
  name: string;
}

export type RemedyFormatCreationAttributes = Optional<RemedyFormatAttributes, 'id'>;

export default class RemedyFormat extends Model<RemedyFormatAttributes, RemedyFormatCreationAttributes>
  implements RemedyFormatAttributes {
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
    remedies: Association<RemedyFormat, Remedy>;
  };
}
