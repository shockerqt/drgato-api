import {
  Model,
  Optional,
} from 'sequelize';
import { RemedyInterface } from '../schema/schemaInterfaces';

type RemedyCreationInterface = Optional<RemedyInterface, 'id'>

export default class Remedy extends Model<RemedyInterface, RemedyCreationInterface>
  implements RemedyInterface {
  public id!: number;
  public name!: string;
  public categoryId!: number;
  public dose?: string;
  public activePrincipleId!: number;
  public laboratoryId!: number;
  public netContent!: number;
  public netContentUnitId!: number;
  public formatId?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
