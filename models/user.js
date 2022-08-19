"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Item, {
        foreignKey: "userkey",
        sourceKey: "userkey",
      });
      this.hasMany(models.Comment, {
        foreignKey: "userkey",
        sourceKey: "userkey",
      });
      this.hasMany(models.Like, {
        foreignKey: "userkey",
        sourceKey: "userkey",
      });
    }
  }
  User.init(
    {
      userkey: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: DataTypes.STRING,
      email: DataTypes.STRING,
      host: DataTypes.BOOLEAN,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
