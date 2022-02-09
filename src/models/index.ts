import RemedyStore from './remedyStore';
import ConstraintsStore from './constraintsStore';
import StoreDevAPI from './storeDevAPI';

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

export interface ProductsData {
  remedies: RemediesModel;
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

export interface SectionsModel {
  remedies: { name: string, categories: RemedyCategoriesModel };
}

export interface ConstraintsData {
  pharmacies: PharmaciesModel;
  sections: SectionsModel;
}

export interface StoreData {
  constraints: ConstraintsData;
  remedies: RemediesModel;
}

export type StoreTarget = 'remedies' | 'constraints';

export default class Store {
  private data!: StoreData;
  public remedyStore!: RemedyStore;
  public constraintsStore!: ConstraintsStore;
  public storeAPI: StoreDevAPI;
  // public s3Client: S3Client;

  constructor() {
    this.storeAPI = new StoreDevAPI();
    // this.s3Client = new S3Client({ region: 'us-east-1' });
    // this.initS3();
  }

  // public async initS3() {
  //   try {
  //     const data = await this.s3Client.send(new ListBucketsCommand({}));
  //     console.log('Success', data.Buckets);
  //   } catch (error) {
  //     console.log('Error', error);
  //   }
  // }

  public async init(): Promise<void> {
    this.data = await this.storeAPI.loadData();
    this.constraintsStore = new ConstraintsStore(this, this.data.constraints);
    this.remedyStore = new RemedyStore(this, this.data.remedies);
  }
  /**
   * Save all data to external storage.
   * @returns a promise with a status response
   */
  public async commit(targets: StoreTarget[] = ['remedies', 'constraints']): Promise<CommitResponse> {

    if (!this.data) return {
      ok: false,
      message: 'Nothing to commit.',
    };

    return await this.storeAPI.commit(this.data, targets);
  }
}
