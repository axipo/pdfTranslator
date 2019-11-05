"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tempPath = tempPath;

var _uniqueTempDir = _interopRequireDefault(require("unique-temp-dir"));

function tempPath() {
  return _uniqueTempDir.default.apply(void 0, arguments);
}