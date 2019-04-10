var controllers = require("./app/controllers/");
var passport = require("passport");

module.exports = function(app) {
  app.get("/", AlreadyLoggedIn, controllers.home.view);
  app.get("/dashboard", isLoggedIn, controllers.home.dashboard);
  app.post("/uploadLoadMaster", isLoggedIn, controllers.upload.loadMaster);
  app.post("/uploadShipments", isLoggedIn, controllers.upload.shipments);
  app.post("/chartview", isLoggedIn, controllers.chart.view);

  app.get("/login", AlreadyLoggedIn, controllers.auth.login);
  app.get("/signup", AlreadyLoggedIn, controllers.auth.signup);
  app.get("/logout", controllers.auth.logout);

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      failureRedirect: "/signup",
      failureFlash: true,
      successRedirect: "/dashboard"
    })
  );

  app.post(
    "/login",
    passport.authenticate("local-signin", {
      failureRedirect: "/login",
      failureFlash: true,
      successRedirect: "/dashboard"
    })
  );

  function isLoggedIn(req, res, next) {
    if (req.session.passport) return next();
    res.redirect("/login");
  }

  function AlreadyLoggedIn(req, res, next) {
    if (req.session.passport) res.redirect("/dashboard");
    return next();
  }

  app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  if (app.get("env") === "development") {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render("error", { message: err.message, error: err, title: "error" });
    });
  }

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error", { message: err.message, error: {}, title: "error" });
  });
};
