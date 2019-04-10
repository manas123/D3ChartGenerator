"use strict";
const uuid = require("uuid/v4");

module.exports = (sequelize, DataTypes) => {
  const LoadMaster = sequelize.define(
    "LoadMaster",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: function() {
          return uuid();
        }
      },
      table: DataTypes.STRING,
      master_circle: DataTypes.STRING,
      parent_circle: DataTypes.STRING,
      children_circle: DataTypes.STRING,
      parent_size: DataTypes.STRING,
      children_size: DataTypes.STRING,
      parent_tooltip: DataTypes.STRING,
      children_tooltip: DataTypes.STRING,
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { paranoid: true }
  );
  return LoadMaster;
};
