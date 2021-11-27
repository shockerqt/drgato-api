import { writeFileSync } from 'fs';
import RemedyStore from './remedyStore';

export interface RemediesModel {
  [slug: string]: RemedyModel;
}

export interface RemedyModel {
  activePrinciple: string;
  category: string;
  dose?: string;
  format?: string;
  laboratory: string;
  name: string
  netContent?: number;
  netContentUnit?: string;
  vendors: VendorsModel;
}

export interface VendorsModel {
  [slug: string]: VendorModel;
}

export interface VendorModel {
  lastPrice?: number;
  url: string;
}

export interface RemedyCategoriesModel {
  [slug: string]: RemedyCategoryModel;
}

export interface RemedyCategoryModel {
  name: string;
  remedies: string[];
}

export interface RemediesData {
  remedies: RemediesModel;
  remedyCategories: RemedyCategoriesModel;
}

export interface CommitResponse {
  ok: boolean;
  message: string;
}

export interface PharmaciesModel {
  [slug: string]: PharmacyModel;
}

export interface PharmacyModel {
  name: string;
}

export interface ConstraintsData {
  pharmacies: PharmaciesModel;
}

export default class Store {
  public data!: ConstraintsData;
  public remedyStore: RemedyStore;

  constructor() {
    this.remedyStore = new RemedyStore();
  }

  public async init(): Promise<void> {
    this.data = await this.loadData();
    await this.remedyStore.init();
  }

  /**
   * Load data from external storage if not in memory
   * @returns  a promise that resolves to the data
   */
  private async loadData(): Promise<ConstraintsData> {
    const data = await import('../data/constraints.json');
    return data.default;
  }

  /**
   * @returns All remedy categories on memory
   */
  get pharmacies(): PharmaciesModel {
    return this.data.pharmacies;
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
      writeFileSync('./src/data/constraints.json', JSON.stringify(this.data, null, '  '));
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
