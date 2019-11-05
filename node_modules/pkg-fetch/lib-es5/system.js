"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.abiToNodeRange = abiToNodeRange;
exports.isValidNodeRange = isValidNodeRange;
exports.toFancyPlatform = toFancyPlatform;
exports.toFancyArch = toFancyArch;
exports.knownArchs = exports.targetArchs = exports.hostArch = exports.knownPlatforms = exports.hostPlatform = exports.hostAbi = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _child_process = require("child_process");

function getHostAbi() {
  return 'm' + process.versions.modules;
}

function abiToNodeRange(abi) {
  if (/^m?14/.test(abi)) return 'node0.12';
  if (/^m?46/.test(abi)) return 'node4';
  if (/^m?47/.test(abi)) return 'node5';
  if (/^m?48/.test(abi)) return 'node6';
  if (/^m?51/.test(abi)) return 'node7';
  if (/^m?57/.test(abi)) return 'node8';
  if (/^m?59/.test(abi)) return 'node9';
  return abi;
}

function isValidNodeRange(nodeRange) {
  if (nodeRange === 'latest') return true;
  if (!/^node/.test(nodeRange)) return false;
  return true;
}

function toFancyPlatform(platform) {
  if (platform === 'darwin') return 'macos';
  if (platform === 'lin') return 'linux';
  if (platform === 'mac') return 'macos';
  if (platform === 'osx') return 'macos';
  if (platform === 'win32') return 'win';
  if (platform === 'windows') return 'win';
  return platform;
}

function detectAlpine() {
  var _process = process,
      platform = _process.platform;
  if (platform !== 'linux') return false; // https://github.com/sass/node-sass/issues/1589#issuecomment-265292579

  var ldd = (0, _child_process.spawnSync)('ldd').stderr.toString();
  if (/\bmusl\b/.test(ldd)) return true;
  var lddNode = (0, _child_process.spawnSync)('ldd', [process.execPath]).stdout.toString();
  return /\bmusl\b/.test(lddNode);
}

var isAlpine = detectAlpine();

function getHostPlatform() {
  var _process2 = process,
      platform = _process2.platform;
  if (isAlpine) return 'alpine';
  return toFancyPlatform(platform);
}

function getKnownPlatforms() {
  return ['alpine', 'freebsd', 'linux', 'macos', 'win'];
}

function toFancyArch(arch) {
  if (arch === 'ia32') return 'x86';
  if (arch === 'x86_64') return 'x64';
  return arch;
}

function getArmHostArch() {
  var cpu = _fs.default.readFileSync('/proc/cpuinfo', 'utf8');

  if (cpu.indexOf('vfpv3') >= 0) return 'armv7';
  var name = cpu.split('model name')[1];
  if (name) name = name.split(':')[1];
  if (name) name = name.split('\n')[0];
  if (name && name.indexOf('ARMv7') >= 0) return 'armv7';
  return 'armv6';
}

function getHostArch() {
  var _process3 = process,
      arch = _process3.arch;
  if (arch === 'arm') return getArmHostArch();
  return toFancyArch(arch);
}

function getTargetArchs() {
  var arch = getHostArch();
  if (arch === 'x64') return ['x64', 'x86'];
  return [arch];
}

function getKnownArchs() {
  return ['x64', 'x86', 'armv6', 'armv7', 'arm64', 's390x'];
}

var hostAbi = getHostAbi();
exports.hostAbi = hostAbi;
var hostPlatform = getHostPlatform();
exports.hostPlatform = hostPlatform;
var knownPlatforms = getKnownPlatforms();
exports.knownPlatforms = knownPlatforms;
var hostArch = getHostArch();
exports.hostArch = hostArch;
var targetArchs = getTargetArchs();
exports.targetArchs = targetArchs;
var knownArchs = getKnownArchs();
exports.knownArchs = knownArchs;