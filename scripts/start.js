'use strict';

process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
  throw err;
});

process.on('SIGTERM', stopHandler);
process.on('SIGINT', stopHandler);
process.on('SIGHUP', stopHandler);

function stopHandler() {
  console.log('Stopped forcefully');
  process.exit(0);
}

const chalk = require('chalk');
const spawnSync = require('child_process').spawnSync;

const paths = require('./utils/paths');
const checkChildStatus = require('./utils/checkChildStatus');

const args = process.argv.slice(2);
const stdio = args.includes('--no-output') ? 'ignore' : 'inherit';

/* Being start process */
console.log(`Starting ${chalk.cyan('server')}.\n`);

const nodemon = require.resolve(`${paths.appNodeModules}/nodemon/bin/nodemon`);

const result = spawnSync(
  nodemon,
  [paths.appIndex, '--exec', 'ts-node', '-e', 'ts'],
  { stdio, env: process.env },
);

checkChildStatus(result.status, 'nodemon');
console.log(chalk.green(`Finished running the server.\n`));
