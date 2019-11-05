"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = help;

var _chalk = _interopRequireDefault(require("chalk"));

function help() {
  console.log(`
  ${_chalk.default.bold('pkg')} [options] <input>

  ${_chalk.default.dim('Options:')}

    -h, --help       output usage information
    -v, --version    output pkg version
    -t, --targets    comma-separated list of targets (see examples)
    -c, --config     package.json or any json file with top-level config
    --options        bake v8 options into executable to run with them on
    -o, --output     output file name or template for several files
    --out-path       path to save output one or more executables
    -d, --debug      show more information during packaging process [off]
    -b, --build      don't download prebuilt base binaries, build them
    --public         speed up and disclose the sources of top-level project

  ${_chalk.default.dim('Examples:')}

  ${_chalk.default.gray('–')} Makes executables for Linux, macOS and Windows
    ${_chalk.default.cyan('$ pkg index.js')}
  ${_chalk.default.gray('–')} Takes package.json from cwd and follows 'bin' entry
    ${_chalk.default.cyan('$ pkg .')}
  ${_chalk.default.gray('–')} Makes executable for particular target machine
    ${_chalk.default.cyan('$ pkg -t node6-alpine-x64 index.js')}
  ${_chalk.default.gray('–')} Makes executables for target machines of your choice
    ${_chalk.default.cyan('$ pkg -t node4-linux,node6-linux,node6-win index.js')}
  ${_chalk.default.gray('–')} Bakes '--expose-gc' into executable
    ${_chalk.default.cyan('$ pkg --options expose-gc index.js')}

`);
}