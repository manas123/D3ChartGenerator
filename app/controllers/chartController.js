var db = require("../models");
var data2d3 = require("../utils/data2d3json");

module.exports = {
  view: function(req, res, next) {
    console.log(req.body);
    Promise.all([
      db.LoadMaster.findOne({
        where: {
          id: req.body.loadmasterid,
          createdBy: req.session.passport.user.id
        }
      }),
      db.ShipmentUploads.findOne({
        where: {
          uniqueId: req.body.shipmentsuploadid,
          createdBy: req.session.passport.user.id
        }
      })
    ]).then(result => {
      var loadmasters = result[0].get({ plain: true });
      var shipmentuploads = result[1].get({ plain: true });
      db.Shipments.findAll({
        where: {
          shipments_upload_id: shipmentuploads.id,
          createdBy: req.session.passport.user.id
        }
      }).then(result => {
        var shipments_details = result.map(x =>
          x.get({
            plain: true
          })
        );
        var d3json_fun = new data2d3.data2d3json();
        var d3json = d3json_fun.generate_json(loadmasters, shipments_details);
        // console.log(d3json);
        res.render("./charts/view", {
          messages: req.flash(),
          passport: req.session.passport,
          url: req.path,
          d3json: JSON.stringify(d3json)
        });
      });
    });
  }
};
