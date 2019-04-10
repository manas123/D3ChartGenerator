"use strict";
const uuid = require("uuid/v4");

module.exports = (sequelize, DataTypes) => {
  const Shipments = sequelize.define(
    "Shipments",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: function() {
          return uuid();
        }
      },
      shipment_id: DataTypes.STRING,
      source_id: DataTypes.STRING,
      destination_id: DataTypes.STRING,
      date: DataTypes.STRING,
      weight: DataTypes.STRING,
      cost: DataTypes.STRING,
      new_shipment_id: DataTypes.STRING,
      new_weight: DataTypes.STRING,
      new_cost: DataTypes.STRING,
      total_tls: DataTypes.STRING,
      shipments_upload_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { paranoid: true }
  );
  Shipments.associate = function(models) {
    // associations can be defined here
  };
  return Shipments;
};
