"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plusx = plusx;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = require("fs-extra");

function plusx(_x) {
  return _plusx.apply(this, arguments);
}

function _plusx() {
  _plusx = (0, _asyncToGenerator2.default)(function* (file) {
    const s = yield (0, _fsExtra.stat)(file);
    const newMode = s.mode | 64 | 8 | 1;
    if (s.mode === newMode) return;
    const base8 = newMode.toString(8).slice(-3);
    yield (0, _fsExtra.chmod)(file, base8);
  });
  return _plusx.apply(this, arguments);
}