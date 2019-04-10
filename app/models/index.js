const path = require("path");
const Sequelize = require("sequelize");
var basename = path.basename(__filename);
var config = require(__dirname + "/../../config/config");
var db = {};
const glob = require("glob");

const sequelize = new Sequelize(config.db);

var getDirectories = function(src, callback) {
  glob(src + "/**/*", callback);
};

getDirectories(__dirname, function(err, res) {
  if (err) {
    console.log("Error", err);
  } else {
    res.forEach(function(entry) {
      if (
        entry.indexOf(".") !== 0 &&
        entry !== path.join(__dirname, basename) &&
        entry.slice(-3) === ".js"
      ) {
        var model = sequelize["import"](entry);
        db[model.name] = model;
      }
    });
  }
  db.LoadMaster.belongsTo(db.User, {
    foreignKey: "createdBy",
    as: "createdByUser"
  });
  db.Shipments.belongsTo(db.User, {
    foreignKey: "createdBy",
    as: "createdByUser"
  });
  db.ShipmentUploads.belongsTo(db.User, {
    foreignKey: "createdBy",
    as: "createdByUser"
  });
  db.Shipments.belongsTo(db.ShipmentUploads, {
    foreignKey: "shipments_upload_id",
    as: "ShipmentUpload"
  });
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
