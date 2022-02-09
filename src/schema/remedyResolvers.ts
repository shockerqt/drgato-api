import { DataSources } from '..';
import {
  AddPharmacyInput,
  AddRemedyCategoryInput,
  AddRemedyInput,
  AddVendorInput,
  Remedy,
  RemedyCategory,
  RemedySheetInput,
  UpdateRemedyInput,
  Vendor,
} from '../api';

export default {

  Query: {

    categories: (
      _: never,
      __: never,
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getCategories(),

    category: (
      _: never,
      { name }: { name: string },
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getCategoryByName(name),

    remedy: (
      _: never,
      { slug }: { slug: string },
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getRemedyBySlug(slug),

    remedies: (
      _: never,
      __: never,
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getRemedies(),

    pharmacy: (
      _: never,
      { pharmacySlug }: { pharmacySlug: string },
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getPharmacy(pharmacySlug),

    pharmacies: (
      _: never,
      __: never,
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getPharmacies(),

    vendors: (
      _: never,
      { remedySlug }: { remedySlug: string },
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getRemedyVendors(remedySlug),
  },

  Category: {
    remedies: (
      parent: RemedyCategory,
      __: never,
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getRemediesByCategory(parent.slug),
  },

  Remedy: {
    category: (
      parent: Remedy,
      __: never,
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getCategoryByName(parent.category),

    vendors: (
      parent: Remedy,
      __: never,
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getRemedyVendors(parent.slug),

  },

  Vendor: {
    pharmacy: (
      parent: Vendor,
      __: never,
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getPharmacy(parent.pharmacy),
  },

  Mutation: {

    remedySheet: (
      _: never,
      { input }: { input: RemedySheetInput },
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.sheet(input),

    addRemedy: (
      _: never,
      { input }: { input: AddRemedyInput },
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.addRemedy(input),

    updateRemedy: (
      _: never,
      { input }: { input: UpdateRemedyInput },
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.updateRemedy(input),

    addCategory: (
      _: never,
      { input }: { input: AddRemedyCategoryInput },
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.addCategory(input),

    addPharmacy: (
      _: never,
      { input }: { input: AddPharmacyInput },
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.addPharmacy(input),

    addVendor: (
      _: never,
      { input }: { input: AddVendorInput },
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.addVendor(input),
  },

};
