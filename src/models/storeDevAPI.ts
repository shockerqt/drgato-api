import { writeFileSync } from 'fs';
import {
  CommitResponse,
  StoreData,
  StoreTarget,
  ConstraintsData,
  RemediesModel,
} from '.';

export default class StoreDevAPI {

  /**
   * Load data from external storage if not in memory
   * @returns  a promise that resolves to the data
   */
  public async loadData(): Promise<StoreData> {
    try {
      const { default: constraints } = await import('../data/constraints.json') as { default: ConstraintsData };
      const { default: remedies } = await import('../data/remedies.json') as { default: RemediesModel };
      return {
        constraints: {
          pharmacies: constraints.pharmacies,
          sections: constraints.sections,
        },
        remedies,
      };
    } catch (error) {
      return {
        constraints: {
          pharmacies: {},
          sections: {
            remedies: {
              name: 'Remedios',
              categories: {},
            },
          },
        },
        remedies: {},
      };
    }
  }

  public async commit(data: StoreData, targets: StoreTarget[]): Promise<CommitResponse> {
    const errors: string[] = [];
    targets.forEach(target => {
      try {
        writeFileSync(`./src/data/${target}.json`, JSON.stringify(data[target], null, '  '));
        return {
          ok: true,
          message: 'Succesfully commited to storage.',
        };
      } catch (error) {
        errors.push(target);
      }
    });

    if (errors.length) {
      return {
        ok: false,
        message: `Failed to commit ${errors.join(', ')}`,
      };
    } else {
      return {
        ok: true,
        message: `Succesfully commited to storage ${targets.join(', ')}.`,
      };
    }
  }
}
