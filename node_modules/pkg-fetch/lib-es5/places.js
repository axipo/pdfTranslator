"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localPlace = localPlace;
exports.remotePlace = remotePlace;

var _semver = require("semver");

var _expandTemplate = _interopRequireDefault(require("expand-template"));

var _os = _interopRequireDefault(require("os"));

var _path = _interopRequireDefault(require("path"));

var _places = _interopRequireDefault(require("../places.json"));

var expand = (0, _expandTemplate.default)();
var PKG_CACHE_PATH = process.env.PKG_CACHE_PATH;

var cachePath = PKG_CACHE_PATH || _path.default.join(_os.default.homedir(), '.pkg-cache');

function tagFromVersion(version) {
  var mj = (0, _semver.major)(version);
  var mn = (0, _semver.minor)(version);
  return `v${mj}.${mn}`;
}

function localPlace(opts) {
  var p = _places.default.localPlace;
  var version = opts.version;
  var tag = tagFromVersion(version);
  Object.assign(opts, {
    tag
  });

  var atHome = _path.default.join(cachePath, p);

  return expand(_path.default.resolve(atHome), opts);
}

function remotePlace(opts) {
  var p = _places.default.remotePlace;
  var version = opts.version;
  var tag = tagFromVersion(version);
  Object.assign(opts, {
    tag
  });
  return {
    tag,
    name: expand(p, opts)
  };
}