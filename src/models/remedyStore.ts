import Store, {
  CommitResponse,
  RemediesModel,
  RemedyCategoriesModel,
  RemedyCategoryModel,
  RemedyModel,
} from '.';

export default class RemedyStore {
  private data: RemediesModel;
  private store: Store;

  constructor(store: Store, data: RemediesModel) {
    this.store = store;
    this.data = data;
  }

  public async commit(): Promise<CommitResponse> {
    return await this.store.commit(['remedies']);
  }

  /**
   * @returns All remedies on memory
   */
  get remedies(): RemediesModel {
    return this.data;
  }

  /**
   * @returns All remedy categories on memory
   */
  get categories(): RemedyCategoriesModel {
    return this.store.constraintsStore.sections.remedies.categories;
  }

  /**
   * If the slug doesn't exists, add the remedy to remedies and
   * remedyCategories. Else update the current remedy in both remedies
   * and remedyCategories.
   * @param slug the remedy slug to add or update
   * @param remedy the new remedy object
   */
  public addOrUpdateRemedy(slug: string, remedy: RemedyModel): void {
    if (!this.categories[remedy.category]) throw new Error('Category doesn\'t exists in storage');
    this.remedies[slug] = remedy;
    const index = this.categories[remedy.category].remedies.findIndex((remedy) => remedy === slug);
    if (index !== -1) this.categories[remedy.category].remedies.splice(index, 1, slug);
    else this.categories[remedy.category].remedies.push(slug);
  }

  /**
   * If exists, remove the remedy with the specified slug from remedies
   * and remedyCategories. If not, do nothing.
   * @param slug the remedy slug to remove
   */
  public removeRemedy(slug: string): void {
    const remedy = this.remedies[slug];
    const index = this.categories[remedy.category].remedies.findIndex((remedy) => remedy === slug);
    if (index !== -1) this.categories[remedy.category].remedies.splice(index, 1);
    delete this.remedies[slug];
  }

  public addCategory(slug: string, category: RemedyCategoryModel): void {
    this.categories[slug] = category;
  }

  /**
   * If exists, remove the category with the specified slug from categories.
   * If not, do nothing.
   * @param slug the category slug to remove
   */
  public removeCategory(slug: string): void {
    for (const remedy of Object.values(this.remedies)) {
      if (remedy.category === slug) throw new Error('Can\'t remove category, there are still remedies with it.');
    }
    delete this.categories[slug];
  }

}
