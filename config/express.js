const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compress = require("compression");
const methodOverride = require("method-override");
var session = require("express-session");
var flash = require("connect-flash");
var passport = require("passport");
var secrets = require("./secrets.json");
const logger = require("morgan");
const fileUpload = require("express-fileupload");

module.exports = (app, config) => {
  const env = process.env.NODE_ENV || "development";
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == "development";

  app.set("views", config.root + "/app/views");
  app.set("view engine", "pug");
  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cookieParser(secrets.cookiee.secret));
  app.use(compress());
  app.use(methodOverride());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(
    session({
      secret: secrets.session.secret,
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(flash());
  app.use(fileUpload());
  app.use(express.static(config.root + "/public"));
  // app.use('*/css', express.static(config.root + '/public/css'));
  // app.use('*/images', express.static(config.root + '/public/images'));
  // app.use('*/js', express.static(config.root + '/public/js'));
  // app.use(express.static(config.root + '/vendor'));
  // app.use('*/theme', express.static(config.root + '/vendor/theme'));
  // app.use('*/theme2', express.static(config.root + '/vendor/theme2'));
  // app.use('*/datatables', express.static(config.root + '/vendor/DataTables'));

  app.use(function(req, res, next) {
    if (req.session.error) {
      var msg = req.session.error;
      req.session.error = undefined;
      app.locals.errorMessage = msg;
    } else {
      app.locals.errorMessage = undefined;
    }

    next();
  });

  return app;
};
