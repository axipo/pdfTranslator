"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = follow;

var _resolve = require("resolve");

function follow(x, opts) {
  return new Promise(resolve => {
    resolve((0, _resolve.sync)(x, opts)); // TODO own implementation with foreign tests
    // TODO async follow

    /*
        resolve_(x, opts, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
    */
  });
}