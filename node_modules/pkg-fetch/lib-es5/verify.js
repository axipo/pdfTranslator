"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = verify;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chmod = require("./chmod.js");

var _spawn = require("./spawn.js");

var script = `
  var vm = require('vm');
  var assert = require('assert');
  var text = '(function () { return 42; })';
  var cd, fn, result;
  var modules = process.versions.modules | 0;
  var v8 = process.versions.v8.split('.').slice(0, 2).join('.');

  var s1 = new vm.Script(text, { filename: 's1', produceCachedData: true, sourceless: true });
  assert(s1.cachedDataProduced);
  cd = s1.cachedData;

  var kCpuFeaturesOffset, cpuFeatures;

  if (modules === 14) {
  } else
  if (modules === 46 || modules === 48 || modules === 51) {
    kCpuFeaturesOffset = 0x0c;
  } else
  if (modules === 57) {
    if (v8 === '6.2') {
      kCpuFeaturesOffset = 0x0c;
    } else
    if (v8 === '5.8') {
      kCpuFeaturesOffset = 0x0c;
    } else {
      kCpuFeaturesOffset = 0x10;
    }
  } else
  if (modules === 59) {
    kCpuFeaturesOffset = 0x0c;
  } else
  if (modules === 64) {
    kCpuFeaturesOffset = 0x0c;
  } else
  if (modules === 72) {
    // no cpu features anymore
  } else {
    assert(false, modules);
  }

  if (modules >= 46 && // no cpu_features field in 0.12
      process.arch !== 'arm' && // non-zero features even in sourceless mode in arm
      modules < 72) { // no cpu_features field in 12+
    cpuFeatures = cd.readUInt32LE(kCpuFeaturesOffset);
    assert(cpuFeatures === 0, 'CPU_FEATURES must be zero');
  }

  var s2 = new vm.Script(undefined, { filename: 's2', cachedData: cd, sourceless: true });
  fn = s2.runInThisContext();
  result = fn();
  assert.equal(result, 42);

  if (modules === 14) {
  } else
  if (modules === 46 || modules === 48 ||
      modules === 51 || modules === 57 || modules === 59 || modules === 64) {
    var paddedPayloadOffset = 0x48; // see SerializedCodeData::Payload()
    var index = paddedPayloadOffset + 10;
    cd[index] ^= 0xf0;
    var s3 = new vm.Script(undefined, { filename: 's3', cachedData: cd, sourceless: true });
    assert(s3.cachedDataRejected, 's3.cachedDataRejected must be true');
  } else
  if (modules === 72) {
  } else {
    assert(false, modules);
  }

  var s4 = new vm.Script(text, { filename: 's4', produceCachedData: true });
  assert(s4.cachedDataProduced, 's4.cachedDataProduced must be true');
  cd = s4.cachedData;

  if (modules >= 46 && // no cpu_features field in 0.12
      process.arch !== 'arm' && // zero features even in non-sourceless mode in arm
      modules < 72) { // no cpu_features field in 12+
    cpuFeatures = cd.readUInt32LE(kCpuFeaturesOffset);
    assert(cpuFeatures !== 0, 'CPU_FEATURES must be non-zero');
  }

  console.log('ok');
`;

function verify(_x) {
  return _verify.apply(this, arguments);
}

function _verify() {
  _verify = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(local) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _chmod.plusx)(local);

          case 2:
            _context.next = 4;
            return (0, _spawn.spawn)(local, ['-e', script], {
              env: {
                PKG_EXECPATH: 'PKG_INVOKE_NODEJS'
              }
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _verify.apply(this, arguments);
}