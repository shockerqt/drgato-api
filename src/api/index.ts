export { default as RemedyAPI } from './remedyAPI';

export interface Remedy {
  slug: string;
  category: string;
  name: string;
  dose?: string;
  activePrinciple: string;
  laboratory: string;
  netContent?: number;
  netContentUnit?: string;
  format?: string;
}

export interface RemedyCategory {
  slug: string;
  name: string;
}

export interface Pharmacy {
  slug: string;
  name: string;
}

export interface Vendor {
  pharmacy: string;
  lastPrice?: number;
  url: string;
}

export interface AddRemedyInput {
  name: string;
  category: string;
  dose?: string;
  activePrinciple: string;
  laboratory: string;
  netContent?: number;
  netContentUnit?: string;
  format?: string;
  vendors?: VendorInput[];
}

export interface VendorInput {
  pharmacy: string;
  url: string;
}

export interface AddRemedyPayload {
  success: boolean;
  message?: string;
  addedRemedy?: Remedy;
}

export interface UpdateRemedyInput {
  slug: string;
  name?: string;
  category?: string;
  dose?: string;
  activePrinciple?: string;
  laboratory?: string;
  netContent?: number;
  netContentUnit?: string;
  format?: string;
  vendors?: string[];
}

export interface UpdateRemedyPayload {
  success: boolean;
  message?: string;
  updatedRemedy?: Remedy;
}

export interface AddRemedyCategoryInput {
  name: string;
}

export interface AddRemedyCategoryPayload {
  success: boolean;
  message?: string;
  addedCategory?: RemedyCategory;
}

export interface AddPharmacyInput {
  name: string;
}

export interface AddPharmacyPayload {
  success: boolean;
  message?: string;
  addedPharmacy?: Pharmacy;
}

export interface AddVendorInput {
  remedySlug: string;
  pharmacySlug: string;
  url: string;
}

export interface AddVendorPayload {
  success: boolean;
  message?: string;
  addedVendor?: Vendor;
  updatedRemedy?: Remedy;
}

export interface RemedySheetInput {
  category: string;
  sheet: string;
}

export interface RemedySheetPayload {
  success: boolean;
  message?: string;
  addedVendor?: Vendor;
  remedies?: Remedy[];
}
