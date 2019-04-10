"use strict";
const uuid = require("uuid/v4");

module.exports = (sequelize, DataTypes) => {
  const ShipmentUploads = sequelize.define(
    "ShipmentUploads",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: function() {
          return uuid();
        }
      },
      uniqueId: DataTypes.STRING,
      uploadSize: DataTypes.INTEGER,
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { paranoid: true }
  );
  return ShipmentUploads;
};
