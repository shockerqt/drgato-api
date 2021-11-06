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

export const createStore = async () => {

  const sequelize = new Sequelize('drgato', 'postgres', '32Bakemono', {
    host: 'localhost',
    dialect: 'postgres',
  });

  ActivePrinciple.init(
    {
      id: {
        type: DataTypes.INTEGER,
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
      tableName: 'active_principles',
      sequelize,
    },
  );

  Laboratory.init(
    {
      id: {
        type: DataTypes.INTEGER,
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
      tableName: 'laboratories',
      sequelize,
    },
  );

  Pharmacy.init(
    {
      id: {
        type: DataTypes.INTEGER,
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
      tableName: 'pharmacies',
      sequelize,
    },
  );

  PriceHistory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      remedyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pharmacyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url: DataTypes.STRING,
    },
    {
      modelName: 'PriceHistory',
      tableName: 'price_histories',
      sequelize,
    },
  );

  PriceStamp.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      priceHistoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: DataTypes.INTEGER,
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      modelName: 'PriceStamp',
      tableName: 'prices_stamps',
      sequelize,
    },
  );

  Remedy.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dose: DataTypes.STRING,
      activePrincipleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      laboratoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      netContent: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      netContentUnitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      formatId: DataTypes.INTEGER,
    },
    {
      modelName: 'Remedy',
      tableName: 'remedies',
      sequelize,
    },
  );

  RemedyCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
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
      tableName: 'remedy_categories',
      sequelize,
    },
  );

  RemedyFormat.init(
    {
      id: {
        type: DataTypes.INTEGER,
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
      tableName: 'remedy_formats',
      sequelize,
    },
  );

  Unit.init(
    {
      id: {
        type: DataTypes.INTEGER,
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
      tableName: 'units',
      sequelize,
    },
  );

  ActivePrinciple.hasMany(Remedy, {
    as: 'remedies',
    foreignKey: 'activePrincipleId',
    sourceKey: 'id',
  });

  Laboratory.hasMany(Remedy, {
    as: 'remedies',
    foreignKey: 'laboratoryId',
    sourceKey: 'id',
  });

  RemedyCategory.hasMany(Remedy, {
    as: 'remedies',
    foreignKey: 'categoryId',
    sourceKey: 'id',
  });

  RemedyFormat.hasMany(Remedy, {
    as: 'remedies',
    foreignKey: 'formatId',
    sourceKey: 'id',
  });

  Unit.hasMany(Remedy, {
    as: 'remedies',
    foreignKey: 'netContentUnitId',
    sourceKey: 'id',
  });

  Remedy.hasMany(PriceHistory, {
    as: 'priceHistories',
    foreignKey: 'remedyId',
    sourceKey: 'id',
  });

  PriceHistory.hasMany(PriceStamp, {
    as: 'priceStamps',
    foreignKey: 'priceHistoryId',
    sourceKey: 'id',
  });

  Pharmacy.hasMany(PriceHistory, {
    as: 'priceHistories',
    foreignKey: 'pharmacyId',
    sourceKey: 'id',
  });

  // sequelize.drop();
  // sequelize.sync({ force: true });

};
