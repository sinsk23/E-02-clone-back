"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Items", "userkey", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Users 모델에서
        key: "userkey", // 그 아이디 값을 참고합니다.
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("Comments", "userkey", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Users 모델에서
        key: "userkey", // 그 아이디 값을 참고합니다.
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("Comments", "itemkey", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Items", // Users 모델에서
        key: "itemkey", // 그 아이디 값을 참고합니다.
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "Items", // name of Source model
      "userkey" // key we want to remove
    );

    await queryInterface.removeColumn(
      "Comments", // name of Source model
      "userkey" // key we want to remove
    );

    await queryInterface.removeColumn(
      "Comments", // name of Source model
      "itemkey" // key we want to remove
    );
  },
};
