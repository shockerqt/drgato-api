import Store, { CommitResponse, ConstraintsData, PharmaciesModel, SectionsModel } from '.';

export default class ConstraintsStore {
  private data!: ConstraintsData;
  private store: Store;

  constructor(store: Store, data: ConstraintsData) {
    this.store = store;
    this.data = data;
  }

  public async commit(): Promise<CommitResponse> {
    return await this.store.commit(['constraints']);
  }

  /**
   * @returns All pharmacies on memory
   */
  get pharmacies(): PharmaciesModel {
    return this.data.pharmacies;
  }

  /**
   * @returns All sections on memory
   */
  get sections(): SectionsModel {
    return this.data.sections;
  }

}
