"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wasReported = wasReported;
exports.log = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _progress = _interopRequireDefault(require("progress"));

var _assert = _interopRequireDefault(require("assert"));

var _chalk = _interopRequireDefault(require("chalk"));

var Log =
/*#__PURE__*/
function () {
  function Log() {
    (0, _classCallCheck2.default)(this, Log);
  }

  (0, _createClass2.default)(Log, [{
    key: "_lines",
    value: function _lines(lines) {
      if (lines === undefined) return;

      if (!Array.isArray(lines)) {
        console.log(`  ${lines}`);
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var line = _step.value;
          console.log(`  ${line}`);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "debug",
    value: function debug(text, lines) {
      if (!this.debugMode) return;
      console.log(`> ${_chalk.default.green('[debug]')} ${text}`);

      this._lines(lines);
    }
  }, {
    key: "info",
    value: function info(text, lines) {
      console.log(`> ${text}`);

      this._lines(lines);
    }
  }, {
    key: "warn",
    value: function warn(text, lines) {
      console.log(`> ${_chalk.default.blue('Warning')} ${text}`);

      this._lines(lines);
    }
  }, {
    key: "error",
    value: function error(text, lines) {
      if (text.stack) text = text.stack;
      console.log(`> ${_chalk.default.red('Error!')} ${text}`);

      this._lines(lines);
    }
  }, {
    key: "enableProgress",
    value: function enableProgress(text) {
      (0, _assert.default)(!this.bar);
      text += ' '.repeat(28 - text.length);
      this.bar = new _progress.default(`  ${text} [:bar] :percent`, {
        stream: process.stdout,
        width: 20,
        complete: '=',
        incomplete: ' ',
        total: 100
      });
    }
  }, {
    key: "showProgress",
    value: function showProgress(percentage) {
      if (!this.bar) return;
      this.bar.update(percentage / 100);
    }
  }, {
    key: "disableProgress",
    value: function disableProgress() {
      if (!this.bar) return; // avoid empty line

      if (!this.bar.complete) {
        this.bar.terminate();
      }

      delete this.bar;
    }
  }]);
  return Log;
}();

var log = new Log();
exports.log = log;

function wasReported(error, lines) {
  if (error === undefined) {
    error = new Error('No message');
  } else if (typeof error === 'string') {
    log.error(error, lines);
    error = new Error(error);
  }

  error.wasReported = true;
  return error;
}