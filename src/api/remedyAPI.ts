import { DataSource } from 'apollo-datasource';
import slugify from 'slugify';
import {
  AddPharmacyInput,
  AddPharmacyPayload,
  AddRemedyCategoryInput,
  AddRemedyCategoryPayload,
  AddRemedyInput,
  AddRemedyPayload,
  AddVendorInput,
  AddVendorPayload,
  Pharmacy,
  Remedy,
  RemedyCategory,
  UpdateRemedyInput,
  UpdateRemedyPayload,
  Vendor,
} from '.';

import Store, {
  RemedyModel,
} from '../models';
import RemedyStore from '../models/remedyStore';

export default class RemedyAPI extends DataSource {
  private store: Store;
  private remedyStore: RemedyStore;

  constructor({ store }: { store: Store }) {
    super();
    this.store = store;
    this.remedyStore = store.remedyStore;
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
  private generateSlug(identifier: string): string {
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
    const categorySlug = this.generateSlug(remedy.category);

    const remedyToAdd: RemedyModel = {
      name: remedy.name,
      category: remedy.category,
      activePrinciple: remedy.activePrinciple,
      laboratory: remedy.laboratory,
      vendors: {},
      ...(remedy.dose && { dose: remedy.dose }),
      ...(remedy.format && { format: remedy.format }),
      ...((remedy.netContent && remedy.netContentUnit) && { netContent: remedy.netContent, netContentUnit: remedy.netContentUnit }),
    };


    const { categories, remedies } = this.remedyStore;

    if (remedies[slug]) return {
      success: false,
      message: `A product with the slug '${slug}' is already in storage.`,
    };

    if (!categories[categorySlug]) return {
      success: false,
      message: `Category '${remedy.category}' doesn't exists in storage. Please add it first.`,
    };

    this.remedyStore.addOrUpdateRemedy(slug, remedyToAdd);

    const response = this.remedyStore.commit();

    const addedRemedy = {
      ...remedyToAdd,
      slug,
    };

    return {
      success: response.ok,
      message: response.message,
      ...(response.ok && { addedRemedy }),
    };
  }

  /**
   * Get a remedy by its slug in storage if it exists.
   * @param slug the slug from the remedy to look for
   * @returns a promise that resolves to a remedy
   */
  public async getRemedyBySlug(slug: string): Promise<Remedy | null> {
    const remedy = this.remedyStore.remedies[slug] || null;

    return remedy ? {
      ...remedy,
      slug,
    } : null;
  }

  /**
   * @returns a promise that resolves to all categories
   */
  public async getCategories(): Promise<RemedyCategory[]> {
    return Object.entries(this.remedyStore.categories).map(([slug, category]) => ({ ...category, slug }));
  }

  /**
   * @param name the category name to return.
   * @returns a promise that resolves to a category
   */
  public async getCategoryByName(name: string): Promise<RemedyCategory | null> {
    const slug = this.generateSlug(name);
    const category = this.remedyStore.categories[slug] || null;
    return category ? {
      ...category,
      slug,
    } : null;
  }

  /**
   * @returns a promise that resolves to all remedies
   */
  public async getRemedies(): Promise<Remedy[]> {
    return Object.entries(this.remedyStore.remedies).map(([slug, remedy]) => ({ ...remedy, slug }));
  }

  /**
   * @param name the category name.
   * @returns a promise that resolves to all remedies on a category
   */
  public async getRemediesByCategory(slug: string): Promise<Remedy[] | null> {
    return this.remedyStore.categories[slug].remedies.map(remedySlug => ({
      ...this.remedyStore.remedies[remedySlug],
      slug: remedySlug,
    }));
  }

  /**
   * @returns a promise that resolves to all pharmacies
   */
  public async getPharmacies(): Promise<Pharmacy[]> {
    return Object.entries(this.store.pharmacies).map(([slug, pharmacy]) => ({ ...pharmacy, slug }));
  }

  /**
   * @param input the data to update the remedy
   * @returns a promise that resolve to a payload
   */
  public async updateRemedy(input: UpdateRemedyInput): Promise<UpdateRemedyPayload> {
    const { slug } = input;

    const { categories, remedies } = this.remedyStore;

    if (!remedies[slug]) return {
      success: false,
      message: `Remedy '${slug}' doesn't exist in storage.`,
    };

    if (input.category && !categories[input.category]) return {
      success: false,
      message: `Category '${input.category}' doesn't exists in storage. Please add it first.`,
    };

    const remedy = remedies[slug];

    const remedyToUpdate: RemedyModel = {
      ...remedy,
      ...(input.name && { name: input.name }),
      ...(input.category && { category: this.generateSlug(input.category) }),
      ...(input.activePrinciple && { name: input.activePrinciple }),
      ...(input.laboratory && { name: input.laboratory }),
      ...(input.dose && { dose: input.dose }),
      ...(input.format && { format: input.format }),
      ...((input.netContent && input.netContentUnit) && { netContent: input.netContent, netContentUnit: input.netContentUnit }),
    };

    const newSlug = this.generateRemedySlug(remedyToUpdate);

    // Delete obsolete remedy from storage
    this.remedyStore.removeRemedy(slug);

    // Add new remedy to storage
    this.remedyStore.addOrUpdateRemedy(newSlug, remedyToUpdate);

    const response = this.remedyStore.commit();

    return {
      success: response.ok,
      message: response.message,
      ...(response.ok && { updatedRemedy: { ...remedyToUpdate, slug: newSlug } }),
    };
  }

  /**
   * Add a category if it doesn't exists on storage
   * @param input the category to add
   * @returns a promise that resolves to a payload
   */
  public async addCategory(input: AddRemedyCategoryInput): Promise<AddRemedyCategoryPayload> {
    const { categories } = this.remedyStore;
    const slug = this.generateSlug(input.name);

    if (categories[slug]) return {
      success: false,
      message: `Category '${input.name}' already exists in storage.`,
    };


    const categoryToAdd = {
      name: input.name,
      remedies: [],
    };

    this.remedyStore.addCategory(slug, categoryToAdd);

    const response = this.remedyStore.commit();

    return {
      success: response.ok,
      message: response.message,
      ...(response.ok && { addedCategory: { ...categoryToAdd, slug } }),
    };
  }

  /**
   * Add a pharmacy if it doesn't exists on storage
   * @param input the pharmacy to add
   * @returns a promise that resolves to a payload
   */
  public async addPharmacy(input: AddPharmacyInput): Promise<AddPharmacyPayload> {
    const { pharmacies } = this.store;
    const slug = this.generateSlug(input.name);

    if (pharmacies[slug]) return {
      success: false,
      message: `Pharmacy '${input.name}' already exists in storage.`,
    };

    const pharmacyToAdd = {
      name: input.name,
    };

    pharmacies[slug] = pharmacyToAdd;

    const response = this.store.commit();

    return {
      success: response.ok,
      message: response.message,
      ...(response.ok && { addedPharmacy: { ...pharmacyToAdd, slug } }),
    };

  }

  public async addVendor(input: AddVendorInput): Promise<AddVendorPayload> {
    const { pharmacies } = this.store;
    const { remedies } = this.remedyStore;

    const { remedySlug, pharmacySlug } = input;

    if (!remedies[remedySlug]) return {
      success: false,
      message: `Remedy '${remedySlug}' doesn't exist in storage.`,
    };

    if (!pharmacies[pharmacySlug]) return {
      success: false,
      message: `Pharmacy '${pharmacySlug}' doesn't exist in storage. Add it first.`,
    };

    if (remedies[remedySlug].vendors[pharmacySlug]) return {
      success: false,
      message: 'Vendor already exists in storage.',
    };

    const remedy = remedies[remedySlug];

    const vendorToAdd = {
      url: input.url,
    };

    remedies[remedySlug].vendors[pharmacySlug] = vendorToAdd;

    const response = this.remedyStore.commit();

    return {
      success: response.ok,
      message: response.message,
      ...(response.ok && { addedVendor: { ...vendorToAdd, pharmacy: pharmacySlug } }),
      updatedRemedy: { ...remedy, slug: remedySlug },
    };

  }

  /**
   * @returns a promise that resolves to all remedies
   */
  public async getRemedyVendors(remedySlug: string): Promise<Vendor[]> {
    return Object.entries(this.remedyStore.remedies[remedySlug].vendors).map(([slug, vendor]) => ({ ...vendor, pharmacy: slug }));
  }

  /**
   * @returns a promise that resolves to all remedies
   */
  public async getPharmacy(pharmacySlug: string): Promise<Pharmacy> {
    return { ...this.store.pharmacies[pharmacySlug], slug: pharmacySlug };
  }

}
