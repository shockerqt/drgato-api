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

import { PriceHistory } from '.';

interface PharmacyAttributes {
  id: number;
  name: string;
}

type PharmacyCreationAttributes = Optional<PharmacyAttributes, 'id'>;

export default class Pharmacy extends Model<PharmacyAttributes, PharmacyCreationAttributes>
  implements PharmacyAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getPriceHistories!: HasManyGetAssociationsMixin<PriceHistory>;
  public addPriceHistory!: HasManyAddAssociationMixin<PriceHistory, number>;
  public hasPriceHistory!: HasManyHasAssociationMixin<PriceHistory, number>;
  public countPriceHistories!: HasManyCountAssociationsMixin;
  public createPriceHistory!: HasManyCreateAssociationMixin<PriceHistory>;

  public readonly priceHistories?: PriceHistory[];

  public static associations: {
    priceHistories: Association<Pharmacy, PriceHistory>;
  };
}
