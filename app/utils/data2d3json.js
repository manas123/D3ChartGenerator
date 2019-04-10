var unique = require("array-unique");

function data2d3json() {
  this.dataJSON = {};
}

data2d3json.prototype.get_json = function() {
  return this.dataJSON;
};

data2d3json.prototype.generate_json = function(loadmaster, shipments) {
  var self = this;
  self.dataJSON = {};
  var master_circle_id = shipments.map(x => x[loadmaster.master_circle])[0];
  self.dataJSON["name"] = master_circle_id;
  var parent_circles = unique(shipments.map(x => x[loadmaster.parent_circle]));
  self.dataJSON["children"] = parent_circles.map(parent => {
    var specific_shipments_p = shipments.filter(
      y => y[loadmaster.parent_circle] == parent
    );
    var parentJSON = {};
    parentJSON["name"] = specific_shipments_p[0][loadmaster.parent_circle];
    parentJSON["size"] = specific_shipments_p[0][loadmaster.parent_size];
    parentJSON["value"] = specific_shipments_p[0][loadmaster.parent_tooltip];
    parentJSON["children"] = specific_shipments_p.map(child => {
      var childJson = {};
      childJson["name"] = child[loadmaster.children_circle];
      childJson["size"] = child[loadmaster.children_size];
      childJson["value"] = child[loadmaster.children_tooltip];
      return childJson;
    });
    return parentJSON;
  });
  return self.dataJSON;
};

module.exports = {
  data2d3json: data2d3json,
  data2d3json_obj: new data2d3json()
};
