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

export interface UnitAttributes {
  id: number;
  name: string;
}

export type UnitCreationAttributes = Optional<UnitAttributes, 'id'>;

export default class Unit extends Model<UnitAttributes, UnitCreationAttributes>
  implements UnitAttributes {
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
    remedies: Association<Unit, Remedy>;
  };
}
