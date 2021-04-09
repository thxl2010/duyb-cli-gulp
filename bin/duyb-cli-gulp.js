#! /usr/bin/env node

process.argv.push('--cwd');
process.argv.push(process.cwd());
process.argv.push('--gulpfile');
// process.argv.push(require.resolve('../lib/index'));
process.argv.push(require.resolve('..')); // main 入口文件

// console.log(process.argv);
require('gulp/bin/gulp');
