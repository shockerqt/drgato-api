import { writeFile } from 'fs';

export interface Constraints {
  remedyCategories: string[];
  pharmacies: string[];
  units: {
    name: string;
    plural?: string;
  }
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

export interface Remedies {
  [key: string]: Remedy;
}

export interface RemediesByCategory {
  [key: string]: Remedy[] | undefined;
}

interface StoreResponse {
  ok: boolean;
  message: string;
  remedies: Remedies;
}

export default class Store {
  private remedies: Remedies | null = null;
  private remediesByCategory: RemediesByCategory | null = null;
  private constraints: Constraints | null = null;
  private addedRemediesCount = 0;
  private removedRemediesCount = 0;

  public async getRemedies() {
    if (!this.remedies) {
      const response = await import('./data/remedies.json');
      this.remedies = response.default;
    }
    return this.remedies;
  }

  public async getRemediesByCategory() {
    if (!this.remediesByCategory) {
      const response = await import('./data/remediesByCategory.json');
      this.remediesByCategory = response.default;
    }
    return this.remediesByCategory;
  }

  public async saveRemedies(): Promise<StoreResponse> {
    const remedies = await this.getRemedies();
    const remediesByCategory: RemediesByCategory = {};
    Object.values(remedies).forEach((remedy) => {
      if (!remediesByCategory[remedy.category]) remediesByCategory[remedy.category] = [];
      remediesByCategory[remedy.category]?.push(remedy);
    });

    try {
      writeFile('./data/remedies.json', JSON.stringify(remedies), (error) => {
        if (error) throw {
          message: `
            Failed to write to 'remedies.json'.\n
            ${this.addedRemediesCount > 0 ? `Couldn't add ${this.addedRemediesCount} remedies.\n` : ''}
            ${this.removedRemediesCount > 0 ? `Couldn't remove ${this.removedRemediesCount} remedies.\n` : ''}
          `,
        };
      });
      writeFile('./data/remediesByCategory.json', JSON.stringify(remedies), (error) => {
        if (error) throw {
          message: `
            Failed to write to 'remediesByCategory.json'.\n
            ${this.addedRemediesCount > 0 ? `Couldn't add ${this.addedRemediesCount} remedies.\n` : ''}
            ${this.removedRemediesCount > 0 ? `Couldn't remove ${this.removedRemediesCount} remedies.\n` : ''}
          `,
        };
      });
      return {
        ok: true,
        message: `
          Succesfully writed remedies to storage.\n
          ${this.addedRemediesCount > 0 ? `Added ${this.addedRemediesCount} remedies.\n` : ''}
          ${this.removedRemediesCount > 0 ? `Removed ${this.removedRemediesCount} remedies.\n` : ''}
        `,
        remedies,
      };
    } catch (error: any) {
      return {
        ok: false,
        message: error.message,
        remedies,
      };
    }
  }

}
