#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = require("./index.js");

var _log = require("./log.js");

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2.default)(function* () {
    if (process.env.CHDIR && process.env.CHDIR !== process.cwd()) {
      // allow to override cwd by CHDIR env var
      // https://github.com/resin-io/etcher/pull/1713
      process.chdir(process.env.CHDIR);
    }

    yield (0, _index.exec)(process.argv.slice(2));
  });
  return _main.apply(this, arguments);
}

main().catch(error => {
  if (!error.wasReported) _log.log.error(error);
  process.exit(2);
});