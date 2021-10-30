import RemedyAPI from '../api/RemedyAPI';
import RemedyCategoryAPI from '../api/RemedyCategoryAPI';

export interface ResolverContextInterface {
  dataSources: {
    remedyAPI: RemedyAPI
    remedyCategoryAPI: RemedyCategoryAPI
  };
}

export interface RemedyInterface {
  id: number;
  name: string;
  categoryId: number;
  dose?: string;
  activePrincipleId: number;
  laboratoryId: number;
  netContent: number;
  netContentUnitId: number;
  formatId?: number;
}

export interface RemedyCategoryInterface {
  id: number;
  name: string;
}

