"use strict";

var routington = require("routington");

/**
 * Generates the checking router from the swagger def
 * @param def {Swagger} The swagger complete definition
 * @param options {Object} Optional options dict.
 * @param options.basePath {string} Override swagger docs basePath.
 * @return {routington} A router
 */
module.exports = function genRouter(def, options) {
  var paths = def.paths;
  var base = options.basePath || def.basePath || "";

  var router = routington();
  Object.keys(paths).forEach(function eachRoute(routeWithSwaggerParams) {
    // Rewrite {param} to :param
    var route = routeWithSwaggerParams.replace(/\{([^\/]+)\}/g, ':$1');
    var node = router.define(base + route)[0];
    node.def = paths[routeWithSwaggerParams];
  });
  return router;
};
