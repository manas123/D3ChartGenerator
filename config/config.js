const path = require("path");
const rootPath = path.normalize(__dirname + "/..");
const env = process.env.NODE_ENV || "development";
var fs = require("fs");
var secrets = JSON.parse(fs.readFileSync("config/secrets.json", "utf8"));
var database = JSON.parse(fs.readFileSync("config/database.json", "utf8"));

const config = {
  development: {
    root: rootPath,
    app: { name: "Opex" },
    port: process.env.PORT || 9000,
    db:
      "postgres://" +
      database["development"]["username"] +
      ":" +
      database["development"]["password"] +
      "@" +
      database["development"]["host"] +
      ":" +
      database["development"]["port"] +
      "/" +
      database["development"]["database"]
  },

  test: {
    root: rootPath,
    app: { name: "Opex" },
    port: process.env.PORT || 9000,
    db:
      "postgres://" +
      database["test"]["username"] +
      ":" +
      database["test"]["password"] +
      "@" +
      database["test"]["host"] +
      ":" +
      database["test"]["port"] +
      "/" +
      database["test"]["database"]
  },

  production: {
    root: rootPath,
    app: { name: "Opex" },
    port: process.env.PORT || 9000,
    db:
      "postgres://" +
      database["production"]["username"] +
      ":" +
      database["production"]["password"] +
      "@" +
      database["production"]["host"] +
      ":" +
      database["production"]["port"] +
      "/" +
      database["production"]["database"]
  }
};

module.exports = config[env];
