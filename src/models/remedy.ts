import { writeFileSync } from 'fs';

interface StoreRemedies {
  [slug: string]: StoreRemedy;
}

interface StoreRemedy {
  activePrinciple: string;
  category: string;
  dose?: string;
  format?: string;
  laboratory: string;
  name: string
  netContent?: number;
  netContentUnit?: string;
  vendors: Vendors;
}

interface Vendors {
  [slug: string]: Vendor;
}

interface Vendor {
  slug: string;
  url: string;
  lastPrice?: number;
}

interface StoreRemedyCategories {
  [slug: string]: StoreRemedyCategory;
}

interface StoreRemedyCategory {
  name: string;
  remedies: string[];
}

interface StoreRemediesData {
  remedies: StoreRemedies;
  remedyCategories: StoreRemedyCategories;
}

interface CommitResponse {
  ok: boolean;
  message: string;
}

export default class Store {
  private data!: StoreData;
  private products!: StoreProducts<StoreProductTypes>;
  private remedies!: StoreProducts<StoreRemedy>;

  public async init(): Promise<void> {
    this.data = await this.loadData();

    this.indexProducts(this.data);

  }

  /**
   * Load data from external storage if not in memory
   * @returns  a promise that resolves to the data
   */
  private async loadData(): Promise<StoreData> {
    const data = await import('./data/data.json');
    return data.default;
  }

  /**
   * Get all remedies from storage in objects like { slug: Remedy }
   * @param data the data from storage
   * @returns an object with all remedies indexed by slug
   */
  private indexRemedies(data: StoreData): StoreProducts<StoreRemedy> {
    let remedies = {};
    Object.values(data.sections.remedies.categories).forEach((category) => {
      remedies = {
        ...remedies,
        ...category.products,
      };
    });

    return remedies;
  }

  /**
   * Create an object indexed by slug for each section and
   * a products object with all sections
   * @param data the data from storage
   */
  private indexProducts(data: StoreData): void {
    this.remedies = this.indexRemedies(data);

    this.products = {
      ...this.remedies,
    };
  }

  /**
   * Get all remedy categories from data
   * @returns a promise which resolves to all data from store
   */
  get remedyCategories(): StoreCategories<StoreRemedy> {
    return this.data.sections.remedies.categories;
  }

  get indexedProducts(): StoreProducts<StoreProductTypes> {
    return this.products;
  }

  get indexedRemedies(): StoreProducts<StoreRemedy> {
    return this.remedies;
  }

  get pharmacies(): StorePharmacies {
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
      writeFileSync('./src/data/data.json', JSON.stringify(this.data, null, '  '));
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