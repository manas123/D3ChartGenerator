"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Shipments", {
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
      shipment_id: {
        type: Sequelize.STRING
      },
      source_id: {
        type: Sequelize.STRING
      },
      destination_id: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.STRING
      },
      new_shipment_id: {
        type: Sequelize.STRING
      },
      new_weight: {
        type: Sequelize.STRING
      },
      new_cost: {
        type: Sequelize.STRING
      },
      total_tls: {
        type: Sequelize.STRING
      },
      shipments_upload_id: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable("Shipments");
  }
};
