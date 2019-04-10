const authController = require("./authController");
const homeController = require("./homeController");
const uploadController = require("./uploadController");
const chartController = require("./chartController");

module.exports = {
  auth: authController,
  home: homeController,
  upload: uploadController,
  chart: chartController
};
