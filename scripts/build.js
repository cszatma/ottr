'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const spawnSync = require('child_process').spawnSync;
const fs = require('fs-extra');

const paths = require('./utils/paths');
const checkChildStatus = require('./utils/checkChildStatus');

const args = process.argv.slice(2);
const stdio = args.includes('--no-output') ? 'ignore' : 'inherit';

/* Start build process */
console.log(chalk.cyan('Build started.'));

// Make sure the build directory exists and it is empty
fs.ensureDirSync(paths.appBuild);
fs.emptyDirSync(paths.appBuild);

console.log(`\nBuilding ${chalk.cyan('server')}...\n`);

// Run transpiler
const result = spawnSync(
  require.resolve('typescript/bin/tsc'),
  ['-p', paths.appTsBuildConfig],
  { stdio },
);

checkChildStatus(result.status, 'tsc');
console.log(chalk.green('Successfully built the server!\n'));

console.log(chalk.green('Build complete!'));
console.log(`Application as available at ${chalk.cyan(paths.appBuild)}\n`);
