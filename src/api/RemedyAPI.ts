import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { PriceStamp, Remedy } from '../models';
import { RemedyInterface } from '../schema/schemaInterfaces';

interface User {
  email: string,
}

interface Context {
  user: User;
}

export default class RemedyAPI extends DataSource {
  private context!: Context;
  public store: { PriceStamp: typeof PriceStamp, Remedy: typeof Remedy };

  constructor({ store }: { store: { PriceStamp: typeof PriceStamp, Remedy: typeof Remedy } }) {
    super();
    this.store = store;
  }

  initialize(config: DataSourceConfig<Context>) {
    this.context = config.context;
  }

  async getAllRemedies() {
    const response = await this.store.Remedy.findAll({
      attributes: [
        'id',
        'name',
        'categoryId',
        'dose',
        'activePrincipleId',
        'laboratoryId',
        'netContent',
        'netContentUnitId',
        'formatId',
      ],
    });

    return response;
  }

  async getRemedyById(id: number) {
    const response = await this.store.Remedy.findOne({
      where: { id },
      attributes: [
        'id',
        'name',
        'categoryId',
        'dose',
        'activePrincipleId',
        'laboratoryId',
        'netContent',
        'netContentUnitId',
        'formatId',
      ],
    });

    return response;
  }

  async addRemedy(input: RemedyInterface) {
    const response = await this.store.Remedy.create(input);

    return response;
  }

}
