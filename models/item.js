"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      this.hasMany(models.Comment, {
        foreignKey: "itemkey",
        sourceKey: "itemkey",
      });
      this.hasMany(models.Like, {
        foreignKey: "itemkey",
        sourceKey: "itemkey",
      });

      this.belongsTo(models.User, {
        foreignKey: "userkey",
        targetKey: "userkey",
      });
    }
  }
  Item.init(
    {
      itemkey: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      category: DataTypes.STRING,
      price: DataTypes.INTEGER,
      location: DataTypes.STRING,
      img: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
