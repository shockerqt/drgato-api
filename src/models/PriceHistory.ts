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

import { PriceStamp } from '.';

interface PriceHistoryAttributes {
  id: number;
  remedyId: number;
  pharmacyId: number;
  url: string | null;
}

type PriceHistoryCreationAttributes = Optional<PriceHistoryAttributes, 'id'>;

export default class PriceHistory extends Model<PriceHistoryAttributes, PriceHistoryCreationAttributes>
  implements PriceHistoryAttributes {
  public id!: number;
  public remedyId!: number;
  public pharmacyId!: number;
  public url!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getPriceStamps!: HasManyGetAssociationsMixin<PriceStamp>;
  public addPriceStamp!: HasManyAddAssociationMixin<PriceStamp, number>;
  public hasPriceStamp!: HasManyHasAssociationMixin<PriceStamp, number>;
  public countPriceStamps!: HasManyCountAssociationsMixin;
  public createPriceStamp!: HasManyCreateAssociationMixin<PriceStamp>;

  public readonly priceStamps?: PriceStamp[];

  public static associations: {
    priceStamps: Association<PriceHistory, PriceStamp>;
  };
}
