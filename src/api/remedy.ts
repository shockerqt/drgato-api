import { DataSource } from 'apollo-datasource';
import slugify from 'slugify';

import Store, { Remedies, RemediesByCategory, Remedy } from '../store';

export interface AddRemedyInput {
  category: string;
  name: string
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
  remedies: Remedies | null;
}

export interface GetRemedyBySlugPayload {
  success: boolean;
  message?: string;
  remedy?: Remedy;
}

export interface GetAllRemediesPayload {
  success: boolean;
  message?: string;
  remedies: Remedies | null;
}

export interface GetRemediesByCategoryPayload {
  success: boolean;
  message?: string;
  remediesByCategory: RemediesByCategory | null;
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
      ${remedy.netContent && remedy.netContentUnit ? `-${remedy.netContentUnit}` : ''}
      ${remedy.netContent && remedy.netContentUnit ? `-${remedy.netContentUnit}` : ''}
    `;

    return slugify(identifier);
  }

  /**
   * Add a remedy to storage.
   * It checks if another remedy with the same generated slug exists.
   * @param remedy the remedy to add
   * @returns AddRemedyPayload
   */
  public async addRemedy(remedy: AddRemedyInput): Promise<AddRemedyPayload> {
    const slug = this.generateRemedySlug(remedy);

    const remedyToAdd = {
      ...remedy,
      slug,
    };

    const remedies = await this.store.getRemedies();

    if (slug in remedies) return {
      success: false,
      message: `Operation Failed.\n"${slug}" is already in remedies storage\n`,
      remedies,
    };

    const response = await this.store.saveRemedies();

    return {
      success: response.ok,
      message: response.message,
      ...(response.ok && { addedRemedy: remedyToAdd }),
      remedies: response.remedies,
    };
  }

  /**
   * Get a remedy by its slug in storage if it exists.
   * @returns a remedy
   */
  public async getRemedyBySlug(slug: string): Promise<GetRemedyBySlugPayload> {

    const remedies = await this.store.getRemedies();

    if (!(slug in remedies)) return {
      success: false,
      message: `Operation Failed.\n"${slug}" doesn't exists in storage\n`,
    };

    return {
      success: true,
      remedy: remedies[slug],
    };
  }

  /**
   * Get all remedies from storage indexed by its slug.
   * @returns a remedies object with their slug as key.
   */
  public async getAllRemedies(): Promise<GetAllRemediesPayload> {

    const remedies = await this.store.getRemedies();

    return {
      success: true,
      remedies,
    };
  }

  /**
   * Get all remedies from storage indexed by its slug.
   * @returns a remedies object with their slug as key.
   */
  public async getRemediesByCategory(): Promise<GetRemediesByCategoryPayload> {

    const remediesByCategory = await this.store.getRemediesByCategory();

    return {
      success: true,
      remediesByCategory,
    };
  }

}
