"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = thresholds;

var _assert = _interopRequireDefault(require("assert"));

/* eslint-disable key-spacing */

/* eslint-disable no-multi-spaces */
function thresholds(cmd, nodeVersion) {
  if (cmd === 'clone') {
    return {
      'ving objects:   0%': 0,
      'ving objects:   1%': 1,
      'ving objects:   6%': 5,
      'ving objects:  12%': 10,
      'ving objects:  25%': 20,
      'ving objects:  50%': 40,
      'ving objects:  75%': 60,
      'deltas:   0%': 80,
      'deltas:  50%': 90
    };
  } else if (cmd === 'vcbuild') {
    if (/^v?0/.test(nodeVersion)) {
      return {
        'http_parser.vcxproj ->': 1,
        'openssl.vcxproj ->': 9,
        'v8_base.vcxproj ->': 55,
        'mksnapshot.vcxproj ->': 76,
        'node\\Release\\node.exp': 90
      };
    } else if (/^v?4/.test(nodeVersion)) {
      return {
        'http_parser.vcxproj ->': 1,
        'hydrogen-representation-changes.cc': 13,
        'openssl.vcxproj ->': 21,
        'v8_base_0.vcxproj ->': 35,
        'build\\Release\\mksnapshot.lib': 57,
        'mksnapshot.vcxproj ->': 67,
        'node\\Release\\node.exp': 85,
        'cctest.vcxproj ->': 97
      };
    } else if (/^v?6/.test(nodeVersion)) {
      return {
        'http_parser.vcxproj ->': 1,
        'openssl.vcxproj ->': 4,
        'icudata.vcxproj ->': 10,
        'hydrogen-representation-changes.cc': 15,
        'interface-descriptors-x64.cc': 27,
        'v8_base_0.vcxproj ->': 41,
        'build\\Release\\mksnapshot.lib': 55,
        'mksnapshot.vcxproj ->': 66,
        'node\\Release\\node.exp': 82,
        'cctest.vcxproj ->': 95
      };
    } else {
      return {};
    }
  } else if (cmd === 'make') {
    if (/^v?0/.test(nodeVersion)) {
      return {
        'openssl/crypto/ex_data.o.d.raw': 10,
        'v8/src/api.o.d.raw': 20,
        'v8/src/compiler/js-graph.o.d.raw': 30,
        'v8/src/debug.o.d.raw': 40,
        'v8/src/heap/spaces.o.d.raw': 50,
        'v8/src/hydrogen-sce.o.d.raw': 60,
        'v8/src/parser.o.d.raw': 70,
        'v8/src/token.o.d.raw': 80,
        'v8/src/x64/stub-cache-x64.o.d.raw': 90
      };
    } else if (/^v?4/.test(nodeVersion)) {
      return {
        'v8/src/compiler/code-generator.o.d.raw': 10,
        'v8/src/compiler/operator.o.d.raw': 20,
        'v8/src/factory.o.d.raw': 30,
        'v8/src/hydrogen.o.d.raw': 40,
        'v8/src/liveedit.o.d.raw': 50,
        'v8/src/runtime/runtime-function.o.d.raw': 60,
        'v8/src/v8.o.d.raw': 70,
        'v8_nosnapshot/gen/libraries.o.d.raw': 80,
        'openssl/crypto/ex_data.o.d.raw': 90
      };
    } else if (/^v?6/.test(nodeVersion)) {
      return {
        'icuucx/deps/icu-small/source/common/parsepos.o.d.raw': 10,
        'v8/src/api.o.d.raw': 20,
        'v8/src/compiler/graph-replay.o.d.raw': 30,
        'v8/src/compiler.o.d.raw': 40,
        'v8/src/date.o.d.raw': 50,
        'v8/src/isolate.o.d.raw': 60,
        'v8/src/runtime/runtime-function.o.d.raw': 70,
        'v8/src/x64/assembler-x64.o.d.raw': 80,
        'icui18n/deps/icu-small/source/i18n/search.o.d.raw': 90
      };
    } else {
      return {};
    }
  } else {
    (0, _assert.default)(false);
  }
}