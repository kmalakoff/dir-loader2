var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var urlToRequest = require('loader-utils').urlToRequest;
var parseQuery = require('loader-utils').parseQuery;

var genPlaceholder = require('dir-loader/lib/util').genPlaceholder;
var genReplacer = require('dir-loader/lib/util').genReplacer;

var requirePlaceholder = genPlaceholder('require');
var requireReplacer = genReplacer('require', function (str) { return "require(" + str + ")"; });

function isSelected(filter, name, fullPath) {
  if (!filter) return true;
  if (_.isRegExp(filter)) return filter.test(name);
  if (_.isFunction(filter)) return filter(name, fullPath);
  return true;
}

function readFile(fullPath, options, stat) {
  var requirePath = options.pathTransform(urlToRequest(path.relative(options.webpackContext, fullPath)));
  var contents = requirePlaceholder(requirePath);

  var name = fullPath.split(path.sep).pop();
  return {
    data: {
      name: name,
      pathParts: _.compact([options.directory].concat(fullPath.slice(options.path.length+1).split(path.sep))),
      contents: contents,
      stat: {
        size: stat.size,
        mtime:  stat.mtime
      }
    },
  };
}

function readDirectory(fullPath, options, stat) {
  var children = [];
  fs.readdirSync(fullPath).map(function(filename) {
    var childPath = path.join(fullPath, filename);
    var stat = fs.statSync(childPath);
    if (stat.isDirectory()) {
      if (!isSelected(options.dirFilter, filename, childPath)) return;
      children.push(readDirectory(childPath, options, stat));
    }
    else {
      if (!isSelected(options.filter, filename, childPath)) return;
      children.push(readFile(childPath, options, stat));
    }
  });

  var name = fullPath.split(path.sep).pop();
  return {
    data: {
      name: name,
      pathParts: _.compact([options.directory].concat(fullPath.slice(options.path.length+1).split(path.sep))),
      isDirectory: true
    },
    children: children
  };
}

module.exports = function(source) {
  !this.cacheable || this.cacheable();
  var options = this.exec(source, this.resource);
  var webpackContext = this.context;

  // check options
  var required = ['path'];
  for (var i = 0; i < required.length; i++) {
    var k = required[i];
    if (!options[k]) throw new Error("The option " + k + " is required for fs-loader");
  }
  if (!webpackContext || typeof webpackContext !== "string") {
    throw Error("Could not initialize webpack context", webpackContext);
  }

  options.pathTransform = options.pathTransform || (function(_) {return _;});
  options.webpackContext = webpackContext;

  var fullPath = options.path;
  options.directory = fullPath.split(path.sep).pop();
  var output = readDirectory(fullPath, options);
  output = JSON.stringify(output, undefined, 2);
  output = requireReplacer(output);

  return "module.exports = " + output + ";";
};
