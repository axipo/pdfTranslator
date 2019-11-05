"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spawn = spawn;
exports.progress = progress;

var _byline = _interopRequireDefault(require("byline"));

var _child_process = _interopRequireDefault(require("child_process"));

var _fs = _interopRequireDefault(require("fs"));

var _log = require("./log.js");

var MAX_LINES = 20;
var DEBUG_THRESHOLDS = false;

function errorLines(lines) {
  return lines.slice(-MAX_LINES).map(function (line) {
    return line[1];
  }).join('\n');
}

function spawn(cmd, args, opts) {
  var child = _child_process.default.spawn(cmd, args, opts);

  var stdout = (0, _byline.default)(child.stdout);
  var stderr = (0, _byline.default)(child.stderr);
  var lines = [];

  var onData = function onData(data) {
    var time = new Date().getTime();
    lines.push([time, data.toString()]); // TODO chalk stdout/stderr?

    var thresholds = this.thresholds; // eslint-disable-line no-invalid-this

    if (thresholds) {
      for (var key in thresholds) {
        if (data.indexOf(key) >= 0) {
          var p = thresholds[key];

          _log.log.showProgress(p);

          if (DEBUG_THRESHOLDS) {
            lines.push([time, '************']);
            lines.push([time, p + ': ' + key]);
            lines.push([time, '************']);
          }
        }
      }
    }
  };

  var promise = new Promise(function (resolve, reject) {
    child.on('error', function (error) {
      console.error(errorLines(lines)); // dont use `log` here

      reject(error);
    });
    child.on('close', function (code) {
      if (code) {
        console.error(errorLines(lines)); // dont use `log` here

        return reject(new Error(`${cmd} failed with code ${code}`));
      }

      resolve();
    });
  });
  onData = onData.bind(promise);
  if (stdout) stdout.on('data', onData);
  if (stderr) stderr.on('data', onData);
  promise.child = child;
  promise.lines = lines;
  return promise;
}

function progress(promise, thresholds) {
  promise.thresholds = thresholds;
  var child = promise.child,
      lines = promise.lines;

  _log.log.enableProgress(promise.child.spawnfile);

  _log.log.showProgress(0);

  var start = new Date().getTime();
  child.on('close', function () {
    if (DEBUG_THRESHOLDS) {
      var finish = new Date().getTime();
      var content = lines.map(function (line) {
        return (100 * (line[0] - start) / (finish - start) | 0) + ': ' + line[1];
      }).join('\n');

      _fs.default.writeFileSync(child.spawnfile + '.debug', content);
    }

    _log.log.showProgress(100);

    _log.log.disableProgress();
  });
}