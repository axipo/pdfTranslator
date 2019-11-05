"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const b = process.binding('natives');
const list = Object.keys(b).concat(['system' // esprima/bin/esvalidate.js
]);

var _default = list.reduce((p, c) => {
  p[c] = true;
  return p;
}, {});

exports.default = _default;