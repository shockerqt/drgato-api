import { DataSource } from 'apollo-datasource';
import slugify from 'slugify';

import Store, { StoreRemedy } from '../store';

export interface Remedy {
  slug: string;
  category: string;
  name: string
  dose?: string;
  activePrinciple: string;
  laboratory: string;
  netContent?: number;
  netContentUnit?: string;
  format?: string;
}

export interface Category {
  slug: string;
  name: string;
}

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
   * @param remedy the remedy that will get a slug
   * @returns a slug from the remedy data
   */
  private generateRemedySlug(remedy: {
    name: string;
    laboratory: string;
    dose?: string;
    netContent?: number;
    netContentUnit?: string;
  }): string {

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
   * Generate a unique identifier (slug) for a category using its name
   * @param category the category that will get a slug
   * @returns a slug from the category name
   */
  private generateCategorySlug(category: { name: string; }): string {
    const identifier = category.name;

    return slugify(identifier, { lower: true });
  }

  /**
   * Add a remedy to storage.
   * It checks if another remedy with the same generated slug exists.
   * @param remedy the remedy to add
   * @returns a promise that resolves to a payload
   */
  public async addRemedy(remedy: AddRemedyInput): Promise<AddRemedyPayload> {
    const slug = this.generateRemedySlug(remedy);
    const categorySlug = this.generateCategorySlug({ name: remedy.category });

    const remedyToAdd: StoreRemedy = {
      slug,
      name: remedy.name,
      category: remedy.category,
      activePrinciple: remedy.activePrinciple,
      laboratory: remedy.laboratory,
      ...(remedy.dose && { dose: remedy.dose }),
      ...(remedy.format && { format: remedy.format }),
      ...((remedy.netContent && remedy.netContentUnit) && { netContent: remedy.netContent, netContentUnit: remedy.netContentUnit }),
    };


    const categories = this.store.remedyCategories;

    if (!categories[categorySlug]) return {
      success: false,
      message: `Category '${remedy.category}' doesn't exists in storage. Please add it first.`,
    };

    if (this.store.indexedProducts[slug]) return {
      success: false,
      message: `A product with the slug '${slug}' is already in storage.`,
    };

    categories[categorySlug].products[slug] = remedyToAdd;

    const response = this.store.commit();

    const addedRemedy = {
      ...remedyToAdd,
      slug,
    };

    const remedies = Object.entries(categories[categorySlug].products).map(([slug, remedy]) => ({
      ...remedy,
      slug,
    }));

    return {
      success: response.ok,
      message: response.message,
      ...(response.ok && { addedRemedy }),
      remedies,
    };
  }

  /**
   * Get a remedy by its slug in storage if it exists.
   * @param slug the slug from the remedy to look for
   * @returns a promise that resolves to a remedy
   */
  public async getRemedyBySlug(slug: string): Promise<Remedy | null> {
    const remedies = this.store.indexedRemedies;

    return remedies[slug] || null;
  }

  /**
   * @returns a promise that resolves to all categories
   */
  public async getCategories(): Promise<Category[]> {
    return Object.values(this.store.remedyCategories);
  }

  /**
   * @param name the category name to return.
   * @returns a promise that resolves to a category
   */
  public async getCategoryByName(name: string): Promise<Category | null> {
    const slug = this.generateCategorySlug({ name });
    const storeCategory = this.store.remedyCategories[slug];
    if (!storeCategory) return null;
    return storeCategory;
  }

  /**
   * @returns a promise that resolves to all categories
   */
  public async getRemedies(): Promise<Remedy[]> {
    return Object.values(this.store.indexedRemedies);
  }

  /**
   * @param name the category name.
   * @returns a promise that resolves to all remedies on a category
   */
  public async getRemediesByCategory(slug: string): Promise<Remedy[] | null> {
    return Object.values(this.store.remedyCategories[slug].products);
  }

  /**
   * @param input the data to update the remedy
   * @returns a promise that resolve to a payload
   */
  public async updateRemedy(input: UpdateRemedyInput): Promise<UpdateRemedyPayload> {
    const { slug } = input;

    const categories = this.store.remedyCategories;

    if (!this.store.indexedProducts[slug]) return {
      success: false,
      message: `Product '${slug}' doesn't exist in storage.`,
    };

    if (!this.store.indexedRemedies[slug]) return {
      success: false,
      message: `Product '${slug}' is not a remedy.`,
    };

    const remedy = this.store.indexedRemedies[slug];
    const categorySlug = this.generateCategorySlug({ name: remedy.category });

    if (input.category && !categories[input.category]) return {
      success: false,
      message: `Category '${input.category}' doesn't exists in storage. Please add it first.`,
    };


    const remedyToUpdate: StoreRemedy = {
      ...remedy,
      ...(input.name && { name: input.name }),
      ...(input.category && { category: input.category }),
      ...(input.activePrinciple && { name: input.activePrinciple }),
      ...(input.laboratory && { name: input.laboratory }),
      ...(input.dose && { dose: input.dose }),
      ...(input.format && { format: input.format }),
      ...((input.netContent && input.netContentUnit) && { netContent: input.netContent, netContentUnit: input.netContentUnit }),
    };

    const newSlug = this.generateRemedySlug(remedyToUpdate);
    remedyToUpdate.slug = newSlug;

    // Delete obsolete remedy from storage
    delete categories[categorySlug].products[remedy.slug];

    // Add new remedy to storage
    const newCategorySlug = this.generateCategorySlug({ name: remedyToUpdate.category });
    categories[newCategorySlug].products[slug] = remedyToUpdate;

    const response = this.store.commit();

    const remedies = Object.values(categories[newCategorySlug].products);

    return {
      success: response.ok,
      message: response.message,
      ...(response.ok && { updatedRemedy: remedyToUpdate }),
      remedies,
    };
  }

  /**
   * Add a category if it doesn't exists on storage
   * @param input the category to add
   * @returns a promise that resolves to a payload
   */
  public async addCategory(input: AddCategoryInput): Promise<AddCategoryPayload> {
    const categories = this.store.remedyCategories;
    const slug = this.generateCategorySlug({ name: input.name });

    if (categories[slug]) return {
      success: false,
      message: `Category '${input.name}' already exists in storage.`,
    };


    const categoryToAdd = {
      name: input.name,
      slug,
      products: {},
    };

    categories[slug] = categoryToAdd;

    const response = this.store.commit();

    return {
      success: response.ok,
      message: response.message,
      ...(response.ok && { addedCategory: categoryToAdd }),
      categories: Object.values(categories),
    };
  }

}
