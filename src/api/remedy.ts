import { DataSource } from 'apollo-datasource';
import slugify from 'slugify';

import Store, { Category, Remedy } from '../store';

export interface AddRemedyInput {
  name: string;
  category: string;
  dose?: string;
  activePrinciple: string;
  laboratory: string;
  netContent?: number;
  netContentUnit?: string;
  format?: string;
}

export interface AddRemedyPayload {
  success: boolean;
  message?: string;
  addedRemedy?: Remedy;
  remedies?: Remedy[];
}

export interface UpdateRemedyInput {
  slug: string;
  name?: string;
  category?: string;
  dose?: string;
  activePrinciple?: string;
  laboratory?: string;
  netContent?: number;
  netContentUnit?: string;
  format?: string;
}

export interface UpdateRemedyPayload {
  success: boolean;
  message?: string;
  updatedRemedy?: Remedy;
  remedies?: Remedy[];
}

export interface AddCategoryInput {
  name: string;
}

export interface AddCategoryPayload {
  success: boolean;
  message?: string;
  addedCategory?: Category;
  categories?: Category[];
}

export default class RemedyAPI extends DataSource {
  private store;

  constructor({ store }: { store: Store }) {
    super();
    this.store = store;
  }

  /**
   * Generate a unique identifier (slug) for a remedy using
   * its name, laboratory, dose, netContent and netContentUnit info,
   * separated by dashes
   * @param remedy
   * @returns a slug
   */
  private generateRemedySlug(remedy: AddRemedyInput): string {

    const identifier = `
      ${remedy.name}
      -${remedy.laboratory}
      ${remedy.dose ? `-${remedy.dose}` : ''}
      ${remedy.netContent && remedy.netContentUnit ? `-${remedy.netContent}` : ''}
      ${remedy.netContent && remedy.netContentUnit ? `-${remedy.netContentUnit}` : ''}
    `;

    return slugify(identifier, { lower: true });
  }

  /**
   * Add a remedy to storage.
   * It checks if another remedy with the same generated slug exists.
   * @param remedy the remedy to add
   * @returns AddRemedyPayload
   */
  public async addRemedy(remedy: AddRemedyInput): Promise<AddRemedyPayload> {
    const slug = this.generateRemedySlug(remedy);

    const remedyToAdd: Remedy = {
      name: remedy.name,
      category: remedy.category,
      activePrinciple: remedy.activePrinciple,
      laboratory: remedy.laboratory,
      ...(remedy.dose && { dose: remedy.dose }),
      ...(remedy.format && { format: remedy.format }),
      ...((remedy.netContent && remedy.netContentUnit) && { netContent: remedy.netContent, netContentUnit: remedy.netContentUnit }),
      slug,
    };

    const [
      remedies,
      categories,
    ] = await Promise.all([this.store.getRemedies(), this.store.getCategories()]);

    if (remedies.some((remedy) => remedy.slug === slug)) return {
      success: false,
      message: `Remedy with slug '${slug}' is already in storage.`,
    };

    if (!categories.some((category) => category.name === remedy.category)) return {
      success: false,
      message: `Category '${remedy.category}' doesn't exists in storage. Please add it first.`,
    };

    remedies.push(remedyToAdd);

    const response = await this.store.commit();

    return {
      success: response.ok,
      message: response.message,
      ...(response.ok && { addedRemedy: remedyToAdd }),
      remedies,
    };
  }

  /**
   * Get a remedy by its slug in storage if it exists.
   * @returns a remedy
   */
  public async getRemedyBySlug(slug: string): Promise<Remedy | null> {
    const remedies = await this.store.getRemedies();
    return remedies.find((remedy) => remedy.slug === slug) || null;
  }

  /**
   * @returns all categories from storage.
   */
  public async getCategories(): Promise<Category[]> {
    return await this.store.getCategories();
  }

  /**
   * @param name the category name to return.
   * @returns returns a category
   */
  public async getCategoryByName(name: string): Promise<Category | null> {
    const categories = await this.store.getCategories();
    return categories.find((category) => category.name === name) || null;
  }

  /**
   * @param name the category name filtered.
   * @returns all the remedies from a category
   */
  public async getRemediesByCategory(name: string): Promise<Remedy[]> {
    const remedies = await this.store.getRemedies();
    return remedies.filter(remedy => remedy.category === name);
  }

  public async updateRemedy(input: UpdateRemedyInput): Promise<UpdateRemedyPayload> {
    const remedy = await this.getRemedyBySlug(input.slug);

    if (!remedy) return {
      success: false,
      message: `Remedy with slug '${input.slug}' doesn't exist in remedies storage.`,
    };

    if (input.name) remedy.name = input.name;
    if (input.category) remedy.category = input.category;
    if (input.activePrinciple) remedy.activePrinciple = input.activePrinciple;
    if (input.laboratory) remedy.laboratory = input.laboratory;
    if (input.dose) remedy.dose = input.dose;
    if (input.format) remedy.format = input.format;
    if (input.netContent && input.netContentUnit) {
      remedy.netContent = input.netContent;
      remedy.netContentUnit = input.netContentUnit;
    }

    const response = await this.store.commit();

    return {
      success: response.ok,
      message: response.message,
      ...(response.ok && { addedRemedy: remedy }),
      remedies: await this.store.getRemedies(),
    };
  }

  public async addCategory(input: AddCategoryInput): Promise<AddCategoryPayload> {
    const categories = await this.store.getCategories();

    if (categories.some((category) => category.name === input.name)) return {
      success: false,
      message: `Category '${input.name}' is already in storage.`,
    };

    const categoryToAdd = {
      name: input.name,
      slug: slugify(input.name, { lower: true }),
    };

    categories.push(categoryToAdd);

    const response = await this.store.commit();

    return {
      success: response.ok,
      message: response.message,
      ...(response.ok && { addedCategory: categoryToAdd }),
      categories,
    };
  }

}
