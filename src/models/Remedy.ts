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
import { ActivePrincipleCreationAttributes } from './ActivePrinciple';
import { LaboratoryCreationAttributes } from './Laboratory';
import { RemedyCategoryCreationAttributes } from './RemedyCategory';
import { RemedyFormatCreationAttributes } from './RemedyFormat';
import { UnitCreationAttributes } from './Unit';


interface RemedyAttributes {
  id: number;
  name: string;
  categoryId: number | RemedyCategoryCreationAttributes;
  dose: string | null;
  activePrincipleId: number | ActivePrincipleCreationAttributes;
  laboratoryId: number | LaboratoryCreationAttributes;
  netContent: number;
  netContentUnitId: number | UnitCreationAttributes;
  formatId: number | null | RemedyFormatCreationAttributes;
}

type RemedyCreationAttributes = Optional<RemedyAttributes, 'id' | 'dose' | 'formatId'>;

export default class Remedy extends Model<RemedyAttributes, RemedyCreationAttributes>
  implements RemedyAttributes {
  id!: number;
  name!: string;
  categoryId!: number;
  dose!: string | null;
  activePrincipleId!: number;
  laboratoryId!: number;
  netContent!: number;
  netContentUnitId!: number;
  formatId!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getPriceHistories!: HasManyGetAssociationsMixin<PriceHistory>;
  public addPriceHistory!: HasManyAddAssociationMixin<PriceHistory, number>;
  public hasPriceHistory!: HasManyHasAssociationMixin<PriceHistory, number>;
  public countPriceHistories!: HasManyCountAssociationsMixin;
  public createPriceHistory!: HasManyCreateAssociationMixin<PriceHistory>;

  public readonly priceHistories?: PriceHistory[];

  public static associations: {
    priceHistories: Association<Remedy, PriceHistory>;
  };
}
