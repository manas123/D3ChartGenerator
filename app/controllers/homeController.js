var db = require("../models");

module.exports = {
  view: function(req, res, next) {
    console.log("User: ", req.session);
    res.render("home", {
      messages: req.flash(),
      passport: req.session.passport,
      url: req.path
    });
  },
  dashboard: function(req, res, next) {
    Promise.all([
      db.LoadMaster.findAll({
        where: {
          createdBy: req.session.passport.user.id
        }
      }),
      db.ShipmentUploads.findAll({
        where: {
          createdBy: req.session.passport.user.id
        }
      })
    ]).then(result => {
      var loadmasters = result[0].map(x =>
        x.get({
          plain: true
        })
      );
      var loadmasters_ids = loadmasters.map(x => x.id);
      var shipmentuploads = result[1].map(x =>
        x.get({
          plain: true
        })
      );
      var shipmentuploads_ids = shipmentuploads.map(x => x.uniqueId);
      res.render("./dashboard/view", {
        messages: req.flash(),
        passport: req.session.passport,
        url: req.path,
        loadmasters: loadmasters,
        loadmasters_ids: loadmasters_ids,
        shipmentuploads: shipmentuploads,
        shipmentuploads_ids: shipmentuploads_ids
      });
    });
  }
};
