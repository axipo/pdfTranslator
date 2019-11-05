"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _common = require("../prelude/common.js");

var _log = require("./log.js");

var _assert = _interopRequireDefault(require("assert"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _package = require("../package.json");

/* eslint-disable complexity */
const bootstrapText = _fsExtra.default.readFileSync(require.resolve('../prelude/bootstrap.js'), 'utf8').replace('%VERSION%', _package.version);

const commonText = _fsExtra.default.readFileSync(require.resolve('../prelude/common.js'), 'utf8');

function itemsToText(items) {
  const len = items.length;
  return len.toString() + (len % 10 === 1 ? ' item' : ' items');
}

function hasAnyStore(record) {
  // discarded records like native addons
  for (const store of [_common.STORE_BLOB, _common.STORE_CONTENT, _common.STORE_LINKS, _common.STORE_STAT]) {
    if (record[store]) return true;
  }

  return false;
}

function _default({
  records,
  entrypoint,
  bytecode
}) {
  const stripes = [];

  for (const snap in records) {
    const record = records[snap];
    const {
      file
    } = record;
    if (!hasAnyStore(record)) continue;
    (0, _assert.default)(record[_common.STORE_STAT], 'packer: no STORE_STAT');

    if ((0, _common.isDotNODE)(file)) {
      continue;
    } else {
      (0, _assert.default)(record[_common.STORE_BLOB] || record[_common.STORE_CONTENT] || record[_common.STORE_LINKS]);
    }

    if (record[_common.STORE_BLOB] && !bytecode) {
      delete record[_common.STORE_BLOB];

      if (!record[_common.STORE_CONTENT]) {
        // TODO make a test for it?
        throw (0, _log.wasReported)('--no-bytecode and no source breaks final executable', [file, 'Please run with "-d" and without "--no-bytecode" first, and make', 'sure that debug log does not contain "was included as bytecode".']);
      }
    }

    for (const store of [_common.STORE_BLOB, _common.STORE_CONTENT, _common.STORE_LINKS, _common.STORE_STAT]) {
      const value = record[store];
      if (!value) continue;

      if (store === _common.STORE_BLOB || store === _common.STORE_CONTENT) {
        if (record.body === undefined) {
          stripes.push({
            snap,
            store,
            file
          });
        } else if (Buffer.isBuffer(record.body)) {
          stripes.push({
            snap,
            store,
            buffer: record.body
          });
        } else if (typeof record.body === 'string') {
          stripes.push({
            snap,
            store,
            buffer: Buffer.from(record.body)
          });
        } else {
          (0, _assert.default)(false, 'packer: bad STORE_BLOB/STORE_CONTENT');
        }
      } else if (store === _common.STORE_LINKS) {
        if (Array.isArray(value)) {
          const buffer = Buffer.from(JSON.stringify(value));
          stripes.push({
            snap,
            store,
            buffer
          });
        } else {
          (0, _assert.default)(false, 'packer: bad STORE_LINKS');
        }
      } else if (store === _common.STORE_STAT) {
        if (typeof value === 'object') {
          // reproducible
          delete value.atime;
          delete value.atimeMs;
          delete value.mtime;
          delete value.mtimeMs;
          delete value.ctime;
          delete value.ctimeMs;
          delete value.birthtime;
          delete value.birthtimeMs; // non-date

          delete value.blksize;
          delete value.blocks;
          delete value.dev;
          delete value.gid;
          delete value.ino;
          delete value.nlink;
          delete value.rdev;
          delete value.uid;
          if (!value.isFile()) value.size = 0; // portable

          const newStat = Object.assign({}, value);
          newStat.isFileValue = value.isFile();
          newStat.isDirectoryValue = value.isDirectory();
          const buffer = Buffer.from(JSON.stringify(newStat));
          stripes.push({
            snap,
            store,
            buffer
          });
        } else {
          (0, _assert.default)(false, 'packer: bad STORE_STAT');
        }
      } else {
        (0, _assert.default)(false, 'packer: unknown store');
      }
    }

    if (record[_common.STORE_CONTENT]) {
      const disclosed = (0, _common.isDotJS)(file) || (0, _common.isDotJSON)(file);

      _log.log.debug(disclosed ? 'The file was included as DISCLOSED code (with sources)' : 'The file was included as asset content', file);
    } else if (record[_common.STORE_BLOB]) {
      _log.log.debug('The file was included as bytecode (no sources)', file);
    } else if (record[_common.STORE_LINKS]) {
      const value = record[_common.STORE_LINKS];

      _log.log.debug('The directory files list was included (' + itemsToText(value) + ')', file);
    }
  }

  const prelude = 'return (function (REQUIRE_COMMON, VIRTUAL_FILESYSTEM, DEFAULT_ENTRYPOINT) { ' + bootstrapText + '\n})(function (exports) {\n' + commonText + '\n},\n' + '%VIRTUAL_FILESYSTEM%' + '\n,\n' + '%DEFAULT_ENTRYPOINT%' + '\n);';
  return {
    prelude,
    entrypoint,
    stripes
  };
}