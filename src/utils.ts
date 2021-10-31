import { Sequelize, DataTypes } from 'sequelize';

import {
  ActivePrinciple,
  Laboratory,
  PriceHistory,
  PriceStamp,
  Remedy,
  RemedyCategory,
  RemedyFormat,
  Unit,
} from './models';
import Pharmacy from './models/Pharmacy';

// export const paginateResults = ({
//   after: cursor,
//   pageSize = 20,
//   results,
//   // can pass in a function to calculate an item's cursor
//   getCursor = (_item: { cursor: unknown; }) => null,
// }) => {
//   if (pageSize < 1) return [];

//   if (!cursor) return results.slice(0, pageSize);

//   const cursorIndex = results.findIndex((item: { cursor: any; }) => {
//     // if an item has a `cursor` on it, use that, otherwise try to generate one
//     const itemCursor = item.cursor ? item.cursor : getCursor(item);

//     // if there's still not a cursor, return false by default
//     return itemCursor ? cursor === itemCursor : false;
//   });

//   return cursorIndex >= 0
//     ? cursorIndex === results.length - 1 // don't let us overflow
//       ? []
//       : results.slice(
//         cursorIndex + 1,
//         Math.min(results.length, cursorIndex + 1 + pageSize),
//       )
//     : results.slice(0, pageSize);
// };

export const createStore = () => {

  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './store.sqlite',
  });

  ActivePrinciple.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: 'ActivePrinciple',
      tableName: 'ActivePrinciples',
      sequelize,
    },
  );

  Laboratory.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: 'Laboratory',
      tableName: 'Laboratories',
      sequelize,
    },
  );

  Pharmacy.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: 'Pharmacy',
      tableName: 'Pharmacies',
      sequelize,
    },
  );

  PriceHistory.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      remedyId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      pharmacyId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      url: DataTypes.STRING,
    },
    {
      modelName: 'PriceHistory',
      tableName: 'PriceHistories',
      sequelize,
    },
  );

  PriceStamp.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      priceHistoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      price: DataTypes.INTEGER.UNSIGNED,
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      modelName: 'PriceStamp',
      tableName: 'PriceStamps',
      sequelize,
    },
  );

  Remedy.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      dose: DataTypes.STRING,
      activePrincipleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      laboratoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      netContent: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      netContentUnitId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      formatId: DataTypes.INTEGER.UNSIGNED,
    },
    {
      modelName: 'Remedy',
      tableName: 'Remedies',
      sequelize,
    },
  );

  RemedyCategory.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: 'RemedyCategory',
      tableName: 'RemedyCategories',
      sequelize,
    },
  );

  RemedyFormat.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: 'RemedyFormat',
      tableName: 'RemedyFormats',
      sequelize,
    },
  );

  Unit.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: 'Unit',
      tableName: 'Units',
      sequelize,
    },
  );

  ActivePrinciple.hasMany(Remedy, {
    sourceKey: 'id',
    foreignKey: 'activePrincipleId',
    as: 'remedies',
  });

  Laboratory.hasMany(Remedy, {
    sourceKey: 'id',
    foreignKey: 'laboratoryId',
    as: 'remedies',
  });

  RemedyCategory.hasMany(Remedy, {
    sourceKey: 'id',
    foreignKey: 'categoryId',
    as: 'remedies',
  });

  RemedyFormat.hasMany(Remedy, {
    sourceKey: 'id',
    foreignKey: 'formatId',
    as: 'remedies',
  });

  Unit.hasMany(Remedy, {
    sourceKey: 'id',
    foreignKey: 'netContentUnitId',
    as: 'remedies',
  });

  Remedy.hasMany(PriceHistory, {
    sourceKey: 'id',
    foreignKey: 'remedyId',
    as: 'priceHistories',
  });

  PriceHistory.hasMany(PriceStamp, {
    sourceKey: 'id',
    foreignKey: 'priceHistoryId',
    as: 'priceStamps',
  });

  Pharmacy.hasMany(PriceHistory, {
    sourceKey: 'id',
    foreignKey: 'pharmacyId',
    as: 'priceHistories',
  });

  sequelize.sync({ force: true });

};
