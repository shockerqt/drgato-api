import { writeFileSync } from 'fs';
import {
  CommitResponse,
  RemediesData,
  RemediesModel,
  RemedyCategoriesModel,
  RemedyCategoryModel,
  RemedyModel,
} from '.';

export default class RemedyStore {
  private data!: RemediesData;

  public async init(): Promise<void> {
    this.data = await this.loadData();
  }

  /**
   * Load data from external storage if not in memory
   * @returns  a promise that resolves to the data
   */
  private async loadData(): Promise<RemediesData> {
    const data = await import('../data/remedies.json');
    return data.default;
  }

  /**
   * @returns All remedies on memory
   */
  get remedies(): RemediesModel {
    return this.data.remedies;
  }

  /**
   * @returns All remedy categories on memory
   */
  get categories(): RemedyCategoriesModel {
    return this.data.remedyCategories;
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
    if (index !== -1) this.categories[remedy.category].remedies.splice(index, 1, remedy.category);
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

  /**
   * Save all data to external storage.
   * @returns a promise with a status response
   */
  public commit(): CommitResponse {

    if (!this.data) return {
      ok: false,
      message: 'Nothing to commit.',
    };

    try {
      writeFileSync('./src/data/remedies.json', JSON.stringify(this.data, null, '  '));
      return {
        ok: true,
        message: 'Succesfully commited to storage.',
      };
    } catch (error) {
      return {
        ok: false,
        message: 'Failed to commit to storage.',
      };
    }
  }

}
