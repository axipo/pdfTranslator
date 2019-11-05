"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plusx = plusx;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = require("fs-extra");

function plusx(_x) {
  return _plusx.apply(this, arguments);
}

function _plusx() {
  _plusx = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(file) {
    var s, newMode, base8;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fsExtra.stat)(file);

          case 2:
            s = _context.sent;
            newMode = s.mode | 64 | 8 | 1;

            if (!(s.mode === newMode)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            base8 = newMode.toString(8).slice(-3);
            _context.next = 9;
            return (0, _fsExtra.chmod)(file, base8);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _plusx.apply(this, arguments);
}