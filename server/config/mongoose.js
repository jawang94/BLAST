var mongoose = require("mongoose");
var path = require("path");
var fs = require("fs");

module.exports = mongoose.connect(
  "mongodb://localhost:27017/mean_group_project",
  { useNewUrlParser: true }
);

var models_path = path.join(__dirname, "../models");
fs.readdirSync(models_path).forEach(function(file) {
  if (file.indexOf(".js") >= 0) {
    require(models_path + "/" + file);
  }
});
