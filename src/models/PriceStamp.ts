import {
  Model,
  Optional,
} from 'sequelize';

interface PriceStampAttributes {
  id: number;
  priceHistoryId: number;
  price: number | null;
  date: Date;
}

type PriceStampCreationAttributes = Optional<PriceStampAttributes, 'id'>;

export default class PriceStamp extends Model<PriceStampAttributes, PriceStampCreationAttributes>
  implements PriceStampAttributes {
  public id!: number;
  public priceHistoryId!: number;
  public price!: number | null;
  public date!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
