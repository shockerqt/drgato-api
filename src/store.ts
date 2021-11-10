import { writeFileSync } from 'fs';

export interface Constraints {
  remedyCategories: string[];
  pharmacies: string[];
  units: {
    name: string;
    plural?: string;
  }
}

export interface Category {
  name: string;
  slug: string;
}

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


interface CommitResponse {
  ok: boolean;
  message: string;
}

export default class Store {
  private remedies: Remedy[] | null = null;
  private categories: Category[] | null = null;

  /**
   * Get remedies from storage.
   * Load from external json if array is not in memory.
   * @returns a promise which resolves to all remedies on storage
   */
  public async getRemedies() {
    if (!this.remedies) {
      const response = await import('./data/remedies.json');
      this.remedies = response.default;
    }
    return this.remedies;
  }

  /**
   * Get categories from storage.
   * Load from external json if array is not in memory.
   * @returns a promise which resolves to all categories on storage
   */
  public async getCategories() {
    if (!this.categories) {
      const response = await import('./data/categories.json');
      this.categories = response.default;
    }
    return this.categories;
  }

  /**
   * Save all remedies and categories to storage.
   * Create and indexed file with remedies grouped by categories.
   * @returns a promise with a status response
   */
  public async commit(): Promise<CommitResponse> {
    const [
      remedies,
      categories,
    ] = await Promise.all([this.getRemedies(), this.getCategories()]);

    try {
      writeFileSync('./src/data/remedies.json', JSON.stringify(remedies, null, '  '));
      writeFileSync('./src/data/categories.json', JSON.stringify(categories, null, '  '));

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
