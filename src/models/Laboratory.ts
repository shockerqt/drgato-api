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

interface LaboratoryAttributes {
  id: number;
  name: string;
}

type LaboratoryCreationAttributes = Optional<LaboratoryAttributes, 'id'>;

export default class Laboratory extends Model<LaboratoryAttributes, LaboratoryCreationAttributes>
  implements LaboratoryAttributes {
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
    remedies: Association<Laboratory, Remedy>;
  };
}
