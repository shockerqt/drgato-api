import { Sequelize, DataTypes } from 'sequelize';

import { PriceStamp, Remedy, RemedyCategory } from './models';

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
      tableName: 'remedies',
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
      tableName: 'remedy_categories',
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
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      pharmacyId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'historical_prices',
      sequelize,
    },
  );

  sequelize.sync();

  return { PriceStamp, Remedy };
};
