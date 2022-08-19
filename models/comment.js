"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
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
  Comment.init(
    {
      commentkey: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      comment: DataTypes.STRING,
      star: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
