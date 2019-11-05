"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dontBuild = dontBuild;
exports.main = main;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _system = require("./system.js");

var _places = require("./places.js");

var _log = require("./log.js");

var _cloud = require("./cloud.js");

var _build = _interopRequireDefault(require("./build.js"));

var _patches = _interopRequireDefault(require("../patches/patches.json"));

var _path = _interopRequireDefault(require("path"));

var _verify = require("./verify.js");

var _package = require("../package.json");

var cloud = new _cloud.Cloud({
  owner: 'zeit',
  repo: 'pkg-fetch'
});

function dontBuild(nodeVersion, targetPlatform, targetArch) {
  // binaries are not provided for x86 anymore
  if (targetPlatform !== 'win' && targetArch === 'x86') return true; // https://support.apple.com/en-us/HT201948
  // don't disable macos-x86 because it is not possible
  // to cross-compile for x86 from macos otherwise

  var major = nodeVersion.match(/^v?(\d+)/)[1] | 0; // node 0.12 does not compile on arm

  if (/^arm/.test(targetArch) && major === 0) return true;
  if (targetPlatform === 'freebsd' && major < 4) return true;
  if (targetPlatform === 'alpine' && (targetArch !== 'x64' || major < 6)) return true;
  return false;
}

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var nodeVersion, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, targetArch, local, remote, short;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (process.env.GITHUB_USERNAME) {
              _context.next = 2;
              break;
            }

            throw (0, _log.wasReported)('No github credentials. Upload will fail!');

          case 2:
            _context.t0 = _regenerator.default.keys(_patches.default);

          case 3:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 56;
              break;
            }

            nodeVersion = _context.t1.value;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 8;
            _iterator = _system.targetArchs[Symbol.iterator]();

          case 10:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 40;
              break;
            }

            targetArch = _step.value;

            if (!dontBuild(nodeVersion, _system.hostPlatform, targetArch)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("continue", 37);

          case 14:
            local = (0, _places.localPlace)({
              from: 'built',
              arch: targetArch,
              nodeVersion,
              platform: _system.hostPlatform,
              version: _package.version
            });
            remote = (0, _places.remotePlace)({
              arch: targetArch,
              nodeVersion,
              platform: _system.hostPlatform,
              version: _package.version
            });
            _context.next = 18;
            return cloud.alreadyUploaded(remote);

          case 18:
            if (!_context.sent) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("continue", 37);

          case 20:
            short = _path.default.basename(local);

            _log.log.info(`Building ${short}...`);

            _context.next = 24;
            return (0, _build.default)(nodeVersion, targetArch, local);

          case 24:
            _log.log.info(`Verifying ${short}...`);

            _context.next = 27;
            return (0, _verify.verify)(local);

          case 27:
            _log.log.info(`Uploading ${short}...`);

            _context.prev = 28;
            _context.next = 31;
            return cloud.upload(local, remote);

          case 31:
            _context.next = 37;
            break;

          case 33:
            _context.prev = 33;
            _context.t2 = _context["catch"](28);
            // TODO catch only network errors
            if (!_context.t2.wasReported) _log.log.error(_context.t2);

            _log.log.info('Meanwhile i will continue making binaries');

          case 37:
            _iteratorNormalCompletion = true;
            _context.next = 10;
            break;

          case 40:
            _context.next = 46;
            break;

          case 42:
            _context.prev = 42;
            _context.t3 = _context["catch"](8);
            _didIteratorError = true;
            _iteratorError = _context.t3;

          case 46:
            _context.prev = 46;
            _context.prev = 47;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 49:
            _context.prev = 49;

            if (!_didIteratorError) {
              _context.next = 52;
              break;
            }

            throw _iteratorError;

          case 52:
            return _context.finish(49);

          case 53:
            return _context.finish(46);

          case 54:
            _context.next = 3;
            break;

          case 56:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 42, 46, 54], [28, 33], [47,, 49, 53]]);
  }));
  return _main.apply(this, arguments);
}

if (!module.parent) {
  main().catch(function (error) {
    if (!error.wasReported) _log.log.error(error);
    process.exit(2);
  });
}