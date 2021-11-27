import { DataSources } from '..';
import {
  AddCategoryInput,
  AddRemedyInput,
  UpdateRemedyInput,
  Category,
  Remedy,
  AddPharmacyInput,
  AddVendorInput,
} from '../api/remedyAPI';

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

    pharmacies: (
      _: never,
      __: never,
      { dataSources }: { dataSources: DataSources },
    ) => dataSources.remedyAPI.getPharmacies(),

  },

  Category: {
    remedies: (
      parent: Category,
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

    // vendors: (
    //   parent: Remedy,
    //   __: never,
    //   { dataSources }: { dataSources: DataSources },
    // ) => dataSources.remedyAPI.getRemedyVendors(parent.category),

  },

  Mutation: {

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
      { input }: { input: AddCategoryInput },
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
