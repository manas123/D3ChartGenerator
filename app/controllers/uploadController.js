var db = require("../models");
var csvjson = require("csvjson");
const pad = require("pad");

module.exports = {
  loadMaster: function(req, res, next) {
    if (Object.keys(req.files).length > 0) {
      req.flash("success", "Configuration File successfully Uploaded");
      var data = JSON.parse(req.files.loadmaster.data);
      db.LoadMaster.create({
        table: data.loadMaster[0].table,
        master_circle: data.loadMaster[0]["master circle"],
        parent_circle: data.loadMaster[0]["parent circle"],
        children_circle: data.loadMaster[0]["children circle"],
        parent_size: data.loadMaster[0]["parent size"],
        children_size: data.loadMaster[0]["children size"],
        parent_tooltip: data.loadMaster[0]["parent tooltip"],
        children_tooltip: data.loadMaster[0]["children tooltip"],
        createdBy: req.session.passport.user.id
      }).then(() => {
        res.redirect("/dashboard");
      });
    } else {
      req.flash("error", "Please Upload file again, No data!");
      res.redirect("/dashboard");
    }
  },
  shipments: function(req, res, next) {
    if (Object.keys(req.files).length > 0) {
      req.flash("success", "Shipments file successfully Uploaded");
      var options = {
        delimiter: ",",
        quote: '"'
      };
      var arr_data = csvjson.toObject(
        req.files.shipments.data.toString("utf8"),
        options
      );
      db.ShipmentUploads.create({
        uploadSize: req.files.shipments.size,
        createdBy: req.session.passport.user.id
      }).then(data => {
        db.ShipmentUploads.update(
          {
            uniqueId: "S" + pad(5, data.id.toString(), "0")
          },
          {
            where: { uuid: data.uuid }
          }
        );
        arr_data.forEach(function(e) {
          e["shipments_upload_id"] = data.id;
          e["createdBy"] = req.session.passport.user.id;
        });
        db.Shipments.bulkCreate(arr_data).then(() => {
          res.redirect("/dashboard");
        });
      });
    } else {
      req.flash("error", "Please Upload file again, No data!");
      res.redirect("/dashboard");
    }
  }
};
