"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userkey",
        targetKey: "userkey",
      });
      this.belongsTo(models.Item, {
        foreignKey: "itemkey",
        targetKey: "itemkey",
      });
    }
  }
  Like.init(
    {
      likekey: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
