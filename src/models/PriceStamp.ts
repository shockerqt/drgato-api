import { Model } from 'sequelize';

interface PriceStampAttributes {
  id: number;
  productId: number;
  pharmacyId: number;
  price: number;
  date: Date;
}

export default class PriceStamp extends Model<PriceStampAttributes>
  implements PriceStampAttributes {
  public id!: number;
  public productId!: number;
  public pharmacyId!: number;
  public price!: number;
  public date!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
