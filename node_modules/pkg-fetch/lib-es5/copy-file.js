"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyFile = copyFile;
exports.moveFile = moveFile;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function copyFile(src, dest) {
  return _fsExtra.default.copy(src, dest);
}

function moveFile(src, dest) {
  return _fsExtra.default.move(src, dest);
}