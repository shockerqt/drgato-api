import RemedyAPI from './RemedyAPI';
import RemedyCategoryAPI from './RemedyCategoryAPI';

export type DataSources = {
  remedyAPI: RemedyAPI;
  remedyCategoryAPI: RemedyCategoryAPI;
};

export const dataSources = (): DataSources => ({
  remedyAPI: new RemedyAPI(),
  remedyCategoryAPI: new RemedyCategoryAPI(),
});
