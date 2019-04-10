"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("LoadMasters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      table: {
        type: Sequelize.STRING
      },
      master_circle: {
        type: Sequelize.STRING
      },
      parent_circle: {
        type: Sequelize.STRING
      },
      children_circle: {
        type: Sequelize.STRING
      },
      parent_size: {
        type: Sequelize.STRING
      },
      children_size: {
        type: Sequelize.STRING
      },
      parent_tooltip: {
        type: Sequelize.STRING
      },
      children_tooltip: {
        type: Sequelize.STRING
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("LoadMasters");
  }
};
